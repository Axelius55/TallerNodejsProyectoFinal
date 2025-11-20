import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

// Necesario para usar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Recursos Humanos - Taller Node.js",
      version: "1.0.0",
      description: "Administración de empleados con JWT y Express.js",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },

  apis: [
    path.join(__dirname, "components.yaml"),
    path.join(__dirname, "paths/*.yaml"),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
