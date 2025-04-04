// AuthService.js
// Login del usuario
export const loginUser = async (email, password) => {
  try {
    console.log('Intentando iniciar sesión con:', { email, password });

    const response = await fetch('http://localhost:8085/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json(); // Obtener detalles del error en formato JSON
      console.error('Error de autenticación:', errorData);
      throw new Error(errorData.message || 'Error de autenticación'); // Asegúrate de que el servidor devuelva un mensaje de error
    }

    const data = await response.json();
    console.log('Datos recibidos del servidor:', data);
    return data; // Debería contener { token: "el_token" }
  } catch (error) {
    console.error('Error en loginUser:', error);
    throw error; // Lanza el error para que el componente pueda manejarlo
  }
};


// Registro de usuario
export const registerUser = async (email, password) => {
  try {
    const response = await fetch('http://localhost:8085/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorDetails = await response.text(); // Obtén el detalle del error
      console.error('Error de registro:', errorDetails);
      throw new Error('Error de registro');
    }

    const data = await response.json();
    return data; // Debería contener { token: "el_token" }
  } catch (error) {
    console.error('Error en registerUser:', error);
    throw error;
  }
};

// Recuperación de contraseña
export const recoverPassword = async (id, email, newPassword) => {
  try {
    const response = await fetch('http://localhost:8085/auth/recover-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, email, newPassword }),
    });

    if (!response.ok) {
      const errorDetails = await response.text(); // Obtén el detalle del error
      console.error('Error al recuperar la contraseña:', errorDetails);
      throw new Error('Error al recuperar la contraseña');
    }

    const data = await response.json();
    return data; // Debería contener un mensaje como "Contraseña actualizada con éxito"
  } catch (error) {
    console.error('Error en recoverPassword:', error);
    throw error;
  }
};
