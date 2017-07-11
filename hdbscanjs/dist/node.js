'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

      if (bbox !== null && !this.bbox.intersect(bbox)) {
        return [];
      }

      if (filterFunc(this)) {
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

exports.default = Node;