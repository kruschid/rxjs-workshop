import { interval, of } from "rxjs";
import { map, take, exhaustMap, tap, concat } from "rxjs/operators";

console.clear();

const jobs = [
  interval(1000).pipe(map((i) => `A${i}`), take(4), concat(of("A completed"))),
  interval(500).pipe(map((i) => `B${i}`), take(10), concat(of("B completed"))),
  interval(700).pipe(map((i) => `C${i}`), take(7), concat(of("C completed"))), 
];

const assignJob = () =>
  jobs[Math.floor(Math.random() * jobs.length)];

interval(3000)
.pipe(
  map(() => assignJob()),
  tap(() => console.log("trying to start next job")),
  exhaustMap((job$) => {
    console.log("starting job");
    return job$;
  }),
)
.subscribe(
  (x) => console.log("NEXT:", x),
  (err) => console.error("ERROR:", err),
  () => console.warn("COMPLETE"),
);
