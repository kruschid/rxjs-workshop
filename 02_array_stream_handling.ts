import {from} from "rxjs";
import {map, filter, reduce} from "rxjs/operators";

console.clear();
console.info("Start");

const source = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];

const source$ = from(source).pipe(
  map(x => parseInt(x)),
  filter(x => !isNaN(x)),
  reduce((x,y) => x+y),
);

source$.subscribe(x => console.log("Result:", x));

console.info("End");