import { openDB } from "idb";

const DB_NAME = "BudgetTrackerDB";
const DB_VERSION = 1;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("transactions")) {
      const store = db.createObjectStore("transactions", { keyPath: "id" });
      store.createIndex("userId", "userId");
    }
  }
});

export async function cacheTransactions(transactions) {
  const db = await dbPromise;
  const tx = db.transaction("transactions", "readwrite");
  for (const item of transactions) tx.store.put(item);
  await tx.done;
}

export async function getCachedTransactions(userId) {
  const db = await dbPromise;
  return db.getAllFromIndex("transactions", "userId", userId);
}

export async function removeCachedTransaction(id) {
  const db = await dbPromise;
  return db.delete("transactions", id);
}
