import apiRoutes from "../api_paths";
import axios from "axios";

export const crearRecursoEducativo = async (values) => {
    try {
        const response = await axios.post(apiRoutes.crearRecursoEducativo(), values);
        return response;  // Devuelve los datos directamente
    } catch (error) {
        console.error("Error al crear Recurso Educativo:", error);
        return error.response ? error.response.data : { status: 500, message: "Error en la conexión" };
    }
};

export const obtenerMaterialEducativoTabla = async (page,limit, filtros) => {
    try {
        const response = await axios.get(`${apiRoutes.obtenerMaterialEducativoTabla(page,limit)}?${filtros}`);
        console.log("ASASASAsa")
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}

export const obtenerMaterialEducativoByID = async (id) => {
    try {
        const response = await axios.get(apiRoutes.obtenerMaterialEducativoByID(id));
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}