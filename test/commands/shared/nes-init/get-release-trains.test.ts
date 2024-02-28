import { expect, test } from '@oclif/test';
import { ApolloClient } from '@apollo/client/core';
import { getReleaseTrains } from '../../../../src/shared/nes-init/get-release-trains';
import { ProjectType } from '../../../../src/shared/nes-init/types';
import { mockTrains } from '../../../../src/shared/nes-init/mock-trains';

describe('getReleaseTrains', () => {
  const mockResult = mockTrains;
  test
    .stub(ApolloClient.prototype, 'query', async () => ({
      data: {
        licensing: {
          releaseTrains: { results: mockResult },
        },
      },
    }))
    .it('should return an array of release trains', async () => {
      const accessToken = 'mock-access-token';
      const types = ['npm'] as ProjectType[];
      const releaseTrains = await getReleaseTrains(accessToken, types);

      expect(releaseTrains.length).to.equal(1);
    });

  test
    .stub(ApolloClient.prototype, 'query', async () => ({
      data: {
        licensing: {
          releaseTrains: { results: [] },
        },
      },
    }))
    .it('should return an empty array if no release trains are found', async () => {
      const accessToken = 'mock-access-token';
      const types = ['npm'] as ProjectType[];
      const releaseTrains = await getReleaseTrains(accessToken, types);

      expect(releaseTrains).to.deep.equal([]);
    });

  test
    .stub(ApolloClient.prototype, 'query', () => {
      throw new Error('Failed to fetch release trains');
    })
    .it('should throw an error if fetching release trains fails', async () => {
      const accessToken = 'mock-access-token';
      const types = ['npm'] as ProjectType[];

      let error: Error | undefined = undefined;
      try {
        await getReleaseTrains(accessToken, types);
      } catch (e) {
        error = e;
      }

      expect(error).to.be.an.instanceOf(Error);
    });
});
