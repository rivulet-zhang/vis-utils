/* eslint-disable max-len */
import Mst from './mst';
import Bbox from './bbox';

class Node {
  constructor({ left, right, data, dist, parent, opt, edge }) {
    this.left = left;
    this.right = right;

    this.data = data;
    this.dist = dist;
    this.opt = opt;
    this.edge = edge;
    this.bbox = new Bbox(data);

    this.parent = parent;
  }

  get isLeaf() {
    return this.left === null && this.right === null;
  }

  getAncestor() {
    if (!this.parent) {
      return this;
    }
    return this.parent.getAncestor();
  }

  toString() {
    return `data: ${this.data.join(' ')}, edge:, ${this.edge ? this.edge.join(' ') : ' '}`;
  }

  // filter from top to bottom, if true, terminate and return the node, othervise, test the children
  filter(filterFunc, bbox = null) {
    if(bbox !== null && !this.bbox.intersect(bbox))
      return [];

    const flag = filterFunc(this);
    if (flag) {
      return [this];
    }
    const l = this.left ? this.left.filter(filterFunc, bbox) : [];
    const r = this.right ? this.right.filter(filterFunc, bbox) : [];
    return l.concat(r);
  }
}

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
      return new Node({ left: null, right: null, data, opt, dist: null, parent: null, edge: null });
    }

    const mst = new Mst(this.data, this.distFunc);
    const edges = mst.getMst();
    const nodes = data.map((val, i) => new Node({ left: null, right: null, data: [val], opt: [opt[i]], dist: null, parent: null, edge: null }));

    let root = null;
    edges.sort((val1, val2) => val1.dist - val2.dist).forEach((val) => {
      const { edge, dist } = val;
      const left = nodes[edge[0]].getAncestor();
      const right = nodes[edge[1]].getAncestor();
      const node = new Node({ left, right, data: left.data.concat(right.data), opt: left.opt.concat(right.opt), dist, parent: null, edge: [data[edge[0]], data[edge[1]]] });
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
