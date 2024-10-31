//Agregar las rutas de conexión al backend Aquí

import { obtenerUsuariosTabla } from "./services/userService";

// API Link de prueba en Emulador de Android: en PC
const API_BASE_URL = 'http://localhost:5000/api';

const apiRoutes = {
    // Rutas de usuario
    registrarUsuario: () => `${API_BASE_URL}/user/registrar_usuario`,
    confirmarCorreo: () => `${API_BASE_URL}/user/confirmar_correo`,
    solicitarCambioContrasena: () => `${API_BASE_URL}/user/solicitar_cambio_contrasena`,
    verificar_codigo_cambio_contrasena: () => `${API_BASE_URL}/user/verificar_codigo_cambio_contrasena`,
    cambiar_contrasena: () => `${API_BASE_URL}/user/cambiar_contrasena`,
    loginUsuario: () => `${API_BASE_URL}/user/login`,
    verificar_token_valido: () => `${API_BASE_URL}/user/verificar_token_valido`,
    obtenerUsuariosTabla: (page, limit) => `${API_BASE_URL}/user/obtenerUsuariosTabla/${page}/${limit}`,

    //Rutas Rol
    obtenerRol: () => `${API_BASE_URL}/roles/obtenerRoles`,
    obtenerInfoBasicaUser : () => `${API_BASE_URL}/user/obtener_info_basica_user`,

    //Rutas Tipo de Documento
    obtenerTiposDocumentos: () => `${API_BASE_URL}/tipo_documento/obtenerTipoDocumento`,

    //Rutas Categoria de Material
    obtenerCategoriaMaterial: () => `${API_BASE_URL}/categoria_material/obtenerCategoriaMaterial`,

    //Rutas Recurso Educativo
    crearRecursoEducativo: () => `${API_BASE_URL}/crear_recursos_educativos`,
    obtenerTipoMaterialEducativo: () => `${API_BASE_URL}/tipo_material_educativo/obtenerTipoMaterialEducativo`,
    obtenerMaterialEducativoTabla: (page,limit) => `${API_BASE_URL}/recursos_educativos/obtenerMaterialEducativoTabla/${page}/${limit}`,
    obtenerMaterialEducativoByID: (id) => `${API_BASE_URL}/recursos_educativos/obtenerMaterialEducativoByID/${id}`,

    //Rutas de Publicacion
    obtenerPublicaciones: () => `${API_BASE_URL}/desaparecido/obtenerDesaparecidos`,
    obtenerPublicacion: (id) => `${API_BASE_URL}/desaparecido/obtenerDesaparecido${id}`,
    crearPublicacion: () => `${API_BASE_URL}/desaparecido/crearDesaparecido`,
    actualizarPublicacion: (id) => `${API_BASE_URL}/desaparecido/updateDesaparecido/${id}`,
    eliminarPublicacion: (id) => `${API_BASE_URL}/desaparecido/deleteDesaparecido/${id}`,
    obtenerDesaparecidosTabla: (page,limit) => `${API_BASE_URL}/desaparecido/obtenerDesaparecidoTabla/${page}/${limit}`,
    obtenerInfoDesaparecidoByID: (id) => `${API_BASE_URL}/desaparecido/obtenerInfoDesaparecidoByID/${id}`,
    crearComentarioPublicaciones: () => `${API_BASE_URL}/desaparecido/crearComentarioPublicaciones`,

    //Rutas de Avistamientos
    crearAvistamiento: () => `${API_BASE_URL}/avistamiento/crearAvistamiento`,
    subirFotoAvistamiento: () => `${API_BASE_URL}/avistamiento/subirFotoAvistamiento`,
    obtenerAvistamientoPublicacion: (idPublicacion) => `${API_BASE_URL}/avistamiento/obtenerAvistamientoPublicacion/${idPublicacion}`,

    // Fotos publicacion
    subirArchivo: () => `${API_BASE_URL}/fotospublicacion/crearFotoPublicacion`,

    //Estados
    obtenerEstadosPublicaciones: () => `${API_BASE_URL}/estado/obtenerEstadosPublicaciones`,
    obtenerEstadosGeneral: () => `${API_BASE_URL}/estado/obtenerEstadosGeneral`,
    obtenerEstadosMaterialEducativo: () => `${API_BASE_URL}/estado/obtenerEstadosMaterialEducativo`,
    
    // Otras rutas
    // ...
};

export default apiRoutes;
