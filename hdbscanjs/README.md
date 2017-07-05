Hierarchical DBSCAN Clustering in JavaScript -- In Progress

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
const tree = cluster.getTree();
```

The returned `tree` structure contains the following attributes:

* `left`: a pointer to the left child.
* `right`: a pointer to the right child.
* `data`: a list of points in the current cluster
* `index`: a list of indices corresponding to the points in the current cluster
* `opt`: a user-defined value that is aggregated during the clustering process (currently only support a numeric value, will extend to support an arbitrary object)
* `dist`: the distance between the two child clusters (`null` if the current node is a leaf)
* `edge`: the closest pair of points from the two child clusters (`null` if the current node is a leaf)

## License

This project is licensed under the MIT License.
