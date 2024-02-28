import { Command, ux } from '@oclif/core';
import * as inquirer from 'inquirer';
import { ReleaseTrain } from '../../shared/nes-init/types';
import { verifyProjectType } from '../../shared/nes-init/verify';
import { configureProject } from '../../shared/nes-init/configure-project';
import { getProductChoices } from '../../shared/nes-init/get-product-choices';
import { getPackageChoices } from '../../shared/nes-init/get-package-choices';

export class NesInit extends Command {
  static description = 'Initialize a project to use NES packages';

  static flags = {};

  static args = {};

  public async run(): Promise<void> {
    const projectType = verifyProjectType();

    // this.log('bypassing clean git check');
    const continueResponse = await inquirer.prompt([
      {
        name: 'proceed',
        message: 'Before initializing, please commit all changes. Continue?',
        type: 'confirm',
      },
    ]);
    if (!continueResponse.proceed) {
      return;
    }

    // this.log('bypassing token prompt');
    const tokenResponse = await inquirer.prompt([
      {
        name: 'token',
        message: 'Enter access token',
        mask: '*',
        type: 'password',
      },
    ]);

    const accessToken = tokenResponse.token;

    ux.action.start('loading your products');
    const productList = await getProductChoices(accessToken, projectType.types);
    ux.action.stop();

    const productResponse = await inquirer.prompt([
      {
        name: 'releaseTrain',
        message: 'select a product',
        type: 'list',
        choices: productList,
        loop: false,
        pageSize: productList.length, // no scrolling
      },
    ]);
    const releaseTrain: ReleaseTrain = productResponse.releaseTrain;

    const packageList = getPackageChoices(releaseTrain).map((p) => ({ ...p, checked: true }));

    const packageResponse = await inquirer.prompt([
      {
        name: 'packages',
        message: `select the package(s)`,
        type: 'checkbox',
        choices: packageList,
        loop: false,
        pageSize: packageList.length, // no scrolling
      },
    ]);
    const packages = packageResponse.packages;

    ux.action.start('configuring your project');

    configureProject(accessToken, projectType.types, packages);

    ux.action.stop();

    this.log('Your project is now configured to access your NES product');
  }
}
