import { Modal } from "@mui/material";
import Mapa from "./map";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { obtenerInfoDesaparecidoByID, formatearFecha } from "../../../services/publicacionServices";
import {CircularProgress } from '@mui/material';

export default function ModalAdentroPublicaciones({ open, handleClose, idPublicacion=undefined }) {
    const [openMap, setOpenMap] = useState(false);
    const handleOpenMap = () => setOpenMap(true);
    const handleCloseMap = () => setOpenMap(false);
    const [publicacion, setPublicacion] = useState({});
    const [loadingData, setLoadingData] = useState(false);

    //Funcion para simular delay
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        if(idPublicacion !== undefined){
            setLoadingData(true);
          // Aquí se puede hacer la petición a la API para obtener la publicación con el id
          obtenerInfoDesaparecidoByID(idPublicacion).then((response) => {

            console.log("DATA DE LA PUBLICACIONNNNN",response.data);
            if (response.status === 200) {
              setPublicacion(response.data);
              // console.log(response.data.avistamiento[0].fotosavistamiento[0].urlarchivo);
              setLoadingData(false);
            }
          }).catch((error) => {
            console.log("ERROR EN EL USEEFFECT",error);
          });
        }
      }, [idPublicacion]);

    if(loadingData){
        console.log("CARGANDO DATOS");
        console.log("ENTREEE AL LOADING");
        return(
            <Modal open={true} className="content-center">
                <div
                    className="flex justify-center items-center self-center mx-auto content-center w-[50vw] bg-white rounded-lg p-4 h-[20vh]"
                >
                    <CircularProgress/>
                </div>
            </Modal>
        )
    }


    return (
        <Modal open={open} onClose={handleClose} className="content-center">
            <div
                className="flex-1 flex-col justify-center items-center overflow-auto self-center align-middle mx-auto w-[80vw] h-[95vh] bg-[#f4f3f3] rounded-lg p-4 scrollbar-custom"
            >
                <div className="flex flex-row justify-between align-middle items-center content-center">
                    <h1 className="text-3xl font-extrabold text-[#233E58] mt-4 pl-3">Publicación de Desaparecido - {publicacion?.nombredesaparecido}</h1>
                    {/* Botones de Cerrar */}
                    <button
                        onClick={handleClose}
                    >
                        <IoMdClose
                            size={30}
                        />
                    </button>
                </div>

                {/* Información de la publicación */}
                <div className="flex flex-row mt-[3vh] h-[38vh] mx-3 bg-[#c5d7e8a5] px-5 py-3 rounded-md scrollbar-custom">
                    <div className="flex-col ">
                        <img
                            src={publicacion?.fotospublicacion?.[0].urlarchivo}
                            className="h-[80%] w-[25vw] rounded-md object-fill"
                        />
                        <button className="bg-[#233E58] text-white rounded-md p-2 mt-[3%] flex items-center justify-center h-[14%] w-[100%] mx-auto">Ver reporte de la policía</button>
                    </div>

                    <div className="flex-1 flex-col ml-5 h-full   rounded-md overflow-auto">
                        <h2 className="text-2xl font-bold text-[#233E58]">Información</h2>
                        <p className="text-md ml-5 text-[#233E58] mt-2"> <strong>Nombre:</strong> {publicacion?.nombredesaparecido}</p>
                        <p className="text-md ml-5 text-[#233E58] mt-2"><strong>Edad:</strong> {publicacion?.edad} años</p>
                        <p className="text-md ml-5 text-[#233E58] mt-2"><strong>Fecha de desaparición:</strong> {formatearFecha(publicacion?.fechadesaparicion)}</p>
                        <p className="text-md ml-5 text-[#233E58] mt-2"><strong>Lugar de desaparición:</strong> {publicacion?.localidad_desaparicion}</p>
                        <p className="text-md ml-5 text-[#233E58] mt-2"><strong>{publicacion?.tipodocumento?.nombretipodocumento}:</strong> {publicacion?.numerodocumentodesaparecido}</p>
                        <p className="text-md ml-5 text-[#233E58] mt-2"><strong>Descripción:</strong> {publicacion?.descripcionpersonadesaparecido}</p>
                        <p className="text-md ml-5 text-[#233E58] mt-2"><strong>Información de Contacto:</strong> {publicacion?.informacioncontacto}</p>
                        {/* <p className="text-md ml-5 text-[#233E58] mt-2"><strong>Estado de la publicación:</strong> Activa</p> */}
                    </div>
                </div>

                {/* Avistamientos */}
                <div className="flex flex-row mt-[3vh] h-[48vh] mx-3 bg-[#c5d7e8a5] px-2 py-3 rounded-md">
                    <div className="flex flex-col ml-5 h-full rounded-md overflow-auto w-[55%] py-2 scrollbar-custom bg-[#c5d7e8a5] px-2">
                        <h2 className="text-2xl font-bold text-[#233E58] text-center ">Avistamientos de William Chawllfer Ferreira Rosado</h2>
                        <div className="flex flex-col mt-[2vh] mx-[3%] bg-[#c5d7e8a5] px-5 py-3 rounded-md">
                            {publicacion?.avistamiento?.length >0 ? (
                                publicacion?.avistamiento?.map((avistamiento, index) => (
                                    <AvistamientoCard
                                        quienloVio={avistamiento.usuario.nombre + " " + avistamiento.usuario.apellido}
                                        lugarAvistamiento={avistamiento.localidad_avistamiento}
                                        descripcionAvistamiento={avistamiento.detalles}
                                        fotoAvistamiento={avistamiento.fotosavistamiento[0].urlarchivo}
                                        cantItems={publicacion?.avistamiento.length}
                                        numItems={index}
                                    />
                                ))
                                
                            ):(
                                <h2 className="text-lg font-bold text-[#233E58] text-center mb-2">No hay avistamientos</h2>
                            )}
                        </div>
                    </div>

                    <div
                        className="flex-1 flex-col ml-5 h-full rounded-md bg-[#c5d7e8a5] overflow-auto  py-2 px-1 scrollbar-custom"
                    >
                        <h2 className="text-2xl font-bold text-[#233E58] text-center">Reportar Avistamiento de {publicacion?.nombredesaparecido}</h2>

                        <div className="mb-4 mx-auto mt-[2vh] ml-8 ">
                            <label
                                className="block text-md font-bold mb-2"
                                htmlFor="name"
                            >
                                Fecha de avistamiento:
                            </label>
                            <input
                                type="date"
                                id="nombre_desaparecido"
                                name="nombre_desaparecido"
                                max={new Date().toISOString().split("T")[0]}
                                className="w-[90%] mx-auto ml-4 px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4 mx-auto mt-[2vh] ml-8 ">
                            <label
                                className="block text-md font-bold mb-2"
                                htmlFor="name"
                            >
                                Descripción del avistamiento:
                            </label>
                            <textarea
                                id="nombre_desaparecido"
                                rows={4}
                                name="nombre_desaparecido"
                                className="w-[90%] mx-auto ml-4 px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4 mx-auto mt-[2vh] ml-8 ">
                            <label
                                className="block text-md font-bold mb-2"
                                htmlFor="name"
                            >
                                Foto del avistamiento:
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="nombre_desaparecido"
                                rows={4}
                                name="nombre_desaparecido"
                                className="w-[90%] mx-auto ml-4 px-3 py-2 border bg-white border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4 mx-auto mt-[2vh]">
                            <label
                                className="block text-md font-bold mb-2 ml-8"
                                htmlFor="name"
                            >
                                Foto del avistamiento:
                            </label>

                            <button
                                className="bg-[#62c1c6] text-white rounded-md p-2 mt-[3%] flex items-center justify-center h-[14%] w-[80%] mx-auto"
                                onClick={handleOpenMap}
                            >
                                Seleccionar ubicación en el mapa
                            </button>
                        </div>

                        <div className="flex mx-auto justify-center items-center mt-auto w-full py-2">
                            <button
                                className="bg-[#233E58] text-white rounded-md p-2  items-center justify-center h-[14%]"
                                onClick={handleClose}
                            >
                                Reportar Avistamiento
                            </button>

                            <button
                                className="bg-[#c15250] text-white rounded-md p-2 ml-2 items-center justify-center h-[14%]"
                                onClick={handleClose}
                            >
                                Cancelar
                            </button>
                        </div>

                </div>
                </div>

                {/*Comentarios*/}

                {/* Avistamientos */}
                <div className="flex flex-row mt-[3vh] w-[70%] h-[48vh] mx-auto bg-[#c5d7e8a5] px-5 py-3 rounded-md">
                    <div className="flex flex-col h-full rounded-md overflow-auto py-2 scrollbar-custom w-full">
                        <h2 className="text-2xl font-bold text-[#233E58] text-center ">Comentarios</h2>
                        <HacerComentario/>
                        {publicacion?.comentario?.length >0 ? (
                            publicacion?.comentario?.map((comentario, index) => (
                                <ComentarioCard
                                    fotoPersona={comentario.usuario.urlfotoperfil}
                                    nombrePersona={comentario.usuario.nombre + " " + comentario.usuario.apellido}
                                    // fechaComentario={formatearFecha(comentario.fechacomentario)}
                                    comentario={comentario.texto}
                                />
                            ))
                        ):(
                            <h2 className="text-lg font-bold text-[#233E58] text-center mb-2">No hay comentarios</h2>
                        )}
                        {/* <ComentarioCard/>
                        <ComentarioCard/>
                        <ComentarioCard/>
                        <ComentarioCard/> */}

                    </div>
                </div>
                <ModalMapa open={openMap} handleClose={handleCloseMap} />
            </div>
        </Modal>
    );
    }


