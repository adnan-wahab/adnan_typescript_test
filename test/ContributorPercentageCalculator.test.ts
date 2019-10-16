import { ContributorPercentageCalculator } from '../src/ContributorPercentageCalculator';
import fetch from 'node-fetch';

const TEST_PORT = 5001;

describe(`Contributor Percentage`, async () => {
  let app: ContributorPercentageCalculator;

  beforeEach(async () => {
    app = new ContributorPercentageCalculator();
    app.listen(TEST_PORT);
  });

  afterEach(async () => {
    app.close();
  })

  it(`Calculates Contributor Percentage`, async () => {
    const result = await fetch(`http://localhost:${TEST_PORT}/contributorPercentage`);
    expect(result.status).toEqual(200);
    const response = await result.json();
    expect(response).toEqual([]);
  });

  it(`Returns 404 for missing route`, async () => {
    const result = await fetch(`http://localhost:${TEST_PORT}/notaroute`);
    expect(result.status).toEqual(404);
  });
});
