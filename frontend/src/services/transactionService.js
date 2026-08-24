import { api } from "../api/client";
import { cacheTransactions, getCachedTransactions, removeCachedTransaction } from "../db/indexedDB";

export async function getTransactions(token, userId) {
  try {
    const result = await api.transactions(token);
    await cacheTransactions(result.transactions);
    return result.transactions;
  } catch (error) {
    const cached = await getCachedTransactions(userId);
    if (cached.length) return cached;
    throw error;
  }
}

export async function addTransaction(token, payload) {
  console.log("Adding transaction with payload:", payload);
  const result = await api.createTransaction(token, payload);
  
  await cacheTransactions([result.transaction]);
  return result.transaction;
}

export async function updateTransaction(token, id, payload) {
  const result = await api.updateTransaction(token, id, payload);
  console.log(result);
  await cacheTransactions([result.transaction]);
  return result.transaction;
}

export async function deleteTransaction(token, id) {
  await api.deleteTransaction(token, id);
  await removeCachedTransaction(id);
}