function ModalMapa({open, handleClose}) {
    return(
        <>
        <Modal open={open} onClose={handleClose} className="content-center">
            <div
                className="flex-1 flex-col justify-center items-center self-center align-middle mx-auto w-[50vw]  bg-white rounded-lg p-4"
            >
                <h1 className="text-3xl font-extrabold text-[#233E58] mt-2 pl-3">Selecciona la Ubicacion del Avistamiento</h1>

                <Mapa/>

                <div className="flex space-x-4 justify-end items-center mt-auto w-full">
                    <button
                        className="bg-[#233E58] text-white rounded-md p-2  items-center justify-center h-[14%] mt-[2vh]"
                        onClick={handleClose}
                    >
                        Confirmar Ubicación
                    </button>

                    <button
                        className="bg-[#c15250] text-white rounded-md p-2 ml-2 items-center justify-center h-[14%] mt-[2vh]"
                        onClick={handleClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </Modal>
        </>
    )
}


function ComentarioCard({fotoPersona, nombrePersona, fechaComentario="24/09/2021", comentario}){
    return(
        <div className="flex flex-col w-[100%] mb-[2vh] mt-[2vh] rounded-lg">
            <div className="flex flex-row w-[90%]">
                <img
                    src={fotoPersona}
                    className="w-[70px] h-[70px] mt-2 rounded-full object-fill justify-center align-middle items-center"
                />

                <div className="flex flex-col ml-4 mt-0 justify-center">
                    <p className="text-xl font-bold text-[#233E58]">{nombrePersona}</p>
                    <p className="text-sm ml-6 text-[#233E58]"><strong>Publicado el</strong> {fechaComentario}</p>
                    <p className="text-md mt-2 text-[#233E58]">{comentario}</p>

                </div>
            </div>
            <div className="w-full bg-[#233E58] mt-[2vh] rounded-2xl h-[2px] "/>
        </div>
    )
}

function HacerComentario({}){
    return(
        <div className="flex flex-col w-[100%] mb-[2vh] mt-[2vh] rounded-lg">
        <div className="flex flex-row w-[90%]">
            <img
                src={"https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona4.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTQucG5nIiwiaWF0IjoxNzMwMjU3MTI0LCJleHAiOjg2NTczMDE3MDcyNH0.pOSAD4jrzsyGaE4jS3iG4O3xzSksmv2DBzfttoyErf4&t=2024-10-30T02%3A58%3A45.044Z"}
                className="w-[70px] h-[70px] mt-2 rounded-full object-fill justify-center align-middle items-center"
            />

            <div className="flex w-full flex-col ml-4 mt-0 justify-center">
                <p className="text-xl font-bold text-[#233E58]">William Chawillfer Ferreira Rosado</p>
                <div className="flex flex-row justify-between items-center">
                    <textarea
                    rows={2}
                        className="w-[85%] mx-auto ml-4 px-3 py-2 border border-gray-300 rounded mt-2"
                        placeholder="Escribe un comentario"
                    />
                    <button className="bg-[#233E58] text-white rounded-md p-2  items-center justify-center ml-[2%] w-[15%]  mt-[2vh]">Comentar</button>
                </div>
            </div>
        </div>
            <div className="w-full bg-[#233E58] mt-[2vh] rounded-2xl h-[2px]"/>
        </div>
    )
}

function AvistamientoCard({fotoAvistamiento, lugarAvistamiento, descripcionAvistamiento, quienloVio, cantItems,numItems}){
    return(
        <div>
        <h2 className="text-lg font-bold text-[#233E58] text-center mb-2">{ ((numItems) == 0) ? "Último Avistamiento" : `Avistamiento #${(cantItems - numItems)}`}</h2>
        <div className="flex flex-row justify-between items-center">
            <img
                src={fotoAvistamiento}
                className="h-[16vh] w-[15vh] rounded-md object-cover"
            />
            <div className="flex-col ml-4">
                <p className="text-md text-[#233E58]"><strong>Quien lo vió:</strong> {quienloVio}</p>
                <p className="text-md text-[#233E58]"><strong>Donde lo vió:</strong> {lugarAvistamiento}</p>
                <p className="text-md text-[#233E58]"><strong>Descripción:</strong> {descripcionAvistamiento}</p>
                {/* <p className="text-md text-[#233E58]"><strong>Estado:</strong> Activo</p> */}

            </div>
        </div>
        <div className="h-1 w-full bg-[#233E58] mt-3 rounded-3xl"></div>
    </div>

    )
}