# Frontend

This is the `client` side of the Ultimate Project Template. It's built using React and Vite for developing and building the project.

## Structure

The project offers a basic React template based on views, layouts, and components.

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

## Genezio SDK

Here we can also see the way the Genezio SDK works. Everytime we run `genezio local` the backend SDK is generated as a npm library and put automatically in the
`node_modules` folder in the `client`. When we run `genezio deploy` the SDK is published to npm and can be retrieved remotely as a standalone package in any
of your projects.

To use the SDK in the frontend we import it like any other npm library.

```bash
$ npm install @genezio-sdk/ultimate-project-template
```

For example:

- Mongo services

```typescript
import { MongoService } from "@genezio-sdk/ultimate-project-template";
```

- Postgres services

```typescript
import { PostgresService } from "@genezio-sdk/ultimate-project-template";
```

From here we can use the services to call backend functions directly using the classes provided by the SDK.
If you want to learn more about the Genezio SDK you can check out the [documentation](https://genezio.com/docs/features/generated-sdk/)

## Support

This is a dummy todo application using GenezioAuth for authorization and authentification but can be used as a starting point for any large scale project.

If you have any questions or need help, please open a issue on this repository or contact us on [Discord](https://discord.gg/uc9H5YKjXv) for a more hands on aproach. We are always happy to help you and welcome any kind of constructive feedback. If you want to learn more about Genezio, please visit our [website](https://genezio.com/) or hop on over to our
[Github](https://github.com/Genez-io/genezio).
