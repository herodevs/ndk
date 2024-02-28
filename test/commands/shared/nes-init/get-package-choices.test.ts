import { expect, test } from '@oclif/test';
import { getPackageChoices } from '../../../../src/shared/nes-init/get-package-choices';
import { mockTrains } from '../../../../src/shared/nes-init/mock-trains';

describe('getPackageChoices', () => {
  let mockTrain: any;
  beforeEach(() => {
    mockTrain = {
      entries: [
        {
          packageVersion: {
            origination: {
              name: 'b',
              type: 'b',
              version: 'b',
            },
          },
        },
        {
          packageVersion: {
            origination: {
              name: 'a',
              type: 'a',
              version: 'a',
            },
          },
        },
      ],
    };
  });

  test.it('should return an array of package choices', () => {
    const mockTrain = mockTrains[0];
    const packageChoices = getPackageChoices(mockTrain);
    expect(packageChoices.length).to.equal(mockTrain.entries.length);
  });

  test.it('should map the entry to a choice', () => {
    mockTrain.entries = mockTrain.entries.filter((_, index) => index === 0);
    const entry = mockTrain.entries[0];
    const packageChoices = getPackageChoices(mockTrain);
    const expectedChoice = {
      name: entry.packageVersion?.origination?.name,
      value: entry,
    };
    expect(packageChoices[0]).to.deep.equal(expectedChoice);
  });

  test.it('should sort the choices by name', () => {
    const packageChoices = getPackageChoices(mockTrain);
    expect(packageChoices[0].name).to.equal('a');
    expect(packageChoices[1].name).to.equal('b');
  });
});
