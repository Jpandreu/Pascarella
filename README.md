# Pasta Pascarella

**Pasta Pascarella** es una tienda online familiar dedicada a la venta de pasta fresca artesana, elaborada con ingredientes naturales y siguiendo recetas tradicionales italianas. Nuestro objetivo es acercar el auténtico sabor de Italia a los hogares, ofreciendo productos de alta calidad, sin conservantes ni aditivos, y con la comodidad de recibirlos directamente en casa.

---

## 🖥️ ¿Qué encontrarás en nuestra web?

- **Landing page** con presentación, slider de videos y acceso rápido a productos destacados.
- **Catálogo de productos:** Variedad de pastas frescas (tagliatelle, ravioli, gnocchi, etc.) y salsas artesanas.
- **Carrito de compras** y proceso de checkout totalmente funcional.
- **Sección “Cómo funciona”** explicando el proceso de compra y entrega.
- **Beneficios** de consumir pasta fresca artesanal.
- **Testimonios** reales de clientes satisfechos.
- **Recetas** para inspirar a los clientes a cocinar con nuestros productos.
- **Página “Quiénes somos”** con historia familiar y línea de tiempo.
- **Contacto** mediante formulario.
- **Páginas legales**: Aviso legal, política de privacidad, cookies y condiciones de uso.
- **Página de error 404** personalizada.

---

## 📁 Estructura del proyecto

```
Pascarella/
├── assets/
│   ├── css/
│   │   └── main.css
│   └── js/
│       └── main.js
├── images/
│   ├── pastas/
│   ├── recetas/
│   └── testimonios/
├── legal/
│   ├── aviso-legal.html
│   ├── politica-privacidad.html
│   ├── politica-cookies.html
│   └── condiciones-uso.html
├── index.html
├── productos.html
├── como-funciona.html
├── quienes-somos.html
├── recetas.html
├── carrito.html
├── checkout.html
├── 404.html
├── README.md
├── Manual de uso - Pasta Pascarella.md
└── [otros archivos]
```

---

## 📝 Filosofía

Somos una familia apasionada por la cocina italiana y queremos compartir nuestra tradición y amor por la pasta fresca. Cada producto es elaborado a mano, cuidando cada detalle para que disfrutes de una experiencia auténtica y saludable.

---


## Backend PHP

El proyecto incluye un backend en PHP para gestionar el formulario de contacto:

- **Ubicación:** `assets/php/api.php` y `assets/php/config/conexion.php`
- **¿Qué hace?**
  - Recibe los datos enviados desde el formulario de contacto mediante JavaScript (`fetch` en `app.js`).
  - Inserta los datos en la base de datos MySQL en la tabla `contacto pascarella`.
  - Devuelve una respuesta en formato JSON para mostrar mensajes de éxito o error en la web.
- **Conexión a la base de datos:**
  - El archivo `conexion.php` contiene los datos de conexión (host, usuario, contraseña, base de datos). En este proyecto, los datos son ficticios y seguros para compartir.
  - Si usas datos reales, recuerda agregarlos a `.gitignore` y subir solo un archivo de ejemplo.
- **Estructura esperada de la tabla:**
  - `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
  - `Nombre` (VARCHAR)
  - `Correo electrónico` (VARCHAR)
  - `Missatge` (LONGTEXT)

**Nota:** El backend está preparado para entorno local y para recibir datos en formato JSON. Si quieres usar el formulario sin JavaScript, deberás adaptar el PHP para aceptar datos de formulario clásico (`$_POST`).

© 2025 Pasta Pascarella. Todos los derechos reservados. Creado por Josep Andreu.

Queda prohibida la reproducción, distribución o modificación total o parcial de este proyecto sin autorización expresa de Pasta Pascarella.