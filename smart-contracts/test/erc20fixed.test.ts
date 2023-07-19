import { expect } from "chai";
import { Wallet, Provider, Contract, utils } from "zksync-web3";
import * as hre from "hardhat";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import * as ethers from "ethers";

import { deployContract, fundAccount } from "./utils";

// load env file
import dotenv from "dotenv";
dotenv.config();

// load wallet private key from env file
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

describe("ERC20fixedPaymaster", function () {
  let provider: Provider;
  let wallet: Wallet;
  let deployer: Deployer;
  let userWallet: Wallet;
  let ownerInitialBalance: ethers.BigNumber;
  let paymaster: Contract;
  let greeter: Contract;
  let token: Contract;

  before(async function () {
    // setup deployer
    provider = Provider.getDefaultProvider();
    wallet = new Wallet(PRIVATE_KEY, provider);
    deployer = new Deployer(hre, wallet);
    // setup new wallet
    const emptyWallet = Wallet.createRandom();
    console.log(`Empty wallet's address: ${emptyWallet.address}`);
    userWallet = new Wallet(emptyWallet.privateKey, provider);
    // deploy contracts
    token = await deployContract(deployer, "MyERC20", [
      "MyToken",
      "MyToken",
      18,
    ]);
    paymaster = await deployContract(deployer, "ERC20fixedPaymaster", [
      token.address,
    ]);
    greeter = await deployContract(deployer, "Greeter", ["Hi"]);
    // fund paymaster
    await fundAccount(wallet, paymaster.address, "3");
    ownerInitialBalance = await wallet.getBalance();
  });

  async function executeGreetingTransaction(user: Wallet) {
    const gasPrice = await provider.getGasPrice();
    const token_address = token.address.toString();

    const paymasterParams = utils.getPaymasterParams(paymaster.address, {
      type: "ApprovalBased",
      token: token_address,
      minimalAllowance: ethers.BigNumber.from(1),
      // empty bytes as testnet paymaster does not use innerInput
      innerInput: new Uint8Array(),
    });

    const setGreetingTx = await greeter
      .connect(user)
      .setGreeting("Hola, mundo!", {
        maxPriorityFeePerGas: ethers.BigNumber.from(0),
        maxFeePerGas: gasPrice,
        // hardcoded for testing
        gasLimit: 6000000,
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams,
        },
      });

    await setGreetingTx.wait();

    return wallet.getBalance();
  }

  it("user with MyERC20 token can update message for free", async function () {
    const initialMintAmount = ethers.utils.parseEther("3");
    const success = await token.mint(userWallet.address, initialMintAmount);
    await success.wait();

    const userInitialTokenBalance = await token.balanceOf(userWallet.address);
    const userInitialETHBalance = await userWallet.getBalance();
    const initialPaymasterBalance = await provider.getBalance(
      paymaster.address,
    );

    await executeGreetingTransaction(userWallet);

    const finalETHBalance = await userWallet.getBalance();
    const finalUserTokenBalance = await token.balanceOf(userWallet.address);
    const finalPaymasterBalance = await provider.getBalance(paymaster.address);

    expect(await greeter.greet()).to.equal("Hola, mundo!");
    expect(initialPaymasterBalance.gt(finalPaymasterBalance)).to.be.true;
    expect(userInitialETHBalance).to.eql(finalETHBalance);
    expect(userInitialTokenBalance.gt(finalUserTokenBalance)).to.be.true;
  });

  it("should allow owner to withdraw all funds", async function () {
    try {
      const tx = await paymaster.connect(wallet).withdraw(userWallet.address);
      await tx.wait();
    } catch (e) {
      console.error("Error executing withdrawal:", e);
    }

    const finalContractBalance = await provider.getBalance(paymaster.address);

    expect(finalContractBalance).to.eql(ethers.BigNumber.from(0));
  });

  it("should prevent non-owners from withdrawing funds", async function () {
    try {
      await paymaster.connect(userWallet).withdraw(userWallet.address);
    } catch (e) {
      expect(e.message).to.include("Ownable: caller is not the owner");
    }
  });
});
