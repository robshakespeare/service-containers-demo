import { isDatabaseAvailable } from "../src/typeOrm.config";

describe('Database', () => {
  it('Database should be available to connect', async () => {
    // If this test fails, make sure the local database is ready, see the README.md in the root of the repo for more info
    // Ultimately, run `docker-compose-local.yml` and then `yarn ensure-dbs`

    // ARRANGE
    const { isDbAvailable, userCount } = await isDatabaseAvailable();

    // ASSERT
    expect(isDbAvailable).toBeTruthy();
    console.debug(`Database is available, number of User records is: ${userCount}`);
  });
});
