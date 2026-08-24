import { Router } from "express";
import crypto from "crypto";
import { readDB, writeDB } from "../database/database.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();
router.use(requireAuth);

router.get("/", (req,res) => {
  const db = readDB();
  const transactions = db.transactions
    .filter(t => t.userId === req.userId)
    .sort((a,b) => new Date(b.date) - new Date(a.date));
  res.json({ transactions });
});

router.post("/", (req,res) => {
  const { amount, category, merchant, description, date, source="manual", sourceMessageId=null } = req.body;
  if (!amount || Number(amount) <= 0 || !date) return res.status(400).json({ message:"Amount and date are required." });

  const db = readDB();
  if (sourceMessageId && db.transactions.some(t => t.userId === req.userId && t.sourceMessageId === sourceMessageId)) {
    return res.status(409).json({ message:"This transaction has already been imported." });
  }
 
  const transaction = {
    id: crypto.randomUUID(),
    userId: req.userId,
    amount: Number(amount),
    category: category || "Other",
    merchant: merchant || "",
    description: description || "",
    date,
    source,
    sourceMessageId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.transactions.push(transaction);
  writeDB(db);
  res.status(201).json({ transaction });
});

router.put("/:id", (req,res) => {
  const db = readDB();
  const transaction = db.transactions.find(t => t.id === req.params.id && t.userId === req.userId);
  if (!transaction) return res.status(404).json({ message:"Transaction not found." });

  Object.assign(transaction, {
    amount: req.body.amount !== undefined ? Number(req.body.amount) : transaction.amount,
    category: req.body.category ?? transaction.category,
    merchant: req.body.merchant ?? transaction.merchant,
    description: req.body.description ?? transaction.description,
    date: req.body.date ?? transaction.date,
    updatedAt: new Date().toISOString()
  });

  writeDB(db);
  res.json({ transaction });
});

router.delete("/:id", (req,res) => {
  const db = readDB();
  const index = db.transactions.findIndex(t => t.id === req.params.id && t.userId === req.userId);
  if (index === -1) return res.status(404).json({ message:"Transaction not found." });

  db.transactions.splice(index,1);
  writeDB(db);
  res.json({ message:"Transaction deleted." });
});

export default router;
