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

To ensure the databases exists, and are up to date, run:

```
yarn ensure-dbs
```


## Database Migrations

**These commands should be run from the `./api/` directory.**

To create a new migration:

```
yarn typeorm migration:generate -d ./src/typeOrm.config.ts ./src/db-migrations/<<MigrationName>>
```

To apply any pending migrations:

```
yarn typeorm migration:run -d ./src/typeOrm.config.ts
```
