"use client";
import TablaUsuarios from "../../components/tableUsuarios";
import { useState } from "react";
import { obtenerRolUsuario } from "../../../../services/cookiesServices";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";


export default function Users() {

    const [isEditing, setIsEditing] = useState({}); // To track editable state for each field
    const [loadingData, setLoadingData] = useState(true); // To track if data is being loaded

    const handleRowClick = (idPublicacion) => {
        // setSelectedPerson(personData); // Set the clicked person's data
        setModalVisible({mostrar:true, id: idPublicacion});
    };

    useEffect(() => {
      // Verifica el rol del usuario solo en el cliente
    if(obtenerRolUsuario() != "3"){
      // Notify the user that they don't have permission to access this section
      // Add buttons to redirect to the home page or to log out
      alert("No tienes permiso para acceder a la sección de Usuarios");
      if (obtenerRolUsuario() === "4") {
        window.location.href = "/servicios";
      } else {
        location.href = "/home";
      }
      return null
    }
    }
    ,[]);

    if(obtenerRolUsuario() != "2" && obtenerRolUsuario() != "3"){
      return null;
    }
  

    return (
      <div className="flex flex-col h-screen overflow-hidden bg-50-50-vertical">
        <h2 className="text-xl text-letterColor font-bold ml-12 mt-8">
          Usuarios
        </h2>
        <div className="absolute top-8 right-8 flex items-center">
            
            {/* <button className="text-white font-medium bg-blueBoton hover:bg-blueOscuro rounded-lg p-2 flex items-center justify-center h-[40px] transition-colors duration-300">
              Crear Usuario +
            </button> */}
        </div>
        <div className="relative mt-[10vh]">
          {/* Pass the handleRowClick to MyTable to trigger the popup */}
          <TablaUsuarios
            headers={[
              "ID",
              "Nombre",
              "Apellido",
              "Verificado",
              "Correo",
              "Rol",
              "Estatus",
              "",
            ]}
            onRowClick={handleRowClick}
            className={"flex m-auto top-0 left-0 right-0 max-h-[65vh]"}
            loadingData={loadingData}
            setLoadingData={setLoadingData}
          />
        </div>
      </div>
    );
}
