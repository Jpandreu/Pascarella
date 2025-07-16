// Formulario de contacto
// Validación del formulario de contacto
document.addEventListener('DOMContentLoaded', () => { // Se ejecuta cuando el DOM está cargado
    const contactForm = document.getElementById('contact-form'); // Se obtiene el formulario de contacto
    if (contactForm) { // Si el formulario existe
        contactForm.addEventListener('submit', (event) => { // Se añade un evento al formulario
            event.preventDefault(); // Se evita que el formulario se envíe
            validateForm(); // Se valida el formulario
        });
    }
    function validateForm() { // Se define la función de validación
        const name = document.getElementById('name').value; // Se obtiene el valor del campo nombre
        const email = document.getElementById('email').value; // Se obtiene el valor del campo email
        const message = document.getElementById('message').value; // Se obtiene el valor del campo mensaje
        if (name === '' || email === '' || message === '') { // Si el nombre, email o mensaje están vacíos
            alert('Por favor, completa todos los campos.'); // Se muestra un mensaje de error
            return; // Se devuelve la función
        }
        alert('Gracias por tu mensaje, ' + name + '! Nos pondremos en contacto contigo pronto.'); // Se muestra un mensaje de éxito
        contactForm.reset(); // Se resetea el formulario
    }
});

// Seccion Carrito
// --- Carrito de compras: utilidades y lógica principal ---
const CARRITO_KEY = 'pascarella_carrito';

// Obtener carrito desde localStorage
function getCarrito() {
  return JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
}

// Guardar carrito en localStorage
function setCarrito(carrito) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
}

// Actualizar el contador del carrito en el header
function actualizarContadorCarrito() {
  const carrito = getCarrito();
  const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  document.querySelectorAll('.carrito-contador').forEach(el => el.textContent = total);
}

// Añadir producto al carrito
function agregarAlCarrito(producto) { // Se define la función de añadir producto al carrito
  let carrito = getCarrito(); // Se obtiene el carrito
  const index = carrito.findIndex(item => item.id === producto.id); // Se busca el producto en el carrito
  if (index !== -1) { // Si el producto ya existe en el carrito
    carrito[index].cantidad += 1; // Se incrementa la cantidad del producto
  } else { // Si el producto no existe en el carrito
    carrito.push({ ...producto, cantidad: 1 }); // Se añade el producto al carrito
  }
  setCarrito(carrito); // Se guarda el carrito en el localStorage
  actualizarContadorCarrito(); // Se actualiza el contador del carrito
}

// Eliminar producto del carrito
function eliminarDelCarrito(id) { // Se define la función de eliminar producto del carrito
  let carrito = getCarrito(); // Se obtiene el carrito
  carrito = carrito.filter(item => item.id !== id); // Se elimina el producto del carrito
  setCarrito(carrito); // Se guarda el carrito en el localStorage
  actualizarContadorCarrito(); // Se actualiza el contador del carrito
}

// Cambiar cantidad de un producto en el carrito
function cambiarCantidad(id, cantidad) { // Se define la función de cambiar la cantidad de un producto en el carrito
  let carrito = getCarrito(); // Se obtiene el carrito
  carrito = carrito.map(item => // Se cambia la cantidad del producto
    item.id === id ? { ...item, cantidad: cantidad > 0 ? cantidad : 1 } : item // Se actualiza la cantidad del producto
  );
  setCarrito(carrito); // Se guarda el carrito en el localStorage
  actualizarContadorCarrito(); // Se actualiza el contador del carrito
}

