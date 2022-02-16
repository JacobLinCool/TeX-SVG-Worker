# Cloudflare Module Worker

A Module Worker Template for Cloudflare Workers.

You can use this template to build a CORS proxy, an API server, or serving static files.

## Features

-   📦 Fast Bundling and Minification (by [esbuild](https://esbuild.github.io/))
-   🗂 Express-like Routing (by [itty-router](https://github.com/kwhitley/itty-router))
-   ⚙️ Linting and Testing (by [ESLint](https://eslint.org/) & [Jest](https://jestjs.io/))
-   🌈 Source Formatting (by [Prettier](https://prettier.io/))
-   🦾 TypeScript Supported (by [TypeScript](https://www.typescriptlang.org/))
-   🚦 GitHub Action CI/CD (Auto Deploy, Pull Request Check).
-   🛠 Utility Function: [Headers](./src/headers.ts).

## Usage

You can use `npm`, `yarn` or `pnpm` to install the dependencies. And I recommend you to use `pnpm`, which works well with this template.

There are some scripts in the package.json file:

- `build`: Build the module worker.
  - Bundled & Minified
  - Stored in `dist` directory
- `dev`: Build the module worker.
  - Run `wrangler dev`
  - Visit via `http://127.0.0.1:8787`
  - Console logs are shown in the terminal
- `test`: Run tests using `Jest`.
  - Coverage report will be stored in `coverage` directory
- `lint`: Run linting and testing using `ESLint`.
  - Linting rules are stored in `.eslintrc.js`
  - Files and directories in `.eslintignore` will be ignored
- `format`: Format the source code using `prettier`.
  - Rules are stored in `.prettierrc`

If you want to publish the module worker, you can use `wrangler publish`.

### GitHub Action Auto Deploy

Provide a `CF_API_TOKEN` secret to enable auto deploy.

The workflow is here: [publish_worker.yml](./.github/workflows/publish_worker.yml)

## Notice

### Don't Push to Main Branch

Push to other branches and make a PR to the main branch, by doing so, the GitHub Action will check your PR is working before merging it.

Push directly to the main branch will trigger a deploy process immediately without checking your the new code is working or not.
