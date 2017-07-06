## Hierarchical DBSCAN Clustering in JavaScript -- In Progress ##

A JavaScript-based and *simplified* version of [hdbscan](https://github.com/scikit-learn-contrib/hdbscan).

### Installing

```
npm install hdbscanjs
```

### Example

```javascript
import Clustering from 'hdbscanjs';

const dataset = [
  {data: [0,0], opt: 0},
  ....
];

const cluster = new Clustering(dataset);
const treeNode = cluster.getTree();

const testFunc = val => ...;
const filteredNodes = treeNode.filter(testFunc);
```

The returned `treeNode` object contains the following attributes:

* `left`: a pointer to the left child.
* `right`: a pointer to the right child.
* `data`: a list of points in the current cluster
* `index`: a list of indices corresponding to the points in the current cluster
* `opt`: a user-defined value that is aggregated during the clustering process (currently only support a numeric value, will extend to support an arbitrary object)
* `dist`: the distance between the two child clusters (`null` if the current node is a leaf)
* `edge`: the closest pair of points from the two child clusters (`null` if the current node is a leaf)
* `bbox`: the bounding box of the current cluster (`{minX:.., maxX:.., minY:.., maxY:..}`)

The `treeNode` object contains a `filter` function that performs a top-down recursive filtering operation. If `true`, the test terminates and the current node is returned. Otherwise, the child nodes are tested. The return value of the `filter` function is a flag list of `treeNode`. The `filter` function is useful for *trimming* the cluster nodes based on certain conditions (e.g., current viewport).

## License

This project is licensed under the MIT License.
