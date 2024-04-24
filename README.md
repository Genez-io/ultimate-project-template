# Genezio ultimate project template

This is a template for how to structure large backend projects with Genezio. This project uses Node.js, MongoDB and PostgreSQL for the backend and React for the frontend.
We use GenezioAuth to manage authentication and authorization and Genezio to deploy both the backend and the frontend to the cloud. This is a dummy todo application but can be used as a starting point for any large project.

## Features

- ✅ MongoDb and PostgreSQL support
- ✅ React frontend
- ✅ Handmade middlewares using Typescript decorators
- 💡 Typescript for both backend and frontend
- 💡 RPC between frontend and backend ensuing type safety
- 🚀 Automatic SDK generation for the frontend
- 🚀 Out of the box authentication and authorization with GenezioAuth
- 🚀 Out of the box deployment with Genezio

## Requirements

- Node.JS >= 18.2

## How to run the project

> 👉 **Step 1** - Install Genezio

```bash
$ npm install -g genezio
```

> 👉 **Step 2** - Clone the project

```bash
$ git clone https://github.com/Genez-io/ultimate-project-template.git
$ cd ultimate-project-template
```

> 👉 **Step 3** - Populate the `.env` file.
> In the `server` directory create a `.env` file and populate it using the `.env.template` file

- If you need help with the environment variables, please follow these two tutorials:

* MongoDB URL: https://genezio.com/docs/tutorials/connect-to-mongodb-atlas/
* PostgreSQL URL: https://genezio.com/docs/features/databases/

> 👉 **Step 4** - Deploy the backend with the environment variables. In the `root` of the project run:

```bash
$ genezio deploy --backend --env ./server/.env
```

> 👉 **Step 5** - Enable Authentification
> Go to the [Genezio Dashboard](https://app.genez.io/dashboard) and choose your project. Click on the `Authentification` tab and choose which database you want to use. Then click on `Enable`. You can choose either MongoDB or PostgreSQL. After that, enable the `Email` provider. Copy the `Token` and the `Region` and save them for later. For more information about authentification, check out the [documentation](https://genezio.com/docs/features/authentication/).

> 👉 **Step 6** - Set up Authentification on the frontend
> In the `client` directory go to `src/main.tsx` file and replace the placeholders in the AuthService initialization with the values saved from the Genezio Dashboard.

```typescript
// TODO: Add your token and region from the Genezio dashboard https://app.genez.io/dashboard
AuthService.getInstance().setTokenAndRegion("<token>", "<region>");
```

> 👉 **Step 7** - Test the project locally

- Run the following command in the `root` of the project to start both the backend and the frontend.

```bash
$ genezio local
```

- Open your browser and go to `http://localhost:5173` to see the application.

Alternatively, you can test only the backend methods from our test interface.
By going to `http://localhost:8083/explore` you can test all the methods that are available in the backend from a postman-like interface.

If you want to learn more about our test interface, you can check out the [documentation](https://genezio.com/docs/features/testing/).

> 👉 **Step 8** - Deploy the entire project

- Run the following command in the `root` of the project to deploy the entire project.

```bash
$ genezio deploy
```

- Open your browser and go to the frontend link provided by Genezio to see the application.

## Codebase structure

In the root of the project, you will find the `genezio.yaml` file which is used to configure your Genezio project. Here is where all `genezio` commands should be run.
The `.genezioignore` file is used to ignore files and directories that are watched by the backend local development server.
The project is divided into two main directories: `client` and `server`.

### Server

```bash
< ROOT / src >
     |
     |-- config/
     |    |-- envHandler.ts             # Configuration of the environment variables
     |
     |-- db/
     |    |-- mongooseModel.ts          # The Mongoose model of the application used for the connection to the MongoDB database
     |    |-- sequelizeModel.ts         # The Sequelize model of the application used for the connection to the PostgreSQL database
     |
     |-- middlewares/
     |    |-- dateChecker.ts            # The middleware that checks if the date is valid
     |    |-- parameterChecker.ts       # The middleware that checks if the parameters are valid
     |
     |-- dtos/
     |    |-- task.ts                   # The DTO's of the task
     |
     |-- utils/
     |    |-- helperFunction.ts         # The helper functions of the application
     |
     |-- services/
     |    |-- mongoService.ts           # The service that handles the business logic using the MongoDB database.
     |    |-- postgresService.ts        # The service that handles the business logic using the PostgreSQL database.
     |
     |-- webhooks/
     |   |-- mongo.ts                   # The webhooks that use the MongoDB database
     |   |-- postgres.ts                # The webhooks that use the PostgreSQL database
     |
     |-- crons/
     |   |-- mongo.ts                   # The crons that use the MongoDB database
     |   |-- postgres.ts                # The crons that use the PostgreSQL database
     |
     |-- .env                       # Specify the ENV variables
     |-- ************************************************************************
```

### Client

```bash
< ROOT / client >
     |
     |-- public/           # The folder which contains the public assets
     |
     |-- src/
     |    |-- main.tsx     # The main entry point of the frontend
     |    |-- App.tsx      # The main component of the frontend
     |    |-- components/  # The folder which contains all the components that are used by the views
     |    |-- views/       # The folder which contains all the views of the application which are rendered by the router
     |    |-- layouts/     # The folder which contains all the layouts of the application which ensure the undrelying logic of the views
     |
     |-- ************************************************************************
```

## Github Actions

This project also has a template on how to structure a Github action to deploy your project automatically each time you push to the main branch. The action is located in the `.github/workflows` directory and is called `deploy-backend.yml`. This action will deploy the backend side of the project to Genezio each time you push to the main branch. To use this action, you need to add the following secrets to your Github repository:

- `GENEZIO_TOKEN` - The token that you create in the [Genezio dashboard](https://app.genez.io/settings/tokens)

To learn more about integrating Github actions with Genezio, please check out this [article](https://genezio.com/blog/integrating-github-actions-with-genezio-for-ci/cd/).

## Support

If you have any questions or need help, please open a issue on this repository or contact us on [Discord](https://discord.gg/uc9H5YKjXv) for a more hands on aproach. We are always happy to help you and welcome any kind of constructive feedback. If you want to learn more about Genezio, please visit our [website](https://genezio.com/) or hop on over to our
[Github](https://github.com/Genez-io/genezio).
