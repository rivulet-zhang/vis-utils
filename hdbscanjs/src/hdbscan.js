/* eslint-disable max-len */
import Mst from './mst';

class Node {
  constructor({ left, right, index, data, dist, parent, opt }) {
    this.left = left;
    this.right = right;
    this.isLeaf = left === null && right === null;

    this.index = index;
    this.data = data;
    this.dist = dist;
    this.opt = opt;

    this.parent = parent;
  }

  getAncestor() {
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
  //   console.log(Array(tabs).fill(' ').join(' '), this.index.join(' '), ' dist:', this.dist, ' opt:', this.opt, ' data:', this.data);
  //   if (this.left !== null) {
  //     this.left.printTree(tabs + 1);
  //   }
  //   if (this.right !== null) {
  //     this.right.printTree(tabs + 1);
  //   }
  // }
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
    if (!data || data.length <= 1) {
      throw new Error('Less than two points!');
    }

    const mst = new Mst(this.data, this.distFunc);
    const edges = mst.getMst();
    // console.log(edges);
    const nodes = data.map((val, i) => new Node({ left: null, right: null, index: [i], data: [val], opt: opt[i], dist: null, parent: null }));

    let root = null;
    edges.sort((val1, val2) => val1.dist - val2.dist).forEach((val) => {
      const { edge, dist } = val;
      const left = nodes[edge[0]].getAncestor();
      const right = nodes[edge[1]].getAncestor();
      const node = new Node({ left, right, index: left.index.concat(right.index), data: left.data.concat(right.data), opt: left.opt + right.opt, dist, parent: null });
      left.parent = right.parent = root = node;
    });
    // root.printTree(0);
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
