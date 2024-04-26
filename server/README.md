# Backend

This is the `server` side of the Ultimate Project Template. It's built using NodeJS, Typescript, and Genezio for developing, building, and deploying the project.

## Structure

This part of the project offers a comprehensive guide on how to structure large scale backend projects built with Genezio.

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

## Genezio Classes

Here we can also see the way the Genezio classes work. The highest level of the code hierarchy is represented by 3 folders:

- `services`
  This is where the main logic of the application is implemented. Here we have examples of CRUD operations on both MongoDB and PostgreSQL databases.
- `webhooks`
  This is where the webhooks of the application are implemented. You can set up different endpoints for handling one-time links, email triggers, or
  other ping-like services you may require.
- `crons`
  Crons are functions that run at set intervals of time and are always running. Here you can manage functions that need to be run on a regular basis such as
  database backup, database cleanup, or logging certain events.

Each of these services are implemented by classes which have the `@GenezioDeploy` decorator. This decorator tells the genezio CLI that this class along with
the methods associated with it must be deployed to the cloud and subsequently added to the SDK to be used in the client.

If the methods inside a deployed class don't contain a decorator then they will be handled as functions that use the RPC protocol. For webhooks and crons we
can use the `@GenezioMethod` decorator to specify the type of method we want.

If you want to learn more about Genezio decorators you can check out the [documentation](https://genezio.com/docs/features/backend-deployment/)

## Middleware

We also define custom middleware using decorators. In the `middleware` folder, we have two examples of handmade middleware. To get a better understanding on how
to implement your own decorators you can check out the official typescript [documentation](https://www.typescriptlang.org/docs/handbook/decorators.html)

## Support

This is a dummy todo application but can be used as a starting point for any large scale project.

If you have any questions or need help, please open an issue on this repository or contact us on [Discord](https://discord.gg/uc9H5YKjXv) for a more hands-on approach. We are always happy to help you and welcome any kind of constructive feedback. If you want to learn more about Genezio, please visit our [website](https://genezio.com/) or hop on over to our [Github](https://github.com/Genez-io/genezio).
