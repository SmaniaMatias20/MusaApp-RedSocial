# 📱 MusaApp – Aplicación Web Interactiva 🌐✨

**MusaApp** es una plataforma web moderna y dinámica que fomenta la interacción entre usuarios mediante publicaciones, comentarios, reacciones y perfiles personalizados, todo dentro de un entorno protegido y bien diseñado.

---

## 🧠 Descripción General

MusaApp permite:
- Compartir contenido en forma de publicaciones.
- Comentar y reaccionar con "Me gusta".
- Personalizar perfiles de usuario.
- Controlar el acceso mediante autenticación segura con JWT.
- Gestionar la plataforma desde un panel administrativo completo con estadísticas visuales.

---

## 🔑 Características Destacadas

### 🔐 Autenticación segura con JWT
- Registro e inicio de sesión protegidos.
- Manejo de sesiones mediante **JSON Web Tokens**.
- Backend desarrollado con **NestJS** y validaciones robustas.

### 📝 Publicaciones y Reacciones
- Publicaciones con **título**, **descripción** e imagen opcional.
- Reacciones tipo "Me gusta".
- Comentarios ilimitados.
- Ordenamiento por **fecha** o **popularidad**.

### 👤 Perfiles Personalizables
- Edición de datos personales.
- Imagen de perfil actualizable.
- Vista de publicaciones y comentarios propios.

### ⚙️ Panel Administrativo
- Gestión de usuarios y publicaciones.
- Visualización de estadísticas del sistema.
- Acceso exclusivo para usuarios con rol de **administrador**.

### 📈 Estadísticas Dinámicas
- Gráficos interactivos con **ApexCharts.js**.
- Actividad por usuario, cantidad de comentarios y publicaciones.
- Filtros por rango de tiempo.

---

## 🛠️ Tecnologías Utilizadas

| Sección       | Tecnología           | Descripción                                           |
|---------------|----------------------|-------------------------------------------------------|
| 🧩 **Frontend**   | Angular                | Interfaz moderna, rápida y responsiva.                |
| 🚀 **Backend**    | NestJS (Node.js)       | Arquitectura escalable y modular.                     |
| 📦 **Base de Datos** | MongoDB               | Almacenamiento flexible y orientado a documentos.     |
| 📊 **Gráficos**     | ApexCharts.js + Angular | Visualización clara del comportamiento del sistema.  |

---

## 🧪 Instalación y Uso

### 🔧 Requisitos Previos
- Node.js y npm
- MongoDB en ejecución
- Angular CLI instalado globalmente

### 🚀 Clonar el Repositorio

```bash
git clone https://github.com/tuusuario/musaapp.git
cd musaapp
