import apiRoutes from "../api_paths";
import axios from "axios";

const crearRecursoEducativo = async (values) => {
    try {
        const response = await axios.post(apiRoutes.crearRecursoEducativo(), values);
        return response;  // Devuelve los datos directamente
    } catch (error) {
        console.error("Error al crear Recurso Educativo:", error);
        return error.response ? error.response.data : { status: 500, message: "Error en la conexión" };
    }
};

module.exports = {
    crearRecursoEducativo       
}