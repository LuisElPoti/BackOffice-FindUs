import apiRoutes from "../api_paths";
import axios from "axios";

export const crearAvistamiento = async (data) => {
    try {
        const response = await axios.post(apiRoutes.crearAvistamiento(), data);
        return response;
    } catch (error) {
        console.error("Error en la petición:", error);
        return error.response ? error.response.data : {status: 500, message: "Error en la conexión"};
    }
}

export const subirFotoAvistamiento = async (data) => {
    try {
        const response = await axios.post(apiRoutes.subirFotoAvistamiento(), data);
        return response;
    } catch (error) {
        console.error("Error en la petición:", error);
        return error.response ? error.response.data : {status: 500, message: "Error en la conexión"};
    }
}

export const obtenerAvistamientoPublicacion = async (idPublicacion) => {
    try {
        const response = await axios.get(apiRoutes.obtenerAvistamientoPublicacion(idPublicacion));
        return response;
    } catch (error) {
        console.error("Error en la petición:", error);
        return error.response ? error.response.data : {status: 500, message: "Error en la conexión"};
    }
}