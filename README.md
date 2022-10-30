# Service Containers Demo

Demonstration of using GitHub Actions and Workflows and service containers to enable out-of-infrastructure integration tests that include data access.


## Local Development Dependencies

To start the local development dependencies (MySQL database server) locally, run:

```
docker-compose -f docker-compose-local.yml up --detach
```

And to stop, run:

```
docker-compose -f docker-compose-local.yml down
```

To ensure the databases and schemas exist, and are up to date, run:

```
yarn ensure-dbs
```


## Dev and Test

**IMPORTANT: Please ensure the steps are followed in the `Local Development Dependencies` section above first. i.e. the database server must be running locally, and the databases and schemas must be created and up to date.**

To start the app running locally (it will be available on http://localhost:3000):
```
yarn install && yarn start
```

To run the unit tests:
```
yarn install && yarn test
```

To run the e2e tests:
```
yarn install && yarn test:e2e
```


## Database Migrations

**IMPORTANT: These commands should be run from the `./api/` directory.**

To create a new migration:

```
yarn typeorm migration:generate -d ./src/typeOrm.config.ts ./src/db-migrations/<<MigrationName>>
```

To apply any pending migrations:

```
yarn typeorm migration:run -d ./src/typeOrm.config.ts
```
