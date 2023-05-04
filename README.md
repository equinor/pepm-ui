# PEPM-UI
User Interface for **Parameter Estimation from Process Models**.

## :zap: Getting started
Clone the repository. Make sure you have [Node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/) installed. In the root folder of the application, run available scripts:

**Install dependencies**

Install third-party packages for local development.
```sh
yarn install
```

**Run locally**

This will run the application in your standard web browser at `localhost:3000`
```sh
yarn start
```

**Husky pre-commit**

We use [husky](https://typicode.github.io/husky/#/) to automatically run tests, linting and formatting on commits, but you can also use the command below to run pre-commit manually.
```sh
yarn pre-commit
```

## Authentication
Authentication is implemented with [Microsoft Oauth2 for React](https://learn.microsoft.com/en-us/azure/active-directory/develop/single-page-app-tutorial-01-register-app)