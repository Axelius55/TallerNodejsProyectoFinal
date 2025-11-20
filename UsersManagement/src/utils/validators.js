import Joi from "joi";

export const employeeSchema = Joi.object({
  nombre: Joi.string().min(2).max(150).required(),
  apellidos: Joi.string().min(2).max(150).required(),
  telefono: Joi.string().allow(null, ""),
  correo: Joi.string().email().required(),
  direccion: Joi.string().allow(null, "")
});
