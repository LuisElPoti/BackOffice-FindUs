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
