'use strict';

var _hdbscan = require('../dist/hdbscan');

var _hdbscan2 = _interopRequireDefault(_hdbscan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('hdbscan', function () {
  var hdbscan = void 0;
  var data = Array(10).fill(0).map(function (val, i) {
    return {
      // data: [Math.cos((Math.PI / 5) * i), Math.sin((Math.PI / 5) * i)],
      data: [Math.random() * 360 - 180, Math.random() * 180 - 90],
      opt: Math.random()
    };
  });
  // const data = [
  //   {data: [0, 0], opt: 1},
  //   {data: [1, 0], opt: 2},
  //   {data: [2, 0], opt: 3},
  //   {data: [3, 0], opt: 4},
  //   {data: [-2, 0], opt: 5},
  //   {data: [-10, 0], opt: 6}
  // ];

  before(function () {
    hdbscan = new _hdbscan2.default(data, _hdbscan2.default.distFunc.geoDist);
  });

  after(function () {
    hdbscan = undefined;
  });

  it('getTree', function () {
    var root = hdbscan.getTree();
    var filtered = root.filter(function (val) {
      return val.data.length === 2;
    }, { minX: -180, maxX: 180, minY: -90, maxY: 90 });
    filtered.forEach(function (x) {
      return console.log(x.toString());
    });
  });
}); /* global it, describe, before, after, console */
/* eslint-disable max-len */
/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
// import { expect } from 'chai';