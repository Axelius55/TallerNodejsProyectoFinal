import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Employee = sequelize.define("Employee", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: { type: DataTypes.STRING(150), allowNull: false },
  apellidos: { type: DataTypes.STRING(150), allowNull: false },
  telefono: { type: DataTypes.STRING(50), allowNull: true },
  correo: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  direccion: { type: DataTypes.STRING(300), allowNull: true }
}, {
  tableName: "employees",
  timestamps: true
});

export default Employee;
