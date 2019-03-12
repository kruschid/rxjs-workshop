import { merge, timer } from "rxjs";
import { mapTo, groupBy, mergeMap, bufferTime, tap, toArray } from "rxjs/operators";
import Axios from "axios";

const URL = "https://postman-echo.com/post";

merge(
  timer(Math.random() * 1000).pipe(mapTo({path: "/users"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users/5"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users/5"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users/98"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users/6"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users/6"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users/6"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users/98"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users/5"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users/5"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users/98"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users/6"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users/6"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users/6"})),
  timer(Math.random() * 1000).pipe(mapTo({path: "/users/98"})),
)
.pipe(
  groupBy((request) => request.path),
  mergeMap((request$) => request$.pipe(
    bufferTime(500),
    tap(console.log),
    mergeMap(([{path}]) =>
      Axios.post(URL, path, {headers: {"content-type": "text/plain"}}),
    ),
  )),
  toArray(),
)
.subscribe(
  ({length}) => console.log("Requests made:", length),
  (err) => console.error("ERROR:", err),
  () => console.warn("COMPLETE"),
);
