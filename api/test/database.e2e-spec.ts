import { isDatabaseAvailable } from "../src/typeOrm.config";

let isSetupComplete = false;

// rs-todo: probably not needed:
beforeAll(() => {
  isSetupComplete = true;
});

describe('Database setup', () => {
  it('Database setup should be complete',() => {
    expect(isSetupComplete).toBeTruthy();
  });

  it('Database should be available to connect', async () => {
    // If this test fails, make sure the local database is ready, see the README.md in the root of the repo for more info
    // Ultimately, run `docker-compose-local.yml` and then `yarn ensure-dbs`
    const { isDbAvailable, userCount } = await isDatabaseAvailable();
    expect(isDbAvailable).toBeTruthy();
    console.debug(`Database is available, number of User records is: ${userCount}`);
  });
});

// rs-todo: probably not needed:
afterAll(() => {
  console.debug("THIS WAS RUN, YEH!!!!");
});
