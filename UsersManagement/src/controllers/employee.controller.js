import { Employee } from "../models/index.js";
import { Op } from "sequelize";

export const createEmployee = async (req, res) => {
  try {
    const { nombre, apellidos, telefono, correo, direccion } = req.body;
    const emp = await Employee.create({ nombre, apellidos, telefono, correo, direccion });
    res.status(201).json(emp);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error al crear empleado", error: err.message });
  }
};

export const listEmployees = async (req, res) => {
  const employees = await Employee.findAll({ order: [["id","DESC"]] });
  res.json(employees);
};

export const getEmployee = async (req, res) => {
  const { id } = req.params;
  const emp = await Employee.findByPk(id);
  if (!emp) return res.status(404).json({ message: "Empleado no encontrado" });
  res.json(emp);
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const emp = await Employee.findByPk(id);
  if (!emp) return res.status(404).json({ message: "Empleado no encontrado" });
  await emp.update(req.body);
  res.json(emp);
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const emp = await Employee.findByPk(id);
  if (!emp) return res.status(404).json({ message: "Empleado no encontrado" });
  await emp.destroy();
  res.json({ message: "Empleado eliminado" });
};

export const searchEmployeesByName = async (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: "Query 'q' requerida" });
  const results = await Employee.findAll({
    where: {
      [Op.or]: [
        { nombre: { [Op.like]: `%${name}%` } },
        { apellidos: { [Op.like]: `%${name}%` } }
      ]
    }
  });
  res.json(results);
};
