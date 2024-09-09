//Agregar las rutas de conexión al backend Aquí
// API Link de prueba en Emulador de Android: en PC
const API_BASE_URL = 'http://localhost:5000/api';

const apiRoutes = {
    // Rutas de usuario
    registrarUsuario: () => `${API_BASE_URL}/user/registrar_usuario`,
    confirmarCorreo: () => `${API_BASE_URL}/user/confirmar_correo`,
    solicitarCambioContrasena: () => `${API_BASE_URL}/user/solicitar_cambio_contrasena`,
    verificar_codigo_cambio_contrasena: () => `${API_BASE_URL}/user/verificar_codigo_cambio_contrasena`,
    cambiar_contrasena: () => `${API_BASE_URL}/user/cambiar_contrasena`,


    //Rutas Tipo de Documento
    obtenerTiposDocumentos: () => `${API_BASE_URL}/tipo_documento/obtenerTipoDocumento`,
    // Otras rutas
    // ...
};

export default apiRoutes;
