import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalid" });
    req.user = user; // contiene { id, username, role, iat, exp }
    next();
  });
};

export const requireAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "No autorizado" });
  if (req.user.role !== 'admin') return res.status(403).json({ message: "Requiere rol admin" });
  next();
};
