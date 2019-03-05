import { of, Observable, merge } from "rxjs";
import { tap, catchError } from "rxjs/operators";

console.clear();

of(1, 2, 3, 4, 5).pipe(
	tap((x) => {
    if (x === 3) {
      throw Error("I don't like mondays");
    }
  }),
  catchError((err: Error, stream$: Observable<number>) => {
    console.log(err.message);
    return merge(of(3), stream$);
    // return merge(
    //   of(3),
    //   timer(2000).pipe(mergeMapTo(stream$)),
    // );
  }),
)
.subscribe(
  (x) => console.log("NEXT:", x),
  (err) => console.error("ERROR:", err),
  () => console.warn("COMPLETE"),
);