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

export const obtenerDesaparecidosTabla = async (page,limit, filtros) => {
    try {
        const response = await axios.get(`${apiRoutes.obtenerDesaparecidosTabla(page,limit)}?${filtros}`);
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