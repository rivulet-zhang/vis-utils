"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bbox = function () {
  // a list of points [x, y]
  function Bbox(arr) {
    _classCallCheck(this, Bbox);

    var xs = arr.map(function (val) {
      return val[0];
    });
    var ys = arr.map(function (val) {
      return val[1];
    });
    this.minX = Math.min.apply(null, xs);
    this.maxX = Math.max.apply(null, xs);
    this.minY = Math.min.apply(null, ys);
    this.maxY = Math.max.apply(null, ys);
  }

  _createClass(Bbox, [{
    key: "intersect",
    value: function intersect(_ref) {
      var minX = _ref.minX,
          maxX = _ref.maxX,
          minY = _ref.minY,
          maxY = _ref.maxY;

      var bbox = new Bbox([[minX, minY], [maxX, maxY]]);
      return Math.abs(this.center[0] - bbox.center[0]) < (this.width + bbox.width) * 0.5 && Math.abs(this.center[1] - bbox.center[1]) < (this.height + bbox.height) * 0.5;
    }
  }, {
    key: "width",
    get: function get() {
      return this.maxX - this.minX;
    }
  }, {
    key: "height",
    get: function get() {
      return this.maxY - this.minY;
    }
  }, {
    key: "center",
    get: function get() {
      return [(this.minX + this.maxX) * 0.5, (this.minY + this.maxY) * 0.5];
    }
  }]);

  return Bbox;
}();

exports.default = Bbox;