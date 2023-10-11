# PEPM-UI

User Interface for **Parameter Estimation from Process Models**.

## :zap: Getting started

Clone the repository. Make sure you have [Node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/) installed. In the root folder of the application, run available scripts:

### Install dependencies

Install third-party packages for local development.

```sh
yarn install
```

### Run locally

> **Note:** To run successfully, local overrides of `.env` must be defined, for instance in `.env.local`, or [see what other .env files can be used.](https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used)

This will by default run the application in your standard web browser at `localhost:3000`.

```sh
yarn start
```

### Local development with docker

> **Note:** This step requires a `.env.development.local` file, with local overrides of `.env` for your local environment.

Build and run docker image for local development.

```sh
docker compose -f compose-dev.yaml up --build
```

### Husky pre-commit

We use [husky](https://typicode.github.io/husky/#/) to automatically run tests, linting and formatting on commits, but you can also use the command below to run pre-commit manually.

```sh
yarn pre-commit
```

## Authentication

Authentication is implemented with [Microsoft Oauth2 for React](https://learn.microsoft.com/en-us/azure/active-directory/develop/single-page-app-tutorial-01-register-app)
