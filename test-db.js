// test-db.js
// Utilizamos la URL exacta de tu implementación
const scriptURL = 'https://script.google.com/macros/s/AKfycbztmfYH3HJVs3UqYC6GLj9X8p3FRqi-FE4gVnMTORCe2Z8sWQiL1VugDztQhuwJ0F0p-A/exec';

const probarConexion = async () => {
  console.log('Iniciando prueba de conexión a Google Sheets...');

  // Datos de prueba que simulamos enviar desde el formulario
  const payload = {
    opcionSeleccionada: 'Prueba Automatizada',
    tipoBoton: 'Script de Validación',
    fecha: new Date().toISOString(),
  };

  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // Validamos si la respuesta del servidor es correcta (status 200-299)
    if (response.ok) {
      console.log('✅ Éxito: La petición alcanzó el servidor correctamente.');
      console.log('Por favor, revisa tu archivo de Google Sheets. Deberías ver una nueva fila con el texto "Prueba Automatizada".');
    } else {
      console.error('❌ Error del servidor:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.log('Revisa tu conexión a internet o verifica que la URL esté escrita correctamente.');
  }
};

probarConexion();