import { dispose } from "./e2e-utils";

const globalTeardown = async () => await dispose();

export default globalTeardown;
