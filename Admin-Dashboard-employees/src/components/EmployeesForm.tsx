import { useEffect, useState } from "react";
import type { Employee } from "../interfaces/Employee";

interface Props {
  editing: Employee | null;
  onSubmit: (data: Employee) => void;
}

export default function EmployeeForm({ editing, onSubmit }: Props) {
  const emptyForm: Employee = {
    nombre: "",
    apellidos: "",
    telefono: "",
    correo: "",
    direccion: "",
  };

  const [form, setForm] = useState<Employee>(emptyForm);

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm(emptyForm); // ← FIX: se limpia siempre
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md border space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editing ? "Editar empleado" : "Crear empleado"}
      </h2>

      <div className="space-y-2">
        <label className="block font-medium">Nombre</label>
        <input
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Apellidos</label>
        <input
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Apellidos"
          value={form.apellidos}
          onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Teléfono</label>
        <input
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Teléfono"
          value={form.telefono || ""}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Correo</label>
        <input
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Correo"
          value={form.correo}
          onChange={(e) => setForm({ ...form, correo: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Dirección</label>
        <input
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Dirección"
          value={form.direccion || ""}
          onChange={(e) => setForm({ ...form, direccion: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {editing ? "Guardar cambios" : "Crear empleado"}
      </button>
    </form>
  );
}
