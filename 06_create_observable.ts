import { Observable, Observer } from "rxjs";

console.clear();

const stream$: Observable<string> = Observable.create((observer: Observer<string>) => {
  observer.next("H");
  observer.next("O");
  observer.next("L");
  observer.next("A");
  observer.complete();
  observer.next("!"); // this won't be emitted
  return () =>
    console.log("the end");
});

stream$.subscribe(
  (x) => console.log("NEXT:", x),
  (err) => console.error("ERROR:", err),
  () => console.warn("COMPLETE"),
);