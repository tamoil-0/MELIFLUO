# 🪵 MELIFLUO - Website con Panel Admin CMS

Website profesional de carpintería moderna con panel de administración completo para gestionar todo el contenido sin código.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

## 🚀 Características

- ✅ **Panel Admin CMS**: Edita todo el contenido desde el navegador
- ✅ **Carga de imágenes**: Sube fotos desde tu PC
- ✅ **Gestión de servicios**: Agregar, editar y eliminar servicios
- ✅ **Galería dinámica**: Administra tu portafolio de proyectos
- ✅ **Integración WhatsApp**: Botones de contacto configurables
- ✅ **Persistencia local**: Cambios guardados en localStorage
- ✅ **Responsive**: Optimizado para móviles y tablets
- ✅ **Animaciones**: Efectos suaves con Framer Motion

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior) - [Descargar aquí](https://nodejs.org/)
- **Git** - [Descargar aquí](https://git-scm.com/)
- Un editor de código (recomendado: [VS Code](https://code.visualstudio.com/))

## 🛠️ Instalación Paso a Paso

### 1. Clonar el Repositorio

Abre tu terminal o CMD y ejecuta:

```bash
git clone https://github.com/tamoil-0/MELIFLUO.git
```

### 2. Entrar a la Carpeta del Proyecto

```bash
cd MELIFLUO
```

### 3. Instalar Dependencias

Instala todos los paquetes necesarios:

```bash
npm install
```

Este comando instalará:
- React & React DOM
- Vite
- React Router DOM
- Framer Motion
- Lucide React (iconos)

### 4. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

Deberías ver algo como:

```
  VITE v7.3.1  ready in 213 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 5. Abrir en el Navegador

Visita: **http://localhost:5173/**

¡Listo! El sitio ya está corriendo en tu computadora.

## 🔐 Panel de Administración

### Acceder al Admin

1. Ve a: **http://localhost:5173/admin**
2. Ingresa las credenciales:
   - **Usuario**: `tamoil`
   - **Contraseña**: `tamoil12345`

### Secciones Editables

Una vez dentro del admin, puedes editar:

#### 📄 Portada (Hero)
- Título principal
- Subtítulo
- Texto del botón CTA

#### 👤 Nosotros (About)
- Título de sección
- 2 párrafos descriptivos
- Estadísticas (valores y etiquetas)

#### 🛠️ Servicios
- Agregar nuevos servicios
- Editar título, descripción e imagen
- Eliminar servicios existentes
- Subir imágenes desde tu PC

#### 🖼️ Galería
- Subir múltiples imágenes desde tu PC
- Eliminar imágenes individuales
- Agregar imágenes por URL

#### 📞 Contacto y Redes
- Teléfono
- Email
- Dirección
- WhatsApp (formato: `51999999999`)
- Instagram URL
- Facebook URL

### Carga de Imágenes

Para subir imágenes desde tu PC:
1. Click en **"Subir Imagen"** o **"Subir Imágenes desde PC"**
2. Selecciona una o varias imágenes (máx. 5MB c/u)
3. Se guardan automáticamente en localStorage

**Nota**: Las imágenes se convierten a base64. Para un sitio en producción con muchas imágenes, se recomienda usar un servicio como Cloudinary o AWS S3.

## 📦 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 🌐 Deploy en Vercel

El sitio ya está desplegado en:
**https://melifluo.vercel.app/**

Para hacer tu propio deploy:

1. Instala Vercel CLI:
```bash
npm install -g vercel
```

2. Sube tu proyecto:
```bash
vercel
```

3. Sigue las instrucciones en la terminal

## 🏗️ Estructura del Proyecto

```
MELIFLUO/
├── public/               # Archivos estáticos (imágenes, logo)
├── src/
│   ├── components/
│   │   └── Admin/       # Componentes del panel admin
│   │       ├── Login.jsx
│   │       └── Dashboard.jsx
│   ├── context/
│   │   └── ContentContext.jsx  # Estado global
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos
│   ├── index.css        # Estilos globales
│   └── main.jsx         # Entry point
├── vercel.json          # Configuración de Vercel
├── package.json
└── vite.config.js
```

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `src/index.css`:

```css
:root {
  --col-bg: #0a0a0a;         /* Fondo principal */
  --col-accent: #c6a87c;     /* Color acento (dorado) */
  --col-text-muted: #999;    /* Texto secundario */
}
```

### Cambiar Fuentes

Las fuentes están definidas en `src/index.css`. Actualmente usa:
- **Headings**: Urbanist
- **Body**: Inter

## 🔒 Seguridad

⚠️ **Importante**: Las credenciales del admin están hardcodeadas. Para producción:
- Implementa autenticación con JWT
- Usa variables de entorno
- Conecta una base de datos (Firebase, Supabase, MongoDB)

## 🐛 Solución de Problemas

### El admin no carga en producción
Asegúrate de tener el archivo `vercel.json` configurado correctamente.

### Las imágenes no se ven
Verifica que las rutas de las imágenes en `public/` sean correctas.

### WhatsApp no funciona
El número debe estar en formato: `51999999999` (código país + número, sin +)

## 📧 Contacto

**Desarrollado por Tamoil**

- 💼 GitHub: [@tamoil-0](https://github.com/tamoil-0)
- 📧 Email: [Contáctame](https://github.com/tamoil-0)
- 🔗 Portfolio: [Ver proyectos](https://github.com/tamoil-0?tab=repositories)

## 📄 Licencia

Este proyecto fue desarrollado para MELIFLUO Design Studio.

---

⭐ **¿Te gustó el proyecto?** Dale una estrella al repositorio en GitHub!

**🛠️ Built with React + Vite | Deployed on Vercel**
