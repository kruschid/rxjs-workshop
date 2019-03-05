| Operator | Input | Returns | Backpressure | Parallelism | Pursue criterion |
|---|---|---|---|---|---|
| mergeMap<I, R> | any | Observable | consumes immediately | 0 to unlimited | as soon as next input item is available |
| concatMap<I, R> | any | Observable | buffers next items (possible memory leak) | 0 to 1 inner observables | not before inner observable completes
| switchMap<I, R> | any | Observable | consumes immediately	| 0 to 1 inner observables | as soon as next input item is available unsubscribes from the current inner observable |
| exhaustMap<I, R> | any | Observable | drops next items | 0 to 1 inner observables | not before inner observable completes