import { expect } from '@oclif/test';
import { sortByName } from '../../../../src/shared/util/sort-by-name';

describe('sort-by-name', () => {
  it('should sort by name', () => {
    const a = { name: 'b' };
    const b = { name: 'a' };

    const result = sortByName(a, b);

    expect(result).equals(1);
  });
});
