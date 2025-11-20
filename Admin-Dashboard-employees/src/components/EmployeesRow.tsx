import type { Employee } from "../interfaces/Employee";

interface Props {
  employee: Employee;
  onEdit: () => void;
  onDelete: () => void;
}

export default function EmployeeRow({ employee, onEdit, onDelete }: Props) {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-3">{employee.nombre}</td>
      <td className="p-3">{employee.apellidos}</td>
      <td className="p-3">{employee.telefono || "-"}</td>
      <td className="p-3">{employee.correo}</td>
      <td className="p-3">{employee.direccion || "-"}</td>

      <td className="p-3 text-center">
        <button
          onClick={onEdit}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md mr-2"
        >
          Editar
        </button>

        <button
          onClick={onDelete}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded-md"
        >
          Borrar
        </button>
      </td>
    </tr>
  );
}
