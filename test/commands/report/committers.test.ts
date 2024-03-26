import { expect, test } from '@oclif/test';
import * as sinon from 'sinon';

const shelljs = require('shelljs');

// git log --since "2022-01-01" --until "2024-03-15" --pretty=format:%hΓΓΓΓ%anΓΓΓΓ%ad
const output = `
0c66817ΓΓΓΓDavid WelchΓΓΓΓFri Mar 1 13:13:22 2024 -0700
9be8560ΓΓΓΓDave WelchΓΓΓΓFri Mar 1 12:56:05 2024 -0700
a0e8b46ΓΓΓΓDavid WelchΓΓΓΓFri Mar 1 13:00:10 2024 -0700
74cf0e0ΓΓΓΓDavid WelchΓΓΓΓFri Mar 1 10:38:24 2024 -0700
389e840ΓΓΓΓMike BrocchiΓΓΓΓMon Feb 26 15:16:57 2024 -0500
babe458ΓΓΓΓMike BrocchiΓΓΓΓTue Feb 6 11:03:06 2024 -0500
639a2a2ΓΓΓΓMike BrocchiΓΓΓΓThu Feb 1 09:49:45 2024 -0500
cbba514ΓΓΓΓJeremyΓΓΓΓFri Sep 15 10:43:44 2023 -0400
56fe832ΓΓΓΓMike BrocchiΓΓΓΓWed Sep 13 16:42:32 2023 -0400
301b9f1ΓΓΓΓJeremyΓΓΓΓWed Sep 6 13:31:55 2023 -0400
3c5cf3cΓΓΓΓJeremy WellsΓΓΓΓMon Aug 28 13:42:34 2023 -0400
b145714ΓΓΓΓMike BrocchiΓΓΓΓFri Aug 25 12:12:57 2023 -0400
043d76bΓΓΓΓJeremy WellsΓΓΓΓFri Aug 18 15:30:46 2023 -0400
`.trim()

describe('report:committers', () => {

  const ogExec = shelljs.exec
  const myExec = (...args: any[]) => {
    // const result = ogExec(...args)
    // return result
    args[1](0, output, undefined);
    return undefined
  }

  sinon.replace(shelljs, 'exec', myExec)

  test
    .stdout({ print: true })
    // .stub(shelljs, 'exec', sinon.stub().returns('foobar'))
    .command(['report:committers'])
    .it('should output the committers', (ctx) => {
      expect(ctx.stdout).contain(`-COMMITTERS-`);
    });
});
