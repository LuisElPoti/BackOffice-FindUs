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


module.exports = {
    obtenerTiposDocumentos
}