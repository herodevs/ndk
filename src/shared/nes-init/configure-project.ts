import { configureNpmProject } from './npm/configure-npm-project';
import { Entry, ProjectType } from './types';

export function configureProject(
  accessToken: string,
  projectTypes: ProjectType[],
  packages: Entry[]
) {
  if (projectTypes.includes('npm')) {
    configureNpmProject(accessToken, packages);
  }
}
