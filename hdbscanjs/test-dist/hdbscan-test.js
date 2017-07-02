'use strict';

var _chai = require('chai');

var _hdbscan = require('../dist/hdbscan');

var _hdbscan2 = _interopRequireDefault(_hdbscan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global it, describe, before, after, console */
/* eslint-disable max-len */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

describe('hdbscan', function () {
  var hdbscan = void 0;
  // const data = Array(10).fill(0).map((val, i) => [Math.cos((Math.PI / 5) * i), Math.sin((Math.PI / 5) * i)]);
  var data = [[0, 0], [1, 0], [2, 0], [3, 3], [0, 4], [0, 3], [3, 4]];

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
});