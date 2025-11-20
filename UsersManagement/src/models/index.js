import sequelize from "../config/db.js";
import User from "./user.model.js";
import Employee from "./employee.model.js";

// Si se necesita relaciones, aquí se definen.
// e.g., User.hasMany(...)

const initDB = async () => {
  await sequelize.authenticate();
  // sync({ force: true }) borraría todo en dev; usar sync() en prod con migraciones reales.
  await sequelize.sync(); 
};

export { sequelize, User, Employee, initDB };
