//Agregar las rutas de conexión al backend Aquí

// import { actualizarPublicacion } from "./services/publicacionServices";
// import { obtenerUsuariosTabla } from "./services/userService";

// API Link de prueba en Emulador de Android: en PC
const API_BASE_URL = 'https://findus-backend-shfpl.ondigitalocean.app/api';

const apiRoutes = {
    // Rutas de usuario
    registrarUsuario: () => `${API_BASE_URL}/user/registrar_usuario`,
    confirmarCorreo: () => `${API_BASE_URL}/user/confirmar_correo`,
    solicitarCambioContrasena: () => `${API_BASE_URL}/user/solicitar_cambio_contrasena`,
    verificar_codigo_cambio_contrasena: () => `${API_BASE_URL}/user/verificar_codigo_cambio_contrasena`,
    cambiar_contrasena: () => `${API_BASE_URL}/user/cambiar_contrasena`,
    loginUsuario: () => `${API_BASE_URL}/user/login_user_bo`,
    verificar_token_valido: () => `${API_BASE_URL}/user/verificar_token_valido`,
    obtenerUsuariosTabla: (page, limit) => `${API_BASE_URL}/user/obtenerUsuariosTabla/${page}/${limit}`,
    obtenerUsuarioByID: (id) => `${API_BASE_URL}/user/${id}`,
    actualizarAdminAUsuario: (id) => `${API_BASE_URL}/user/admin_update_user/${id}`,
    obtenerInformacionesHome: () =>  `${API_BASE_URL}/user/obtener_informaciones_home_bo/`,
    obtenerInfoUserPerfil: () => `${API_BASE_URL}/user/obtener_info_user_perfil/`,
    verificarUsuarioLogueado: () => `${API_BASE_URL}/user/verificar_token_valido/`,
    cerrarPublicacion: (id,tipoCierre) => `${API_BASE_URL}/desaparecido/cerrarPublicacion/${id}/${tipoCierre}`,
    crearReporteBackoffice: () => `${API_BASE_URL}/user/crear_reporte_backoffice`,
    verificarUsuarioLink: () => `${API_BASE_URL}/user/verificar_usuario_link`,
    cambiarFotoPerfil: () => `${API_BASE_URL}/user/cambiar_foto_perfil`,

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
    desactivarRecursoEducativo: (id) => `${API_BASE_URL}/recursos_educativos/desactivarRecursoEducativo/${id}`,
    activarRecursoEducativo: (id) => `${API_BASE_URL}/recursos_educativos/activarRecursoEducativo/${id}`,
    editarRecursoEducativo: (id) => `${API_BASE_URL}/recursos_educativos/editarRecursoEducativo/${id}`,

    //Rutas de Publicacion
    obtenerPublicaciones: () => `${API_BASE_URL}/desaparecido/obtenerDesaparecidos`,
    obtenerPublicacion: (id) => `${API_BASE_URL}/desaparecido/obtenerDesaparecido${id}`,
    crearPublicacion: () => `${API_BASE_URL}/desaparecido/crearDesaparecido`,
    actualizarPublicacion: (id) => `${API_BASE_URL}/desaparecido/updateDesaparecido/${id}`,
    eliminarPublicacion: (id) => `${API_BASE_URL}/desaparecido/deleteDesaparecido/${id}`,
    obtenerDesaparecidosTabla: (page,limit,servicios_emergencia) => `${API_BASE_URL}/desaparecido/obtenerDesaparecidoTabla/${page}/${limit}/${servicios_emergencia}`,
    obtenerInfoDesaparecidoByID: (id) => `${API_BASE_URL}/desaparecido/obtenerInfoDesaparecidoByID_BO/${id}`,
    crearComentarioPublicaciones: () => `${API_BASE_URL}/desaparecido/crearComentarioPublicaciones`,
    obtenerInformacionEditarPublicacionBO: (id) => `${API_BASE_URL}/desaparecido/obtenerInformacionEditarPublicacionBO/${id}`,
    actualizarPublicacionBO: (id) => `${API_BASE_URL}/desaparecido/actualizarDesaparecidoBO/${id}`,
    activarPublicacion: (id) => `${API_BASE_URL}/desaparecido/activarPublicacion/${id}`,
    desactivarPublicacion: (id) => `${API_BASE_URL}/desaparecido/desactivarPublicacion/${id}`,
    verificarPublicacion: (id) => `${API_BASE_URL}/desaparecido/verificarPublicacion/${id}`,

    //Rutas de Avistamientos
    crearAvistamiento: () => `${API_BASE_URL}/avistamiento/crearAvistamiento`,
    subirFotoAvistamiento: () => `${API_BASE_URL}/avistamiento/subirFotoAvistamiento`,
    obtenerAvistamientoPublicacion: (idPublicacion) => `${API_BASE_URL}/avistamiento/obtenerAvistamientoPublicacion/${idPublicacion}`,
    activarAvistamiento: (id) => `${API_BASE_URL}/avistamiento/activarAvistamiento/${id}`,
    desactivarAvistamiento: (id) => `${API_BASE_URL}/avistamiento/desactivarAvistamiento/${id}`,
    verificarAvistamiento: (id) => `${API_BASE_URL}/avistamiento/verificarAvistamiento/${id}`,
    editarAvistamiento: (id) => `${API_BASE_URL}/avistamiento/editarAvistamiento/${id}`,

    // Fotos publicacion
    subirArchivo: () => `${API_BASE_URL}/fotospublicacion/crearFotoPublicacion`,
    actualizarFotoPublicacionBO: () => `${API_BASE_URL}/fotospublicacion/updateFotoPublicacionBO`,
    actualizarArchivoPubicacionBO: () => `${API_BASE_URL}/fotospublicacion/updateArchivoPoliciaPublicacionBO`,

    //Estados
    obtenerEstadosPublicaciones: () => `${API_BASE_URL}/estado/obtenerEstadosPublicaciones`,
    obtenerEstadosGeneral: () => `${API_BASE_URL}/estado/obtenerEstadosGeneral`,
    obtenerEstadosMaterialEducativo: () => `${API_BASE_URL}/estado/obtenerEstadosMaterialEducativo`,
    
    // Otras rutas
    // ...
};

export default apiRoutes;
