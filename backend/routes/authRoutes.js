import { Router } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { readDB, writeDB } from "../database/database.js";
import { requireAuth, signUser } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", async (req,res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message:"Name, email and password are required." });
  if (password.length < 6) return res.status(400).json({ message:"Password must be at least 6 characters." });

  const db = readDB();
  const normalized = email.trim().toLowerCase();
  if (db.users.some(u => u.email === normalized)) return res.status(409).json({ message:"An account with this email already exists." });

  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalized,
    passwordHash: await bcrypt.hash(password, 12),
    createdAt: new Date().toISOString()
  };

  db.users.push(user);
  writeDB(db);

  const safeUser = { id:user.id, name:user.name, email:user.email, createdAt:user.createdAt };
  res.status(201).json({ user:safeUser, token:signUser(user.id) });
});

router.post("/login", async (req,res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.email === String(email || "").trim().toLowerCase());

  if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
    return res.status(401).json({ message:"Invalid email or password." });
  }

  const safeUser = { id:user.id, name:user.name, email:user.email, createdAt:user.createdAt };
  res.json({ user:safeUser, token:signUser(user.id) });
});

router.get("/me", requireAuth, (req,res) => {
  const db = readDB();
  const user = db.users.find(u => u.id === req.userId);
  if (!user) return res.status(404).json({ message:"User not found." });
  res.json({ user:{ id:user.id, name:user.name, email:user.email, createdAt:user.createdAt } });
});

export default router;
