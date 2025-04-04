// script.js (Frontend)

// Seleccionamos el formulario
const form = document.getElementById('registroForm');

// Añadimos un "listener" para capturar el evento submit del formulario
form.addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevenimos el comportamiento por defecto (recargar la página)

  // Obtenemos los valores de los inputs
  const nombre = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('phone').value;
  const certificacion = document.getElementById('certification').value;

  // Creamos el objeto con los datos del formulario
  const userData = {
    name: nombre,
    email: email,
    phone: telefono,
    certification: certificacion
  };

  // Enviamos los datos al servidor usando fetch
  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)  // Enviamos los datos en formato JSON
    });

    const data = await response.json(); // Leemos la respuesta del servidor
    if (response.ok) {
      alert('¡Registro exitoso!');
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Error al enviar los datos al servidor:', error);
    alert('Hubo un error al registrar el usuario');
  }
});

