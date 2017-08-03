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

// two distance measure functions are supported:
// 1) euclidean
// 2) geoDist (take inputs as lonlat points)
const distFunc = Clustering.distFunc.geoDist;

const cluster = new Clustering(dataset, distFunc);
const treeNode = cluster.getTree();

const filterFunc = val => ...;
const bbox = {minX:.., maxX:.., minY:.., maxY:..};
const filteredNodes = treeNode.filter(filterFunc, bbox);
```

The returned `treeNode` object contains the following attributes:

* `left`: a pointer to the left child.
* `right`: a pointer to the right child.
* `data`: a list of points in the current cluster
* `index`: a list of indices corresponding to the points in the current cluster
* `opt`: a user-defined object that is aggregated (combined as a list using `concat`) during the clustering process
* `dist`: the distance between the two child clusters (`null` if the current node is a leaf)
* `edge`: the closest pair of points from the two child clusters: `[[p1x, p1y], [p2x, p2y]]` (`null` if the current node is a leaf)
* `bbox`: the bounding box of the current cluster (`{minX:.., maxX:.., minY:.., maxY:..}`)

The `treeNode` object contains a `filter` function that performs a top-down recursive filtering operation. If `true`, the test terminates and the current node is returned. Otherwise, the child nodes are tested. The return value of the `filter` function is a flag list of `treeNode`. The `filter` function is useful for *trimming* the cluster nodes based on certain conditions (e.g., current viewport).

The `filter` function takes an optional parameter called `bbox`, which defines a bounding box. If not `null`, only the nodes that intersect with the `bbox` will be returned.

## License

This project is licensed under the MIT License.
