'use strict';

var _hdbscan = require('../dist/hdbscan');

var _hdbscan2 = _interopRequireDefault(_hdbscan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('hdbscan', function () {
  var hdbscan = void 0;
  // const data = Array(10).fill(0).map((val, i) => [Math.cos((Math.PI / 5) * i), Math.sin((Math.PI / 5) * i)]);
  var data = [{ data: [0, 0], opt: 1 }, { data: [1, 0], opt: 2 }, { data: [2, 0], opt: 3 }, { data: [3, 0], opt: 4 }, { data: [-2, 0], opt: 5 }, { data: [-10, 0], opt: 6 }];

  before(function () {
    return hdbscan = new _hdbscan2.default(data);
  });
  after(function () {
    return hdbscan = undefined;
  });

  it('getMst', function () {
    hdbscan.getTree();
    // expect(hdbscan.getTree()).to.have.lengthOf(4);
  });
}); /* global it, describe, before, after, console */
/* eslint-disable max-len */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// import { expect } from 'chai';