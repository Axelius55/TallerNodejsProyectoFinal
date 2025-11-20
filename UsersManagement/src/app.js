import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import empRoutes from "./routes/employees.routes.js";
import { initDB } from "./models/index.js";
import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from "./docs/swagger.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();


// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// rutas
app.use("/api/auth", authRoutes);
app.use("/api/employees", empRoutes);

// Documentación Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// health
app.get("/health", (req, res) => res.json({ status: "ok" }));

// iniciar DB y servidor
const start = async () => {
  try {
    await initDB();
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error("Fallo al iniciar:", err);
    process.exit(1);
  }
};

start();
