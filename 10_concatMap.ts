import axios from "axios";
import { of } from "rxjs";
import { map, concatMap } from "rxjs/operators";

const URL = "https://postman-echo.com/post";

of(
  [2, 3, 5, 8, 13, 21, 34],
  "Hello World",
  `mutation { createToken (username: "recorder", password: "ˆ%$@f23*(13") { user, token }}`,
  JSON.stringify({a: 123, b: false, c: "Berlin"}),
)
.pipe(
  concatMap((payload, i) => {
    console.log(`subscribing to inner observable/promise ${i}`);
    return axios.post(URL, payload, {headers: {"content-type": "text/plain"}});
  }),
  map(({data: {data}}) => data),
)
.subscribe(
  (x) => console.log("NEXT:", x),
  (err) => console.error("ERROR:", err),
  () => console.warn("COMPLETE"),
);