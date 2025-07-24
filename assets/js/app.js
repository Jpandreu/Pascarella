document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  let respuesta = document.getElementById('respuesta-contacto');

  // Si no existe el div de respuesta, lo creamos dinámicamente
  if (!respuesta) {
    respuesta = document.createElement('div');
    respuesta.id = 'respuesta-contacto';
    respuesta.style.textAlign = 'center';
    respuesta.style.marginTop = '10px';
    form.parentNode.insertBefore(respuesta, form.nextSibling);
  }

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Recoge los valores de los inputs
      const nombre = document.getElementById('nombre').value;
      const correo = document.getElementById('correo').value;
      const mensaje = document.getElementById('mensaje').value;

      // Envía los datos al backend
      fetch('assets/php/api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: nombre,
          correo: correo,
          mensaje: mensaje
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          respuesta.textContent = "¡Mensaje enviado correctamente!";
          respuesta.style.color = "green";
          form.reset();
        } else if (data.message) {
          respuesta.textContent = data.message;
          respuesta.style.color = "red";
        } else {
          respuesta.textContent = "Ocurrió un error inesperado.";
          respuesta.style.color = "red";
        }
      })
      .catch(error => {
        respuesta.textContent = "Error de conexión. Intenta más tarde.";
        respuesta.style.color = "red";
      });
    });
  }
}); 