// Renderizar el carrito en carrito.html
function renderizarCarrito() { // Se define la función de renderizar el carrito en carrito.html
  const tbody = document.querySelector('.carrito-tabla tbody'); // Se obtiene el tbody del carrito
  const totalSpan = document.querySelector('.carrito-total-precio'); // Se obtiene el total del carrito
  const btnFinalizar = document.querySelector('.btn-cta'); // Se obtiene el botón de finalizar el carrito
  if (!tbody || !totalSpan || !btnFinalizar) return; // Si no existe el tbody, el total o el botón, se devuelve la función
  const carrito = getCarrito(); // Se obtiene el carrito
  tbody.innerHTML = ''; // Se limpia el tbody
  let total = 0; // Se inicializa el total
  
  // Detectar si estamos en pantalla móvil
  const isMobile = window.innerWidth <= 900; // Se detecta si estamos en pantalla móvil
  
  if (carrito.length === 0) { // Si el carrito está vacío
    // Si el carrito está vacío, deshabilita el botón
    btnFinalizar.setAttribute('disabled', 'disabled'); // Se deshabilita el botón
    btnFinalizar.classList.add('disabled'); // Se añade la clase disabled al botón
    totalSpan.textContent = '0,00 €'; // Se muestra el total
    return; // Se devuelve la función
  } else {
    // Si hay productos, habilita el botón
    btnFinalizar.removeAttribute('disabled'); // Se habilita el botón
    btnFinalizar.classList.remove('disabled'); // Se elimina la clase disabled al botón
  }
  carrito.forEach(item => { // Se recorre el carrito
    const subtotal = item.precio * item.cantidad; // Se calcula el subtotal
    total += subtotal; // Se actualiza el total
    const tr = document.createElement('tr'); // Se crea una fila
    
    // Añadir "/unidad" en móvil para el precio unitario
    const precioUnitario = isMobile ? `${item.precio.toFixed(2)} €/unidad` : `${item.precio.toFixed(2)} €`; // Se muestra el precio unitario
    
    tr.innerHTML = ` 
      <td>
        <img src="${item.imagen}" alt="${item.nombre}" class="carrito-img"> 
        ${item.nombre}
      </td>
      <td>
        <input type="number" value="${item.cantidad}" min="1" class="carrito-cantidad" data-id="${item.id}">
      </td>
      <td>${precioUnitario}</td>
      <td>${subtotal.toFixed(2)} €</td>
      <td><button class="carrito-eliminar" data-id="${item.id}">Eliminar</button></td>
    `;
    tbody.appendChild(tr); // Se añade la fila al tbody
  });
  totalSpan.textContent = total.toFixed(2) + ' €'; // Se muestra el total

  // Eventos para eliminar y cambiar cantidad
  tbody.querySelectorAll('.carrito-eliminar').forEach(btn => {
    btn.addEventListener('click', e => {
      eliminarDelCarrito(btn.dataset.id); // Se elimina el producto del carrito
      renderizarCarrito(); // Se renderiza el carrito
    });
  });
  tbody.querySelectorAll('.carrito-cantidad').forEach(input => { // Se recorren los inputs de la cantidad
    input.addEventListener('change', e => { // Se añade un evento al input
      const nuevaCantidad = parseInt(input.value, 10); // Se obtiene el valor del input
      cambiarCantidad(input.dataset.id, nuevaCantidad); // Se cambia la cantidad del producto
      renderizarCarrito();
    });
  });
}

// Vincular los botones "Añadir al carrito" en productos.html
function vincularBotonesProductos() { // Se define la función de vincular los botones "Añadir al carrito" en productos.html
  document.querySelectorAll('.producto').forEach(productoDiv => { // Se recorren los productos
    const btn = productoDiv.querySelector('.btn'); // Se obtiene el botón
    if (!btn) return; // Si no existe el botón, se devuelve la función
    btn.addEventListener('click', e => { // Se añade un evento al botón 
      e.preventDefault(); // Se evita que el botón se envíe
      // Extraer datos del producto
      const nombre = productoDiv.querySelector('h3').textContent; // Se obtiene el nombre del producto
      const precioTexto = productoDiv.querySelector('.precio').textContent; // Se obtiene el precio del producto
      const precio = parseFloat(precioTexto.replace(/[^\d,]/g, '').replace(',', '.')); // Se convierte el precio a número
      const imagen = productoDiv.querySelector('img').getAttribute('src'); // Se obtiene la imagen del producto
      const id = nombre.toLowerCase().replace(/\s+/g, '-'); // Se obtiene el id del producto
      agregarAlCarrito({ id, nombre, precio, imagen }); // Se añade el producto al carrito
      btn.textContent = '¡Añadido!'; // Se muestra el mensaje de éxito
      setTimeout(() => { btn.textContent = 'Añadir al carrito'; }, 1000); // Se muestra el mensaje de éxito
    });
  });
}

