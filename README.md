# Service Containers Demo

Demonstration of using GitHub Actions and Workflows and service containers to enable out-of-infrastructure integration tests that include data access.  Technologies used include: TypeScript, Node.js, Yarn, NestJS, Docker, MySQL, TypeORM, Jest, Supertest, GitHub Actions, GitHub Workflows.

The end-to-end tests run against the [API](./api/) and integrate with a MySQL database running in a container, either locally or in the CI build pipeline.


## Prerequisites

* [Node.js 16](https://nodejs.org/download/release/v16.18.0/)
* Yarn 1.22: `npm install -g 'yarn@1.22.19'`
* Docker Engine and `docker-compose`
	* Docker Engine and Compose are used to run the Local Development Dependencies
	* Options are:
		* Linux users can simply run [Docker Engine](https://docs.docker.com/engine/install/#server) directly
		* Windows users can setup Docker Engine using any popular Linux distro via [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install) and then following the instructions above
		* Mac users can use a combination of hyperkit and minikube to setup Docker Engine
		* Use [Docker Desktop](https://docs.docker.com/desktop/) (requires a paid-for licence for commercial use in larger enterprises)
		* Use [Rancher Desktop](https://rancherdesktop.io)


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

**IMPORTANT:**
* **Please ensure the steps are followed in the `Local Development Dependencies` section above first. i.e. the database server must be running locally, and the databases and schemas must be created and be up to date.**
* **These commands should be run from the `./api/` directory.**

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

To run a single test, or subset of the tests, use the `-t {regex}` argument, for example:
```
yarn test:e2e -t 'PUT new user'
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
