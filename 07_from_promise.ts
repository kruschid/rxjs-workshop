import {pathExists} from "fs-extra";
import { from } from "rxjs";
import { map } from "rxjs/operators";

console.clear();

from(pathExists("/tmp"))
.pipe(
  map((result) => `/tmp ${result ? "does" : "doesn't"} exist`),
)
.subscribe(
  (x) => console.log("NEXT:", x),
  (err) => console.error("ERROR:", err),
  () => console.warn("COMPLETE"),
);