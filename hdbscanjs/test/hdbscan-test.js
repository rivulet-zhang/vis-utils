/* global it, describe, before, after, console */
/* eslint-disable max-len */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import Hdbscan from '../dist/hdbscan';

describe('hdbscan', () => {
  let hdbscan;
  // const data = Array(10).fill(0).map((val, i) => [Math.cos((Math.PI / 5) * i), Math.sin((Math.PI / 5) * i)]);
  const data = [[0, 0], [1, 0], [2, 0], [3, 3], [0, 4], [0, 3], [3, 4]];

  before(() => hdbscan = new Hdbscan(data));
  after(() => hdbscan = undefined);

  it('getMst', () => {
    hdbscan.getTree();
    // expect(hdbscan.getTree()).to.have.lengthOf(4);
  });
});
