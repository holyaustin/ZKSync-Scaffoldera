![image]()

# ⚡ ZKSync Scaffoldera - Web3 App Starter Kit for ZK Sync Era

Web3 App Template built using Next.js, RainbowKit, SIWE, Disco, and more!

### To compile the contract, run:
yarn hardhat compile

### To execute the deployment script run:
yarn hardhat deploy-zksync --script deploy-greeter.ts
Greeter was deployed to 0xb84f372325106F8697b46f0e8Ab4b43e381547B8

Congratulations! You have deployed a smart contract project to zkSync Era Testnet with Hardhat

### Verify contracts
To verify your contracts you have two options:

Explorer: verify your contracts manually in the zkSync explorer
Plugin: verify your contracts programmatically using the Hardhat verify plugin
If you have any problems migrating your project, send us a message on Discord.


- Getting Started
  - [Environment Variables](https://docs.turboeth.xyz/getting-started/environment)
  - [JSON-RPC](https://docs.turboeth.xyz/getting-started/json-rpc)
  - [WAGMI CLI](https://docs.turboeth.xyz/getting-started/wagmi-cli)
  - [UI Components](https://docs.turboeth.xyz/getting-started/design-system)
  - [Backend Database](https://docs.turboeth.xyz/getting-started/database)
- Core Integrations
  - [🌈 RainbowKit](https://docs.turboeth.xyz/integration/rainbowkit)
  - [🔏 Sign-In With Ethereum](https://docs.turboeth.xyz/integration/sign-in-with-ethereum)
- Smart Contract Integrations
  - [ERC20](https://docs.turboeth.xyz/integration/smart-contract-erc20)
- API Integrations
  - [Disco](https://docs.turboeth.xyz/integration/disco)
  - [Etherscan](https://docs.turboeth.xyz/integration/etherscan)

# Getting Started

The `pnpm` CLI is the recommended package manager but `npm` and `yarn` should work too.

```bash
pnpm install
```

#### Development

```bash
pnpm dev
```

#### Build

```bash
pnpm build
```

### Web3 Core

- [WAGMI CLI](https://wagmi.sh/cli/getting-started) - Automatic React Hook Generation
- [RainbowKit](https://www.rainbowkit.com/) - Wallet connection manager
- [Sign-In With Ethereum](https://login.xyz/) - Account authentication

### Web2 Frameworks

- [Vercel](https://vercel.com/) - App Infrastructure
- [Prisma](https://www.prisma.io/) - Database ORM

### Developer Experience

- [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety
- [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style
- [ESLint](https://eslint.org/) – Pluggable linter for Next.js and TypeScript

### User Interface

- [TailwindCSS](https://tailwindcss.com) – Utility-first CSS framework for rapid UI development
- [Radix](https://www.radix-ui.com/) – Primitives like modal, popover, etc. to build a stellar user experience
- [Framer Motion](https://www.framer.com/motion/) – Motion library for React to animate components with ease
- [React Icons](https://react-icons.github.io/react-icons) – Beautifully simple, pixel-perfect icons

The [ui.shadcn.com](https://ui.shadcn.com) components are included in the `/components/shared/ui` folder.

# 💻 Developer Experience

### 🐕 What is husky

Husky improves your git commits.

You can use it to lint your commit messages, run tests, lint code, etc... when you commit or push. Husky supports all Git hooks.

#### 🪝 Hooks

- pre-commit: lint app codebase
- commit-msg: apply commintlint

### 📋 What is commitlint

commitlint checks if your commit messages meet the [conventional commit format](https://conventionalcommits.org).

In general the pattern mostly looks like this:

```sh
type(scope?): subject  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

Real world examples can look like this:

```
chore: run tests on travis ci
```

```
fix(server): send cors headers
```

```
feat(blog): add comment section
```

Common types according to [commitlint-config-conventional (based on the Angular convention)](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum) can be:

- build
- chore
- ci
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

# Acknowledgements

Original template was forked from https://github.com/wslyvh/nexth

Thank you @KamesGeraghty 🙏

<hr/>

Copyright 2023 [holyustin](https://twitter.com/KamesGeraghty)
