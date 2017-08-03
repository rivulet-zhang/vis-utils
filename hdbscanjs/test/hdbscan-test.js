/* global it, describe, before, after, console */
/* eslint-disable max-len */
/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
// import { expect } from 'chai';
import Hdbscan from '../dist/hdbscan';

describe('hdbscan', () => {
  let hdbscan;
  const data = Array(10).fill(0).map((val, i) => ({
    // data: [Math.cos((Math.PI / 5) * i), Math.sin((Math.PI / 5) * i)],
    data: [Math.random() * 360 - 180, Math.random() * 180 - 90],
    opt: Math.random()
  }));
  // const data = [
  //   {data: [0, 0], opt: 1},
  //   {data: [1, 0], opt: 2},
  //   {data: [2, 0], opt: 3},
  //   {data: [3, 0], opt: 4},
  //   {data: [-2, 0], opt: 5},
  //   {data: [-10, 0], opt: 6}
  // ];

  before(() => {
    hdbscan = new Hdbscan(data, Hdbscan.distFunc.geoDist);
  });

  after(() => {
    hdbscan = undefined;
  });

  it('getTree', () => {
    const root = hdbscan.getTree();
    const filtered = root.filter(val => val.data.length === 2, {minX: -180, maxX: 180, minY: -90, maxY: 90});
    filtered.forEach(x => console.log(x.toString()));
  });
});
