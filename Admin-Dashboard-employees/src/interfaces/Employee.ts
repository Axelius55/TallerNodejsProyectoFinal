export interface Employee {
  id?: number;
  nombre: string;
  apellidos: string;
  telefono?: string | null;
  correo: string;
  direccion?: string | null;
}
