import apiRoutes from "../api_paths";
import axios from "axios";

const obtenerCategoriaMaterial = async () => {
    try {
        const response = await axios.get(apiRoutes.obtenerCategoriaMaterial());
        return response;  // Devuelve los datos directamente
    } catch (error) {
        console.error("Error al obtener las categorías de material:", error);
        return error.response ? error.response.data : { status: 500, message: "Error en la conexión" };
    }
};

module.exports = {
    obtenerCategoriaMaterial        
}
