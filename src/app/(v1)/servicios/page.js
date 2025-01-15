"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { obtenerTiposDocumentos } from "../../../../services/catalogoServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'reactjs-popup/dist/index.css';
import TablaPublicaciones from "../../components/tablePublicaciones";
import ModalAdentroPublicaciones from "../../components/modalAdentroPublicaciones";
import { Modal, CircularProgress } from "@mui/material";


export default function Publicaciones() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState({
    mostrar: false,
    id: undefined,
  });// Establece un zoom inicial. Puede ser un valor entre 0 y 21
  const [nuevaPublicacion, setNuevaPublicacion] = useState(false);

  //AQUI LO PRIMERO DE ROSANNA

  const handleRowClick = (idPublicacion) => {
    // setSelectedPerson(personData); // Set the clicked person's data
    console.log("ID Publicacion ON ROW CLICK: ", idPublicacion);
    setModalVisible({ mostrar: true, id: idPublicacion });
  };

  //AQUI TERMINA LO DE ROSANNA

  //
  useEffect(() => {
    obtenerTiposDocumentos().then((response) => {
      // console.log("Respuesta de la petición:", response.data);
      if (response.status == 200) {
        setDataTiposDocumentos(response.data);
      }
    });
  }, []);



  return (
    <div className="flex flex-col h-screen overflow-hidden bg-50-50-vertical">
      {/* <div className="h-[45%] bg-greenBackground relative"> */}
      <h2 className="text-xl text-letterColor font-bold ml-12 mt-8">
        Servicios de Emergencia
      </h2>
      {/* </div> */}

      <div className="absolute top-8 right-8 flex items-center">
        {/* <button className="text-white p-2 mr-4 flex items-center justify-center h-[40px]">
          <img
            src="/assets/buscar_button.png"
            alt="Search"
            className="w-[38px] h-[38px]"
          />
        </button> */}
        <ToastContainer />
      </div>

      {/* <div className="relative z-10 bg-grayBackground -mt-36 rounded-tl-3xl rounded-tr-3xl p-10 overflow-y-scroll"></div> */}

      <div className="relative mt-[10vh]">
        {/* Pass the handleRowClick to MyTable to trigger the popup */}
        <TablaPublicaciones
          headers={[
            "ID Publicación",
            "Nombre",
            "Verificada",
            "Fecha Desaparición",
            "Fecha Publicación",
            "Estatus",
            "",
          ]}
          onRowClick={handleRowClick}
          className={"flex m-auto top-0 left-0 right-0 max-h-[65vh]"}
          handleEditandoPublicacion={()=>console.log("Editando Publicacion")}
          nuevaPublicacion={nuevaPublicacion}
          setNuevaPublicacion={setNuevaPublicacion}
          servicio_emergencia={true}
        />
      </div>

      
      <ModalAdentroPublicaciones
        idPublicacion={modalVisible.id}
        open={modalVisible.mostrar}
        handleClose={() => setModalVisible({ mostrar: false, id: undefined })}
        servicio_emergencia={true}
      />

    </div>
  );
}
