import { interval, of, merge } from "rxjs";
import { switchMap, map, delay, take } from "rxjs/operators";

console.clear();

const jobA$ = interval(1000).pipe(map((i) => `A${i}`)); // infinite
const jobB$ = interval(500).pipe(map((i) => `B${i}`)); // infinite
const jobC$ = interval(700).pipe(map((i) => `C${i}`), take(7)); // completes after 7 items

merge(
  of(jobA$),
  of(jobB$).pipe(delay(5000)),
  of(jobC$).pipe(delay(10000)),
)
.pipe(
  switchMap((job$, i) => {
    console.log(`starting job ${i}`);
    return job$;
  })
)
.subscribe(
  (x) => console.log("NEXT:", x),
  (err) => console.error("ERROR:", err),
  () => console.warn("COMPLETE"),
);
