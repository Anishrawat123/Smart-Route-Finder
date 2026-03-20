const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());

// Graph (Undirected)
const graph = {
  A: [
    { node: "B", weight: 5 },
    { node: "C", weight: 10 }
  ],
  B: [
    { node: "A", weight: 5 },
    { node: "D", weight: 3 }
  ],
  C: [
    { node: "A", weight: 10 },
    { node: "D", weight: 2 }
  ],
  D: [
    { node: "B", weight: 3 },
    { node: "C", weight: 2 }
  ],
};

// Dijkstra function
function dijkstra(graph, start, end) {
  let distances = {};
  let visited = {};
  let previous = {};

  // initialize
  for (let node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
  }

  distances[start] = 0;

  while (true) {
    let closestNode = null;
    let shortestDistance = Infinity;

    for (let node in distances) {
      if (!visited[node] && distances[node] < shortestDistance) {
        closestNode = node;
        shortestDistance = distances[node];
      }
    }

    if (closestNode === null) break;

    visited[closestNode] = true;

    for (let neighbor of graph[closestNode]) {
      let newDist = distances[closestNode] + neighbor.weight;

      if (newDist < distances[neighbor.node]) {
        distances[neighbor.node] = newDist;
        previous[neighbor.node] = closestNode;
      }
    }
  }

  // build path
  let path = [];
  let current = end;

  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  // if no path exists
  if (path[0] !== start) {
    return { error: "No path found" };
  }

  return {
    distance: distances[end], // FIXED KEY
    path: path
  };
}

// Route API
app.get("/route", (req, res) => {
  let { start, end } = req.query;

  // uppercase fix (IMPORTANT)
  start = start.toUpperCase();
  end = end.toUpperCase();

  if (!start || !end) {
    return res.json({ error: "Please provide start and end nodes" });
  }

  if (!graph[start] || !graph[end]) {
    return res.json({ error: "Invalid nodes" });
  }

  const result = dijkstra(graph, start, end);
  res.json(result);
});

// test route
app.get('/', (req, res) => {
  res.send("Server is running");
});

// server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});