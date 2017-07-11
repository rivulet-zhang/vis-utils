/* eslint-disable max-len */
import Mst from './mst';
import Node from './node';

export default class Hdbscan {
  constructor(dataset, distFunc = Hdbscan.distFunc.euclidean) {
    this.data = dataset.map(val => val.data);
    this.opt = dataset.map(val => val.opt);
    this.distFunc = distFunc;
  }

  getTree() {
    const data = this.data;
    const opt = this.opt;
    if (!data || !data.length) {
      throw new Error('invalid data!');
    }

    if (data.length === 1) {
      return new Node({
        left: null,
        right: null,
        data, opt,
        dist: null,
        parent: null,
        edge: null
      });
    }

    const mst = new Mst(this.data, this.distFunc);
    const edges = mst.getMst();
    const nodes = data.map((val, i) => new Node({
      left: null,
      right: null,
      data: [val],
      opt: [opt[i]],
      dist: null,
      parent: null,
      edge: null
    }));

    let root = null;
    edges.sort((val1, val2) => val1.dist - val2.dist).forEach((val) => {
      const {edge, dist} = val;
      const left = nodes[edge[0]].getAncestor();
      const right = nodes[edge[1]].getAncestor();
      const node = new Node({
        left,
        right,
        data: left.data.concat(right.data),
        opt: left.opt.concat(right.opt),
        dist,
        parent: null,
        edge: [data[edge[0]],
        data[edge[1]]]
      });

      left.parent = right.parent = root = node;
    });
    return root;
  }

}

Hdbscan.distFunc = {
  euclidean: (p1, p2) => {
    let sum = 0;
    const len = p1.length;
    for (let i = 0; i < len; i += 1) {
      sum += Math.pow(p1[i] - p2[i], 2);
    }
    return Math.sqrt(sum);
  }
};
