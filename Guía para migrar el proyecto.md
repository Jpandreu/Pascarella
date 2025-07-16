# Pasta Pascarella - Guía para migrar el proyecto a otro PC

Esta guía te explica cómo **migrar y ejecutar la página web de Pasta Pascarella en otro ordenador** paso a paso.

---

## 1. Copia los archivos del proyecto

- Copia toda la carpeta del proyecto (por ejemplo, `Pascarella/`) a una memoria USB, disco externo o súbela a un servicio en la nube (Google Drive, OneDrive, etc.).
- En el nuevo PC, pega la carpeta en la ubicación deseada (por ejemplo, `C:\laragon\www\Pascarella`).

---

## 2. Instala Node.js

- Descarga e instala Node.js desde [nodejs.org](https://nodejs.org/).
- Esto instalará también `npm` (el gestor de paquetes de Node).

---

## 3. Instala las dependencias del proyecto

Abre una terminal (CMD, PowerShell o Terminal de VS Code) en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias necesarias indicadas en `package.json` (por ejemplo, `live-server`).

---

## 4. Ejecuta el servidor local

Puedes usar `live-server` para ver la web en tu navegador. Si está en los scripts de tu `package.json`, ejecuta:

```bash
npx live-server
```

O si tienes un script personalizado, por ejemplo:

```bash
npm start
```

Esto abrirá la web en tu navegador por defecto.

---

## 5. Accede a la web

- Abre tu navegador y ve a la dirección que te indique el terminal (normalmente `http://127.0.0.1:8080` o similar).
- Ya puedes navegar y probar la web localmente.

---

## 6. Notas adicionales

- Si usas Laragon, XAMPP u otro entorno local, asegúrate de copiar la carpeta a la ruta correcta (por ejemplo, `C:\laragon\www\`).
- Si tienes imágenes, vídeos u otros archivos estáticos, asegúrate de que se copien junto con el resto del proyecto.
- Si tienes una base de datos, deberás exportarla e importarla en el nuevo PC (no aplica si tu web es solo HTML/CSS/JS).

---

## 7. Solución de problemas

- Si ves errores de dependencias, repite `npm install`.
- Si los vídeos o imágenes no se ven, revisa las rutas de los archivos.
- Si tienes dudas, revisa la documentación de Node.js o del servidor local que utilices.

---

¡Listo! Ahora tu web