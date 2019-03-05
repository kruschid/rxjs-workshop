import { Observable, Observer } from "rxjs";
import {MongoClient, Db} from "mongodb";
import { mergeMap, tap, take } from "rxjs/operators";

/**
 * Bonus: create mongo client instance
 */

const MONGO_URI = "mongodb://localhost:27017";
const MONGO_DB = "base";

const db$: Observable<Db> = Observable.create((observer: Observer<Db>) => {
  let client: MongoClient;
  MongoClient.connect(MONGO_URI, (err, c) => {
    if (err){
      observer.error(err);
    } else {
      client = c;
      observer.next(client.db(MONGO_DB));
    }
  });

  return () => client.close();
});

console.clear();

db$.pipe(
  mergeMap((db) =>
    db.collection("pictures").find({}).toArray(),
  ),
  tap((pictures) =>
    console.log("Pictures:", pictures),
  ),
  take(1), // we need to close the connection
)
.subscribe();
