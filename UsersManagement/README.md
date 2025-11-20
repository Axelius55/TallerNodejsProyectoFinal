# Sistema de Administración de Empleados – Taller Node.js S.A. de C.V.

Este proyecto implementa un sistema interno de gestión de empleados para el departamento de Recursos Humanos. Permite realizar autenticación mediante JWT y ejecutar operaciones CRUD sobre empleados, accesibles únicamente para usuarios administradores registrados directamente en la base de datos.

---

## Características principales

1. Autenticación segura por JWT

2. Acceso restringido únicamente a usuarios con sesión iniciada

3. CRUD completo de empleados

4. Búsqueda de empleados por nombre

5. Base de datos MySQL ejecutada en Docker

6. Código modular con una arquitectura clara (routes, controllers, models, middlewares)

7. Documentación generada con Swagger UI

---

## Estructura del Proyecto

```pgsql
src/
 ├─ app.js
 ├─ routes/
 │   ├─ auth.routes.js
 │   └─ employees.routes.js
 ├─ controllers/
 │   ├─ auth.controller.js
 │   └─ employees.controller.js
 ├─ middlewares/
 │   └─ auth.middleware.js
 ├─ models/
 │   ├─ User.js
 │   ├─ Employee.js
 │   └─ index.js
 ├─ docs/
 │   ├─ swagger.js
 │   ├─ components.yaml
 │   └─ paths/
 │        ├─ auth.yaml
 │        ├─ employees.yaml
 └─ config/
      └─ db.js
```

---

## CLONAR EL REPO:

```bash
git clone https://github.com/Axelius55/TallerNodejsProyectoFinal.git
```
!!! Clonara el back y front

---

## Levantar la API

!Tener docker instalado 

Aquí se levanta la BD de mysql:

```bash
docker compose up -d
```

Se instalan dependencias: 

```bash
npm install
```

Correr seed:

```bash
npm run seed
```

esto creara un admin en BD (user: admin password: admin123)

Levantar express JS

```bash
npm run dev
```

--- 

## Documentación de endpoints en swagger

http://localhost:4000/api/docs

Incluye:

- Schemas

- Endpoints

- Ejemplos

- Seguridad con JWT

---

## Endpoints 

| Endpoint | Método | Descripción | Auth |
|----------|--------|-------------|------------|
| `/api/employees` | GET | Obtener todos los empleados | si |
| `/api/employees/:id` | GET | Obtener empleado por nombre | si |
| `/api/employees` | POST | Crear nuevo empleado | si |
| `/api/employees/:id` | PUT | Actualizar empleado | si |
| `/api/employees/:id` | DELETE | Eliminar empleado | si |
| `/api/auth/login` | POST | Autenticarte y obtener token | no |


---

## Arquitectura del sistema

Este proyecto sigue una arquitectura basada en capas:

Rutas (routes/)

- Se encargan de definir los endpoints y delegar a los controladores.

Controladores (controllers/)

- Implementan la lógica principal: login, CRUD de empleados, búsqueda, etc.

Modelos (models/)

- Definen las tablas usando Sequelize.

Middlewares

- Validan JWT y restringen acceso a rutas protegidas.

Documentación (docs/)

- Swagger organizado usando YAML.

---

## Seguridad

- JWT con expiración configurable

- Middleware de autenticación en todas las rutas de empleados

- Helmet para hardening HTTP

- CORS configurado

- Contraseñas hasheadas con bcrypt