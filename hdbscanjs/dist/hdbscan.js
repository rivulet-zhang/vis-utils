'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable max-len */


var _mst = require('./mst');

var _mst2 = _interopRequireDefault(_mst);

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _geolib = require('geolib');

var _geolib2 = _interopRequireDefault(_geolib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hdbscan = function () {
  function Hdbscan(dataset) {
    var distFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Hdbscan.distFunc.euclidean;

    _classCallCheck(this, Hdbscan);

    this.data = dataset.map(function (val) {
      return val.data;
    });
    this.opt = dataset.map(function (val) {
      return val.opt;
    });
    this.distFunc = distFunc;
  }

  _createClass(Hdbscan, [{
    key: 'getTree',
    value: function getTree() {
      var data = this.data;
      var opt = this.opt;
      if (!data || !data.length) {
        throw new Error('invalid data!');
      }

      if (data.length === 1) {
        return new _node2.default({
          left: null,
          right: null,
          data: data, opt: opt,
          dist: null,
          parent: null,
          edge: null
        });
      }

      var mst = new _mst2.default(this.data, this.distFunc);
      var edges = mst.getMst();
      var nodes = data.map(function (val, i) {
        return new _node2.default({
          left: null,
          right: null,
          data: [val],
          opt: [opt[i]],
          dist: null,
          parent: null,
          edge: null
        });
      });

      var root = null;
      edges.sort(function (val1, val2) {
        return val1.dist - val2.dist;
      }).forEach(function (val) {
        var edge = val.edge,
            dist = val.dist;

        var left = nodes[edge[0]].getAncestor();
        var right = nodes[edge[1]].getAncestor();
        var node = new _node2.default({
          left: left,
          right: right,
          data: left.data.concat(right.data),
          opt: left.opt.concat(right.opt),
          dist: dist,
          parent: null,
          edge: [data[edge[0]], data[edge[1]]]
        });

        left.parent = right.parent = root = node;
      });
      return root;
    }
  }]);

  return Hdbscan;
}();

exports.default = Hdbscan;


Hdbscan.distFunc = {
  euclidean: function euclidean(p1, p2) {
    var sum = 0;
    if (p1.length !== p2.length) {
      throw new Error('unequal dimension in input data');
    }
    for (var i = 0; i < p1.length; i += 1) {
      sum += Math.pow(p1[i] - p2[i], 2);
    }
    return Math.sqrt(sum);
  },
  geoDist: function geoDist(p1, p2) {
    var gp1 = { longitude: p1[0], latitude: p1[1] };
    var gp2 = { longitude: p2[0], latitude: p2[1] };
    return _geolib2.default.getDistance(gp1, gp2);
  }
};