console.clear();
console.info("Start");

const source = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];

const result = source
  .map(x => parseInt(x))
  .filter(x => !isNaN(x))
  .reduce((x, y) => x + y);

console.log("Result:", result);
console.info("End");