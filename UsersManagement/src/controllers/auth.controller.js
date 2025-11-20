import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Faltan credenciales" });

  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(401).json({ message: "Usuario o contraseña inválidos" });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ message: "Usuario o contraseña inválidos" });

  const payload = { id: user.id, username: user.username, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '8h' });

  res.json({ token, user: payload });
};