// Inicialización automática según la página
document.addEventListener('DOMContentLoaded', () => { // Se ejecuta cuando el DOM está cargado
  actualizarContadorCarrito(); // Se actualiza el contador del carrito
  optimizeImages(); // Se optimiza la carga de imágenes
  // Si estamos en productos.html
  if (document.body.contains(document.querySelector('.productos-grid'))) { 
    vincularBotonesProductos(); // Se vinculan los botones "Añadir al carrito" en productos.html
  }
  // Si estamos en carrito.html
  if (document.body.contains(document.querySelector('.carrito-tabla'))) {
    renderizarCarrito();
  }
});

// Optimización de rendimiento - Carga de imágenes
function optimizeImages() {
  // Añadir clase loaded a todas las imágenes para animaciones
  const images = document.querySelectorAll('img'); // Se obtienen todas las imágenes
  images.forEach(img => { // Se recorren las imágenes
    img.addEventListener('load', () => { // Se añade un evento al cargar la imagen
      img.classList.add('loaded'); // Se añade la clase loaded a la imagen
    });
  });
}

// Optimización de animaciones
function optimizeAnimations() {
  // Usar requestAnimationFrame para animaciones suaves
  const animate = (callback) => {
    requestAnimationFrame(callback);
  };

  // Optimizar hover effects
  document.querySelectorAll('.producto, .paso, .beneficio').forEach(element => { // Se recorren los elementos
    element.addEventListener('mouseenter', () => { // Se añade un evento al hacer hover
      animate(() => { // Se anima el elemento
        element.style.transform = 'scale(1.05)';
      });
    });

    element.addEventListener('mouseleave', () => { // Se añade un evento al hacer hover
      animate(() => { // Se anima el elemento
        element.style.transform = 'scale(1)';
      });
    });
  });
}

// Debounce para eventos de resize
function debounce(func, wait) { // Se define la función de debounce
  let timeout; // Se inicializa el timeout
  return function executedFunction(...args) { // Se define la función de debounce
    const later = () => { // Se define la función de debounce
      clearTimeout(timeout); // Se limpia el timeout
      func(...args); // Se ejecuta la función
    };
    clearTimeout(timeout); // Se limpia el timeout
    timeout = setTimeout(later, wait);
  };
}

// Optimizar el listener de resize
const debouncedResize = debounce(() => { // Se define la función de debounce
  if (document.body.contains(document.querySelector('.carrito-tabla'))) { // Si estamos en carrito.html
    renderizarCarrito(); // Se renderiza el carrito
  }
}, 250);

window.addEventListener('resize', debouncedResize); // Se añade un evento al resize

// --- Slider principal del hero ---
document.addEventListener('DOMContentLoaded', function() { // Se ejecuta cuando el DOM está cargado
  const slides = document.querySelectorAll('.slide'); // Se obtienen todas las slides
  const prev = document.querySelector('.slider-btn.prev'); // Se obtiene el botón anterior
  const next = document.querySelector('.slider-btn.next'); // Se obtiene el botón siguiente
  let current = 0;
  let timer;

  function showSlide(idx) { // Se define la función de mostrar la slide
    slides.forEach((s, i) => s.classList.toggle('active', i === idx)); 
    current = idx;
  }
  function nextSlide() { // Se define la función de mostrar la siguiente slide
    showSlide((current + 1) % slides.length);
  }
  function prevSlide() { // Se define la función de mostrar la slide anterior
    showSlide((current - 1 + slides.length) % slides.length);
  }
  next.addEventListener('click', () => { // Se añade un evento al botón siguiente
    nextSlide(); // Se muestra la siguiente slide
    resetTimer(); // Se reinicia el timer
  });
  prev.addEventListener('click', () => { // Se añade un evento al botón anterior
    prevSlide(); // Se muestra la slide anterior
    resetTimer(); // Se reinicia el timer
  });
  function autoSlide() { // Se define la función de mostrar la siguiente slide
    timer = setInterval(nextSlide, 8000);
  }
  function resetTimer() { // Se define la función de reiniciar el timer
    clearInterval(timer); // Se limpia el timer
    autoSlide(); // Se muestra la siguiente slide
  }
  showSlide(0); // Se muestra la primera slide
  autoSlide(); // Se muestra la siguiente slide
});

