import apiRoutes from "../api_paths";
import axios from "axios";

export const subirArchivo = async (data) => {
    try {
        const response = await axios.post(apiRoutes.subirArchivo(), data);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const actualizarFotoPublicacionBO = async (data) => {
    try {
        const response = await axios.put(apiRoutes.actualizarFotoPublicacionBO(), data);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const actualizarArchivoPubicacionBO = async (id, data) => {
    try {
        const response = await axios.put(apiRoutes.actualizarArchivoPubicacionBO(), data);
        return response;
    } catch (error) {
        return error.response;
    }
}