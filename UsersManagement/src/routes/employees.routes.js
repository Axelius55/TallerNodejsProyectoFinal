import express from "express";
import {
  createEmployee,
  listEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployeesByName
} from "../controllers/employee.controller.js";

import { authenticateToken, requireAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// todas las rutas protegidas por token y rol admin
router.use(authenticateToken, requireAdmin);

router.post("/", createEmployee);
router.get("/", listEmployees); // listar todos
router.get("/search", searchEmployeesByName); // buscar por name=...
router.get("/:id", getEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
