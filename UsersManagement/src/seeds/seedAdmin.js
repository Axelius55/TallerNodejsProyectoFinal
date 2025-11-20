import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { sequelize, User, initDB } from "../models/index.js";

const createAdminIfNeeded = async () => {
  try {
    await initDB();

    const adminUser = process.env.SEED_ADMIN_USERNAME || "admin";
    const adminPass = process.env.SEED_ADMIN_PASSWORD || "admin123";

    const existing = await User.findOne({ where: { username: adminUser }});
    if (existing) {
      console.log("Admin ya existe:", adminUser);
      process.exit(0);
    }

    const hash = await bcrypt.hash(adminPass, 10);
    const user = await User.create({ username: adminUser, passwordHash: hash, role: "admin" });
    console.log("Admin creado:", user.username, "contraseña:", adminPass);
    process.exit(0);
  } catch (err) {
    console.error("Error seed admin:", err);
    process.exit(1);
  }
};

createAdminIfNeeded();
