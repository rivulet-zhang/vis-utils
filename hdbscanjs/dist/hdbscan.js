'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable max-len */


var _mst = require('./mst');

var _mst2 = _interopRequireDefault(_mst);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
  function Node(_ref) {
    var left = _ref.left,
        right = _ref.right,
        index = _ref.index,
        data = _ref.data,
        dist = _ref.dist,
        parent = _ref.parent;

    _classCallCheck(this, Node);

    this.left = left;
    this.right = right;
    this.isLeaf = left === null && right === null;

    this.index = index;
    this.data = data;
    this.dist = dist;

    this.parent = parent;
  }

  _createClass(Node, [{
    key: 'getAncestor',
    value: function getAncestor() {
      if (this.parent === null) {
        return this;
      }
      return this.parent.getAncestor();
    }

    // removeParentPointerForSubTree() {
    //   delete this.parent;
    //   if (this.left !== null) {
    //     this.left.removeParentPointerForSubTree();
    //   }
    //   if (this.right !== null) {
    //     this.right.removeParentPointerForSubTree();
    //   }
    // }

    // printTree(tabs) {
    //   console.log(Array(tabs).fill(' ').join(' '), this.index.join(' '), ' dist:', this.dist);
    //   if (this.left !== null) {
    //     this.left.printTree(tabs + 1);
    //   }
    //   if (this.right !== null) {
    //     this.right.printTree(tabs + 1);
    //   }
    // }

  }]);

  return Node;
}();

var Hdbscan = function () {
  function Hdbscan(data) {
    var distFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Hdbscan.distFunc.euclidean;

    _classCallCheck(this, Hdbscan);

    this.data = data;
    this.distFunc = distFunc;
  }

  _createClass(Hdbscan, [{
    key: 'getTree',
    value: function getTree() {
      var data = this.data;
      if (!data || data.length <= 1) {
        throw new Error('Less than two points!');
      }

      var mst = new _mst2.default(this.data, this.distFunc);
      var edges = mst.getMst();
      // console.log(edges);
      var nodes = data.map(function (val, i) {
        return new Node({ left: null, right: null, index: [i], data: null, dist: null, parent: null });
      });

      var root = null;
      edges.sort(function (val1, val2) {
        return val1.dist - val2.dist;
      }).forEach(function (val) {
        var edge = val.edge,
            dist = val.dist;

        var left = nodes[edge[0]].getAncestor();
        var right = nodes[edge[1]].getAncestor();
        var node = new Node({ left: left, right: right, index: left.index.concat(right.index), data: null, dist: dist, parent: null });
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