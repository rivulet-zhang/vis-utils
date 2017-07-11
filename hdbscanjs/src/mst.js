/* eslint-disable max-len */
export default class Mst {
  constructor(data, distFunc) {
    this.data = data;
    this.distFunc = distFunc;
    this.cachedDist = [];
    this.precomputeDist();
  }

  // cache distance matrix
  precomputeDist() {
    for (let i = 0; i < this.data.length; i += 1) {
      for (let j = 0; j <= i; j += 1) {
        if (this.cachedDist.length <= i) {
          this.cachedDist.push([]);
        }
        this.cachedDist[i][j] = this.distFunc(this.data[i], this.data[j]);
      }
    }
  }

  static findMinIndex(arr, indexToConsider) {
    if (!arr || arr.length === 0) {
      throw new Error('Empty array!');
    }
    let min = Number.MAX_VALUE;
    let index = -1;
    indexToConsider.forEach((val) => {
      if (arr[val] < min) {
        min = arr[val];
        index = val;
      }
    });
    return index;
  }

  getMst() {
    const data = this.data;
    if (!data || data.length <= 1) {
      throw new Error('Less than two points!');
    }

    const n = data.length;
    const distance = data.map(() => Number.MAX_VALUE);
    const pointRemained = new Set(data.map((val, i) => i));
    const parent = data.map(() => null);
    const edges = [];

    for (let i = 0; i < n; i += 1) {
      const minIndex = i === 0 ? 0 : Mst.findMinIndex(distance, pointRemained);
      pointRemained.delete(minIndex);
      edges.push({
        edge: [minIndex, parent[minIndex]],
        dist: distance[minIndex]
      });

      pointRemained.forEach((val) => {
        const d = this.distFunc(data[minIndex], data[val]);
        if (d < distance[val]) {
          distance[val] = d;
          parent[val] = minIndex;
        }
      });
    }
    return edges.slice(1);
  }

}