// --- Menú hamburguesa para móvil ---
document.addEventListener('DOMContentLoaded', function() { // Se ejecuta cuando el DOM está cargado
  const btn = document.querySelector('.hamburguesa'); // Se obtiene el botón
  const navUl = document.querySelector('nav ul'); // Se obtiene el nav ul
  if(btn && navUl) { // Si el botón y el nav ul existen
    btn.addEventListener('click', function() {
      navUl.classList.toggle('open');
    });
  }
});

// --- Animación de entrada para productos (IntersectionObserver) ---
document.addEventListener('DOMContentLoaded', function() { // Se ejecuta cuando el DOM está cargado
  const productos = document.querySelectorAll('.producto'); // Se obtienen todos los productos
  if ('IntersectionObserver' in window) { // Si el IntersectionObserver está disponible
    const obs = new IntersectionObserver((entries) => { // Se crea un observer
      entries.forEach(entry => { // Se recorren las entradas
        if (entry.isIntersecting) { // Si la entrada está intersectando
          entry.target.classList.add('visible'); // Se añade la clase visible a la entrada
        }
      });
    }, { threshold: 0.4 }); // Se observa cada producto
    productos.forEach(div => obs.observe(div)); // Se observa cada producto
  } else {
    // Fallback: mostrar todo si no hay soporte para el IntersectionObserver
    productos.forEach(div => div.classList.add('visible'));
  }
});

// --- Checkout: mostrar resumen del carrito ---
document.addEventListener('DOMContentLoaded', function() { // Se ejecuta cuando el DOM está cargado
  const carrito = JSON.parse(localStorage.getItem('pascarella_carrito')) || []; // Se obtiene el carrito
  const contenedor = document.getElementById('checkout-carrito'); // Se obtiene el contenedor
  const totalSpan = document.getElementById('checkout-total-precio'); // Se obtiene el total
  let total = 0; // Se inicializa el total
  if (carrito.length === 0) { // Si el carrito está vacío
    if (contenedor) contenedor.innerHTML = '<p>Tu carrito está vacío.</p>'; // Se muestra el mensaje de error
    if (totalSpan) totalSpan.textContent = '0,00 €'; // Se muestra el total
    return; // Se devuelve la función
  }
  let html = '<ul class="checkout-list">'; // Se crea el html de la lista
  carrito.forEach(item => { // Se recorren los items del carrito
    const subtotal = item.precio * item.cantidad; // Se calcula el subtotal
    total += subtotal; // Se actualiza el total
    html += `<li>
      <span>${item.nombre} x${item.cantidad}</span> 
      <span>${subtotal.toFixed(2)} €</span>
    </li>`;
  }); // Se añade el html de la lista
  html += '</ul>'; // Se cierra el html de la lista
  if (contenedor) contenedor.innerHTML = html; // Se muestra el html de la lista
  if (totalSpan) totalSpan.textContent = total.toFixed(2) + ' €'; // Se muestra el total
});

// Validación del formulario de checkout

