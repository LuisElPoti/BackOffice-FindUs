"use client";
import React from "react";
import MyTable from "../components/table";
import TablaPublicaciones from "../components/tablePublicaciones";
import TablaUsuarios from "../components/tableUsuarios";
import ModalAdentroPublicaciones from "../components/modalAdentroPublicaciones";
import { useState } from "react";


export default function Users() {

    const [isEditing, setIsEditing] = useState({}); // To track editable state for each field

    const handleRowClick = (idPublicacion) => {
        // setSelectedPerson(personData); // Set the clicked person's data
        setModalVisible({mostrar:true, id: idPublicacion});
    };


    return (
      <div className="flex flex-col h-screen overflow-hidden bg-50-50-vertical">
        <h2 className="text-xl text-letterColor font-bold ml-12 mt-8">
          Usuarios
        </h2>
        <div className="absolute top-8 right-8 flex items-center">
            
            <button className="text-white font-medium bg-blueBoton hover:bg-blueOscuro rounded-lg p-2 flex items-center justify-center h-[40px] transition-colors duration-300">
              Crear Usuario +
            </button>
        </div>
        <div className="relative mt-[10vh]">
          {/* Pass the handleRowClick to MyTable to trigger the popup */}
          <TablaUsuarios
            headers={[
              "ID",
              "Nombre",
              "Apellido",
              "Correo",
              "Rol",
              "Estatus",
              "",
            ]}
            onRowClick={handleRowClick}
            className={"flex m-auto top-0 left-0 right-0 max-h-[65vh]"}
          />
        </div>
      </div>
    );
}
