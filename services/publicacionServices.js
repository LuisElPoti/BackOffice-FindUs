import apiRoutes from "../api_paths";
import axios from "axios";

export const obtenerPublicaciones = async () => {
    try {
        const response = await axios.get(apiRoutes.obtenerPublicaciones());
        return response;
    } catch (error) {
        return error.response;
    }
}

export const obtenerDesaparecidosTabla = async (page,limit, filtros, servicios_emergencia) => {
    try {
        const response = await axios.get(`${apiRoutes.obtenerDesaparecidosTabla(page,limit,servicios_emergencia)}?${filtros}`);
        console.log("ASASASAsa")
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}

export const obtenerPublicacion = async (id) => {
    try {
        const response = await axios.get(apiRoutes.obtenerPublicacion(id));
        return response;
    } catch (error) {
        return error.response;
    }
}

export const crearPublicacion = async (data, token) => {
    try {
        const response = await axios.post(apiRoutes.crearPublicacion(), data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const actualizarPublicacion = async (id, data, token) => {
    try {
        const response = await axios.put(apiRoutes.actualizarPublicacion(id), data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const eliminarPublicacion = async (id, token) => {
    try {
        const response = await axios.delete(apiRoutes.eliminarPublicacion(id), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}


export const obtenerInfoDesaparecidoByID = async (id) => {
    try {
        const response = await axios.get(apiRoutes.obtenerInfoDesaparecidoByID(id));
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}

export const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export const crearComentario = async (data,token) => {
    try {
        const response = await axios.post(apiRoutes.crearComentarioPublicaciones(), data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const obtenerInformacionEditarPublicacionBO = async (id) => {
    try {
        const response = await axios.get(apiRoutes.obtenerInformacionEditarPublicacionBO(id));
        return response;
    } catch (error) {
        return error.response
    }
}

export const actualizarPublicacionBO = async (id, data, token) => {
    try {
        const response = await axios.put(apiRoutes.actualizarPublicacionBO(id), data,);
        return response;
    } catch (error) {
        return error.response;
    }
}

// {
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// }

export const activarPublicacion = async (id) => {
    try {
        const response = await axios.put(apiRoutes.activarPublicacion(id));
        return response;
    } catch (error) {
        return error.response;
    }
}

export const desactivarPublicacion = async (id) => {
    try {
        const response = await axios.put(apiRoutes.desactivarPublicacion(id));
        return response;
    } catch (error) {
        return error.response;
    }
}

export const verificarPublicacion = async (id) => {
    try {
        const response = await axios.put(apiRoutes.verificarPublicacion(id));
        return response;
    } catch (error) {
        return error.response;
    }
}

export const formatearFechaComentario = (fecha) => {
    // Funcion para poner la fecha de publicacion de un comentario en el siguiente formato:
    // -- Si es hace menos de un dia: "Publicado hace x horas"
    // -- Si es entre 1 dia y 6 dias: "Publicado hace x días"
    // -- Si es de 7 dias en adelante: "Publicado el 12 de septiembre del 2024"
    const fechaComentario = new Date(fecha);
    const fechaActual = new Date();
    const diferencia = fechaActual - fechaComentario;
    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    if (minutos < 0) {
        return `Publicado hace menos de un minuto`;
    } else if (minutos < 60) {
        return `Publicado hace ${minutos} minutos`;
    } else if (dias < 0) {
        return `Publicado hace ${horas} horas`;
    } else if (dias >= 1 && dias <= 6) {
        return `Publicado hace ${dias} días`;
    } else {
        const dia = fechaComentario.getDate();
        const mes = fechaComentario.toLocaleDateString('es-ES', { month: 'long' });
        const anio = fechaComentario.getFullYear();
        return `Publicado el ${dia} de ${mes} del ${anio}`;
    }
}

export const cerrarPublicacion = async (id,tipoCierre) => {
    try {
        const response = await axios.put(apiRoutes.cerrarPublicacion(id,tipoCierre));
        return response;
    } catch (error) {
        return error.response;
    }
}
