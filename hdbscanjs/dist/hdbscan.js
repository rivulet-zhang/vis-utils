'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable max-len */


var _mst = require('./mst');

var _mst2 = _interopRequireDefault(_mst);

var _bbox = require('./bbox');

var _bbox2 = _interopRequireDefault(_bbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
  function Node(_ref) {
    var left = _ref.left,
        right = _ref.right,
        data = _ref.data,
        dist = _ref.dist,
        parent = _ref.parent,
        opt = _ref.opt,
        edge = _ref.edge;

    _classCallCheck(this, Node);

    this.left = left;
    this.right = right;

    this.data = data;
    this.dist = dist;
    this.opt = opt;
    this.edge = edge;
    this.bbox = new _bbox2.default(data);

    this.parent = parent;
  }

  _createClass(Node, [{
    key: 'getAncestor',
    value: function getAncestor() {
      if (!this.parent) {
        return this;
      }
      return this.parent.getAncestor();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'data: ' + this.data.join(' ') + ', edge:, ' + (this.edge ? this.edge.join(' ') : ' ');
    }

    // filter from top to bottom, if true, terminate and return the node, othervise, test the children

  }, {
    key: 'filter',
    value: function filter(filterFunc) {
      var bbox = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (bbox !== null && !this.bbox.intersect(bbox)) return [];

      var flag = filterFunc(this);
      if (flag) {
        return [this];
      }
      var l = this.left ? this.left.filter(filterFunc, bbox) : [];
      var r = this.right ? this.right.filter(filterFunc, bbox) : [];
      return l.concat(r);
    }
  }, {
    key: 'isLeaf',
    get: function get() {
      return this.left === null && this.right === null;
    }
  }]);

  return Node;
}();

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
        return new Node({ left: null, right: null, data: data, opt: opt, dist: null, parent: null, edge: null });
      }

      var mst = new _mst2.default(this.data, this.distFunc);
      var edges = mst.getMst();
      var nodes = data.map(function (val, i) {
        return new Node({ left: null, right: null, data: [val], opt: [opt[i]], dist: null, parent: null, edge: null });
      });

      var root = null;
      edges.sort(function (val1, val2) {
        return val1.dist - val2.dist;
      }).forEach(function (val) {
        var edge = val.edge,
            dist = val.dist;

        var left = nodes[edge[0]].getAncestor();
        var right = nodes[edge[1]].getAncestor();
        var node = new Node({ left: left, right: right, data: left.data.concat(right.data), opt: left.opt.concat(right.opt), dist: dist, parent: null, edge: [data[edge[0]], data[edge[1]]] });
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
    var len = p1.length;
    for (var i = 0; i < len; i += 1) {
      sum += Math.pow(p1[i] - p2[i], 2);
    }
    return Math.sqrt(sum);
  }
};