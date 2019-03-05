import {interval} from "rxjs";
import {map, filter} from "rxjs/operators";

console.clear();
console.info("Start");

const source = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];

const source$ = interval(1000).pipe(
  map(i => parseInt(source[i])),
  filter(x => !isNaN(x)),
);

source$.subscribe(
  (x) => console.log("NEXT:", x),
  (err: Error) => console.error("ERROR:", err.message),
  () => console.info("COMPLETE"),
);

console.info("End");