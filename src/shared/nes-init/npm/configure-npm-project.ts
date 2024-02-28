import { existsSync, readFileSync, writeFileSync } from 'fs';
import { Entry } from '../types';
import path = require('path');

export function configureNpmProject(accessToken: string, packages: Entry[]) {
  updatePackageJson(packages);
  updateNpmrc(accessToken);
}

function updatePackageJson(packages: Entry[]) {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJsonContents = readFileSync(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonContents);

  const pkgUpdates = packages
    .map((p) => ({ key: p.packageVersion.origination.name, value: p.packageVersion.fqns }))
    .reduce(
      (acc, cur) => {
        acc.deps[cur.key] = `npm:${cur.value}`;
        acc.overrides[cur.key] = { '.': `npm:${cur.value}` };
        return acc;
      },
      { deps: {}, overrides: {} }
    );

  packageJson.dependencies = { ...(packageJson.dependencies || {}), ...pkgUpdates.deps };
  packageJson.overrides = { ...(packageJson.overrides || {}), ...pkgUpdates.overrides };

  console.log(`updated pkg json (deps and overrides):
    ${JSON.stringify(packageJson.dependencies, null, 2)}
    ${JSON.stringify(packageJson.overrides, null, 2)}
  `);
  // writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

function updateNpmrc(accessToken: string) {
  const npmrcPath = path.join(process.cwd(), '.npmrc');
  let npmrcContents = '';
  if (existsSync(npmrcPath)) {
    npmrcContents = readFileSync(npmrcPath, 'utf8');
  }

  if (npmrcContents.includes(`@neverendingsupport:registry`)) {
    return;
  }

  const updatedContents =
    npmrcContents +
    `\n\n` +
    `@neverendingsupport:registry=https://registry.nes.herodevs.com/npm/pkg/` +
    `\n` +
    `//registry.nes.herodevs.com/npm/pkg/:_authToken="${accessToken}"`;

  console.log(`updated npmrc:\n${updatedContents}`);
  // writeFileSync(npmrcPath, updatedContents);
}
