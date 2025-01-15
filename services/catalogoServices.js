import apiRoutes from "../api_paths";
import axios from "axios";

const obtenerTiposDocumentos = async () => {
    try {
        // console.log("Entrando en la función obtenerTiposDocumentos");
        const response = await axios.get(apiRoutes.obtenerTiposDocumentos());
        // console.log("Petición exitosa:", response);
        return response;
    } catch (error) {
        console.error("Error en la petición:", error);
        return error.response ? error.response.data : {status: 500, message: "Error en la conexión"};
    }
}

const obtenerRoles = async () => {
    try {
        const response = await axios.get(apiRoutes.obtenerRol());
        return response;
    } catch (error) {
        console.error("Error al obtener los roles:", error);
        return error.response ? error.response.data : { status: 500, message: "Error en la conexión" };
    }
}

const obtenerEstadosGeneral = async () => {
    try {
        const response = await axios.get(apiRoutes.obtenerEstadosGeneral());
        return response;
    } catch (error) {
        console.error("Error al obtener los estados generales:", error);
        return error.response ? error.response.data : { status: 500, message: "Error en la conexión" };
    }
}

module.exports = {
    obtenerTiposDocumentos,
    obtenerRoles,
    obtenerEstadosGeneral
}