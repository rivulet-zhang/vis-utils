/* global it, describe, before, after, console */
/* eslint-disable max-len */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// import { expect } from 'chai';
import Hdbscan from '../dist/hdbscan';

describe('hdbscan', () => {
  let hdbscan;
  // const data = Array(10).fill(0).map((val, i) => [Math.cos((Math.PI / 5) * i), Math.sin((Math.PI / 5) * i)]);
  const data = [
    { data: [0, 0], opt: 1 },
    { data: [1, 0], opt: 2 },
    { data: [2, 0], opt: 3 },
    { data: [3, 0], opt: 4 },
    { data: [-2, 0], opt: 5 },
    { data: [-10, 0], opt: 6 }
  ];
  // const data = [
  //   { data: [0, 0], opt: 1 }
  // ];

  before(() => hdbscan = new Hdbscan(data));
  after(() => hdbscan = undefined);

  it('getTree', () => {
    const root = hdbscan.getTree();
    const filtered = root.filter(val => val.data.length < 4, {minX:-10, maxX:-1, minY:-10, maxY:10});
    filtered.forEach(x => console.log(x.toString()));
  });
});
