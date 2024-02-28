import { Choice, ProjectType, ReleaseTrain } from './types';
import { sortByName } from '../util';
import { getReleaseTrains } from './get-release-trains';

export async function getProductChoices(
  accessToken: string,
  types: ProjectType[]
): Promise<Choice<ReleaseTrain>[]> {
  const releaseTrains = await getReleaseTrains(accessToken, types);

  return releaseTrains
    .map((rt) => ({
      name: rt.name,
      value: rt,
    }))
    .sort(sortByName);
}
