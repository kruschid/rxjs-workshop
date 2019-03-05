import {pathExists} from "fs-extra";
import { bindNodeCallback } from "rxjs";
import { map } from "rxjs/operators";

console.clear();

bindNodeCallback(pathExists)("/tmp")
.pipe(
  map((result) => `/tmp ${result ? "does" : "doesn't"} exist`),
)
.subscribe(
  (x) => console.log("NEXT:", x),
  (err) => console.error("ERROR:", err),
  () => console.warn("COMPLETE"),
);