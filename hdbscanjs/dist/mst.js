'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable max-len */
var Mst = function () {
  function Mst(data, distFunc) {
    _classCallCheck(this, Mst);

    this.data = data;
    this.distFunc = distFunc;
    this.cachedDist = [];
    this.precomputeDist();
  }

  // cache distance matrix


  _createClass(Mst, [{
    key: 'precomputeDist',
    value: function precomputeDist() {
      for (var i = 0; i < this.data.length; i += 1) {
        for (var j = 0; j <= i; j += 1) {
          if (this.cachedDist.length <= i) {
            this.cachedDist.push([]);
          }
          this.cachedDist[i][j] = this.distFunc(this.data[i], this.data[j]);
        }
      }
    }
  }, {
    key: 'getMst',
    value: function getMst() {
      var _this = this;

      var data = this.data;
      if (!data || data.length <= 1) {
        throw new Error('Less than two points!');
      }

      var n = data.length;
      var distance = data.map(function () {
        return Number.MAX_VALUE;
      });
      var pointRemained = new Set(data.map(function (val, i) {
        return i;
      }));
      var parent = data.map(function () {
        return null;
      });
      var edges = [];

      var _loop = function _loop(i) {
        var minIndex = i === 0 ? 0 : Mst.findMinIndex(distance, pointRemained);
        pointRemained.delete(minIndex);
        edges.push({
          edge: [minIndex, parent[minIndex]],
          dist: distance[minIndex]
        });

        pointRemained.forEach(function (val) {
          var d = _this.distFunc(data[minIndex], data[val]);
          if (d < distance[val]) {
            distance[val] = d;
            parent[val] = minIndex;
          }
        });
      };

      for (var i = 0; i < n; i += 1) {
        _loop(i);
      }
      return edges.slice(1);
    }
  }], [{
    key: 'findMinIndex',
    value: function findMinIndex(arr, indexToConsider) {
      if (!arr || arr.length === 0) {
        throw new Error('Empty array!');
      }
      var min = Number.MAX_VALUE;
      var index = -1;
      indexToConsider.forEach(function (val) {
        if (arr[val] < min) {
          min = arr[val];
          index = val;
        }
      });
      return index;
    }
  }]);

  return Mst;
}();

exports.default = Mst;