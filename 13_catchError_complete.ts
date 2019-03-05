import { of } from "rxjs";
import { tap, catchError } from "rxjs/operators";

console.clear();

of(1, 2, 3, 4, 5).pipe(
	tap((x) => {
    if (x === 3) {
      throw Error("I don't like mondays");
    }
  }),
	catchError((_: Error) => of(3)),
)
.subscribe(
  (x) => console.log("NEXT:", x),
  (err) => console.error("ERROR:", err),
  () => console.warn("COMPLETE"),
);