document.addEventListener('DOMContentLoaded', () => { // Se ejecuta cuando el DOM está cargado
    const checkoutForm = document.getElementById('checkout-form'); // Se obtiene el formulario
    if (checkoutForm) { // Si el formulario existe
        checkoutForm.addEventListener('submit', (event) => { // Se añade un evento al formulario
            event.preventDefault(); // Se evita que el formulario se envíe
            validateCheckoutForm(); // Se valida el formulario
        });
    }
    function validateCheckoutForm() { // Se define la función de validar el formulario de checkout
        const nombre = document.getElementById('checkout-nombre').value.trim(); // Se obtiene el valor del campo nombre
        const direccion = document.getElementById('checkout-direccion').value.trim(); // Se obtiene el valor del campo dirección
        const ciudad = document.getElementById('checkout-ciudad').value.trim(); // Se obtiene el valor del campo ciudad
        const cp = document.getElementById('checkout-cp').value.trim(); // Se obtiene el valor del campo código postal
        const telefono = document.getElementById('checkout-telefono').value.trim(); // Se obtiene el valor del campo teléfono
        const email = document.getElementById('checkout-email').value.trim(); // Se obtiene el valor del campo email
        const pagoTarjeta = document.getElementById('pago-tarjeta').checked; // Se obtiene el valor del campo pago con tarjeta
        const pagoPaypal = document.getElementById('pago-paypal').checked; // Se obtiene el valor del campo pago con paypal
        const pagoContra = document.getElementById('pago-contrareembolso').checked; // Se obtiene el valor del campo pago contra reembolso

        if (!nombre || !direccion || !ciudad || !cp || !telefono || !email) { // Si el nombre, dirección, ciudad, código postal, teléfono o email están vacíos
            alert('Por favor, completa todos los campos.'); // Se muestra el mensaje de error
            return; // Se devuelve la función
        }
        if (!pagoTarjeta && !pagoPaypal && !pagoContra) { // Si no se ha seleccionado ningún método de pago
            alert('Por favor, selecciona un método de pago.'); // Se muestra el mensaje de error
            return; // Se devuelve la función
        }
        alert('¡Gracias por tu pedido, ' + nombre + '! Le enviaremos un correo con todos los detalles de su pedido.'); // Se muestra el mensaje de éxito
        checkoutForm.reset(); // Se resetea el formulario
    }
});

// --- Línea de tiempo animada en quienes-somos ---
document.addEventListener('DOMContentLoaded', function() { // Se ejecuta cuando el DOM está cargado
  const timelineItems = document.querySelectorAll('.timeline-item'); // Se obtienen todos los items de la línea de tiempo
  if ('IntersectionObserver' in window) { // Si el IntersectionObserver está disponible
    const obs = new IntersectionObserver((entries) => { // Se crea un observer
      entries.forEach(entry => { // Se recorren las entradas
        if (entry.isIntersecting) { // Si la entrada está intersectando
          entry.target.classList.add('visible'); // Se añade la clase visible a la entrada
        }
      });
    }, { threshold: 0.2 }); 
    timelineItems.forEach(item => obs.observe(item)); // Se observa cada item de la línea de tiempo
  } else {
    timelineItems.forEach(item => item.classList.add('visible')); // Se añade la clase visible a cada item de la línea de tiempo
  }
});

// --- Modales legales (footer) ---
document.addEventListener('DOMContentLoaded', function() { // Se ejecuta cuando el DOM está cargado
  document.querySelectorAll('.footer-link[data-modal]').forEach(link => { // Se obtienen todos los links del footer
    link.addEventListener('click', function(e) { // Se añade un evento al link
      e.preventDefault(); // Se evita que el link se envíe
      const modalId = link.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
  });
  document.querySelectorAll('.modal-legal .close-modal').forEach(btn => { // Se obtienen todos los botones de cerrar el modal
    btn.addEventListener('click', function() { // Se añade un evento al botón
      const modal = btn.closest('.modal-legal'); // Se obtiene el modal
      if (modal) { // Si el modal existe
        modal.style.display = 'none'; // Se oculta el modal
        document.body.style.overflow = ''; // Se permite el scroll
      }
    });
  });
  // Cerrar modal al hacer clic fuera del contenido
  document.querySelectorAll('.modal-legal').forEach(modal => { // Se obtienen todos los modales
    modal.addEventListener('click', function(e) { // Se añade un evento al modal
      if (e.target === modal) { // Si el target es el modal
        modal.style.display = 'none'; // Se oculta el modal
        document.body.style.overflow = '';
      }
    });
  });
});



