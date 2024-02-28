import { sortByName } from '../util';
import { Choice, Entry, ReleaseTrain } from './types';

export function getPackageChoices(releaseTrain: ReleaseTrain): Choice<Entry>[] {
  return releaseTrain.entries
    .map((e) => ({
      name: e.packageVersion.origination.name,
      value: e,
    }))
    .sort(sortByName);
}
