import { existsSync } from 'fs';
import { ProjectType } from './types';
import path = require('path');

export function verifyProjectType(): { types: ProjectType[]; valid: boolean; error?: string } {
  const types = getProjectTypes();
  let valid = true;
  let error: string = undefined;
  if (types.length === 0) {
    valid = false;
    error = 'Project type not recognized.';
  }

  return {
    types: types,
    valid,
    error,
  };
}

function getProjectTypes(): ProjectType[] {
  const types = [] as ProjectType[];
  if (existsSync(path.join(process.cwd(), 'package.json'))) {
    types.push('npm');
  }
  return types;
}
