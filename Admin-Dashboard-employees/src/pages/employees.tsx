import { useEffect, useState } from "react";
import API from "../api/axios";
import type { Employee } from "../interfaces/Employee";
import EmployeeForm from "../components/EmployeesForm";
import EmployeeRow from "../components/EmployeesRow";

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editing, setEditing] = useState<Employee | null>(null);

  const loadEmployees = async () => {
    try {
      const res = await API.get<Employee[]>("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error cargando empleados", err);
    }
  };

  const createEmployee = async (emp: Employee) => {
    await API.post("/employees", emp);
    await loadEmployees();
  };

  const updateEmployee = async (id: number, emp: Employee) => {
    await API.put(`/employees/${id}`, emp);
    await loadEmployees();
    setEditing(null);
  };

  const deleteEmployee = async (id?: number) => {
    if (!id) return;
    if (!confirm("¿Eliminar empleado?")) return;
    await API.delete(`/employees/${id}`);
    await loadEmployees();
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        Gestión de empleados
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* FORMULARIO */}
        <div className="col-span-1">
          <div className="bg-white shadow-md rounded-xl p-6 border">
            <EmployeeForm
              editing={editing}
              onSubmit={(data) => {
                if (editing && editing.id) updateEmployee(editing.id, data);
                else createEmployee(data);
              }}
            />
          </div>
        </div>

        {/* TABLA */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 shadow-md rounded-xl border">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Lista de empleados
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left text-gray-700">
                    <th className="p-3 font-medium">Nombre</th>
                    <th className="p-3 font-medium">Apellidos</th>
                    <th className="p-3 font-medium">Teléfono</th>
                    <th className="p-3 font-medium">Correo</th>
                    <th className="p-3 font-medium">Dirección</th>
                    <th className="p-3 font-medium text-center">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map((emp) => (
                    <EmployeeRow
                      key={emp.id}
                      employee={emp}
                      onEdit={() => setEditing(emp)}
                      onDelete={() => deleteEmployee(emp.id)}
                    />
                  ))}

                  {/* Si no hay empleados */}
                  {employees.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-gray-500">
                        No hay empleados registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
