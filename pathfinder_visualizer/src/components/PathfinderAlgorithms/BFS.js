class Queue {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }
  front() {
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  length() {
    return this.items.length;
  }
}

const BFS = (grid, start_index, end_index) => {
  const visited = [];
  let n = grid.length;
  let m = grid[0].length;
  const hashMap = {};
  const shortestPath = [];
  const animation = [];
  for (let i = 0; i < n; i++) {
    const array1D = [];
    for (let j = 0; j < m; j++) {
      array1D.push(0);
    }
    visited.push(array1D);
  }
  console.log(visited);
  let q = new Queue();
  q.push(start_index);
  visited[start_index.x][start_index.y] = 1;
  hashMap[`${start_index.x},${start_index.y}`] = {
    x: start_index.x,
    y: start_index.y,
  };
  animation.push([{ x: start_index.x, y: start_index.y }]);
  let found = false;
  while (!q.isEmpty()) {
    let loop = q.length();
    const temp = [];
    for (let k = 0; k < loop; k++) {
      let x = q.front().x;
      let y = q.front().y;
      q.pop();

      const dx = [-1, 0, 1, 0];
      const dy = [0, 1, 0, -1];
      // const dx = [-1, -1, 0, 1, 1, 1, 0, -1];
      // const dy = [0, 1, 1, 1, 0, -1, -1, -1];
      // const dx = [-1, 1, 1, -1];
      // const dy = [1, 1, -1, -1];

      for (let i = 0; i < 4; i++) {
        let newX = dx[i] + x;
        let newY = dy[i] + y;
        if (
          newX >= 0 &&
          newX < n &&
          newY >= 0 &&
          newY < m &&
          !visited[newX][newY]
        ) {
          hashMap[`${newX},${newY}`] = { x: x, y: y };
          q.push({ x: newX, y: newY });
          visited[newX][newY] = 1;
          temp.push({ x: newX, y: newY });
          if (newX === end_index.x && newY === end_index.y) {
            console.log("found");
            found = true;
            break;
          }
        }
      }
    }
    animation.push(temp);
    if (found) {
      break;
    }
  }
  let { x, y } = end_index;
  shortestPath.unshift({ x, y });
  while (!(x === start_index.x && y === start_index.y) && found) {
    // let { x: newX, y: newY } = hashMap[`${x},${y}`];
    // x = newX;
    // y = newY;
    let newX = hashMap[`${x},${y}`].x;
    let newY = hashMap[`${x},${y}`].y;
    x = newX;
    y = newY;
    console.log(newX, newY);
    shortestPath.unshift({ x: newX, y: newY });
  }
  return { animation, shortestPath, found };
};
export default BFS;
