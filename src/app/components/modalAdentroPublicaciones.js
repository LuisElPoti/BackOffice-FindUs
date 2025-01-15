import Mapa from "./map";
import { useState, useEffect, use } from "react";
import { obtenerInfoDesaparecidoByID, formatearFecha, crearComentario } from "../../../services/publicacionServices";
import { useFormik } from "formik";
import * as Yup from "yup";
import {CircularProgress, Menu, MenuItem, Modal } from '@mui/material';
import { convertToBase64 } from "../../../services/filesServices";
import { activarAvistamiento, crearAvistamiento, desactivarAvistamiento, editarAvistamiento, obtenerAvistamientoPublicacion, verificarAvistamiento } from "../../../services/avistamientoServices";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineVerified } from "react-icons/md";
import { obtenerFotoPerfil, obtenerNombreUsuario, obtenerToken } from "../../../services/cookiesServices";
import { IoIosMore, IoMdClose } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
import { formatearFechaComentario } from "../../../services/publicacionServices";

export default function ModalAdentroPublicaciones({ open, handleClose, idPublicacion=undefined, servicio_emergencia=false }) {
    const [openMap, setOpenMap] = useState(false);
    const handleOpenMap = () => setOpenMap(true);
    const handleCloseMap = () => setOpenMap(false);
    const [publicacion, setPublicacion] = useState({});
    const [loadingData, setLoadingData] = useState(false);
    const [sendingData, setSendingData] = useState(false);
    const [actualizarAvistamientos, setActualizarAvistamientos] = useState({actualizar: false, idPublicacion: null});
    const [editarPublicacion, setEditarPublicacion] = useState(false);

    useEffect(() => {
        if(actualizarAvistamientos?.actualizar){
            obtenerAvistamientoPublicacion(idPublicacion).then((response) => {
                setPublicacion({...publicacion, avistamiento: response.data});
                // console.log("AVISTAMIENTOS DE LA PUBLICACION",response);
            });

            setActualizarAvistamientos({actualizar: false, idPublicacion: null});
        }
    }, [actualizarAvistamientos]);

    //Funcion para simular delay
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const showToast = async (promise, mensaje) => {
        return toast.promise(promise, {
          pending: mensaje,
          // success: 'Usuario registrado correctamente.',
          // autoClose: 8000,
        },{position: "top-center",className: "w-auto"});
      };

    useEffect(() => {
        formik.validateForm();
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


      const onCancel = () => {
        formik.resetForm();
      };

      const validationSchema = Yup.object({
        fecha_avistamiento: Yup.string().required("Este campo es obligatorio"),
        detalles: Yup.string().required("Este campo es obligatorio"),
        ubicacion_latitud: Yup.number().required("Este campo es obligatorio"),
        ubicacion_longitud: Yup.number().required("Este campo es obligatorio"),
        imageData: Yup.object().required(),
      });


      const formik = useFormik({
        initialValues: {
          fecha_avistamiento: new Date(),
          detalles: "",
          ubicacion_latitud: undefined,
          ubicacion_longitud: undefined,
          imageData: null,
          idPublicacion: idPublicacion,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {

          console.log(values)
          setSendingData(true);
          values.ubicacion_latitud = values.ubicacion_latitud.toString();
          values.ubicacion_longitud = values.ubicacion_longitud.toString();
          values.idPublicacion = publicacion?.id;
          try {
            const { imageData, ...datosAvistamiento } = values;

            const dataFoto = {
                // idavistamiento: response.data.idAvistamiento,
                base64File: values?.imageData?.base64,
                fileName: values?.imageData?.fileName,
                mimeType: values?.imageData?.mimeType
              }
            showToast(crearAvistamiento({dataAvistamiento: datosAvistamiento, dataFoto: dataFoto},obtenerToken()),"Creando avistamiento...").then((response) => {
                if(response.status === 200){
                    // console.log("Avistamiento creado correctamente: ", response.data);
                    // console.log("ID DEL AVISTAMIENTO: ", response.data.idAvistamiento);

                    // obtenerAvistamientoPublicacion(values.idPublicacion).then((response) => {
                    //     setPublicacion({...publicacion, avistamiento: response.data});
                    //     // console.log("AVISTAMIENTOS DE LA PUBLICACION",response);
                    // });
                    setActualizarAvistamientos({actualizar: true, idPublicacion: values.idPublicacion});
                    const fileInput = document.getElementById("nombre_desaparecido");
                    if (fileInput) {
                        fileInput.value = "";
                    }
                    formik.resetForm();
                    toast.success("Avistamiento creado correctamente",{position: "top-center",className: "w-auto",autoClose: 3000});
                }else{
                    console.log("Error al crear la publicación: ", response.data.message);
                    toast.error("Error al crear el avistamiento",{position: "top-center",className: "w-auto",autoClose: 3000});
                }
                setSendingData(false);
            }).catch((error) => {
                console.log("ERROR EN EL SUBMIT",error);
                setSendingData(false);
            });
          }catch(error){
            console.log("ERROR EN EL SUBMIT",error);
        }
      }
      });

      useEffect(() => {
        console.log("FORMIK VALES",formik);
    }, [formik?.values]);

    useEffect(() => {
        formik.validateForm();
    }, [formik?.values?.ubicacion_latitud, formik?.values?.ubicacion_longitud]);


    const handleCloseFinal = () => {
        handleClose();
        onCancel();
    }


    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        console.log("FILE",file);
        const base64 = (await convertToBase64(file)).split(",")[1];
        console.log("BASE64",base64);
        formik.setFieldValue("imageData", {
            base64: base64,
            fileName: file.name,
            mimeType: file.type,
        });
    };


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
        <Modal open={open} onClose={handleCloseFinal} className="content-center">
            <div
                className="flex-1 flex-col justify-center items-center overflow-auto self-center align-middle mx-auto w-[80vw] h-[95vh] bg-[#f4f3f3] rounded-lg p-4 scrollbar-custom"
            >
                <ToastContainer/>
                <div className="flex flex-row justify-between align-middle items-center content-center">
                    <div className="flex flex-row content-center align-middle items-center">
                        <h1 className="text-3xl font-extrabold text-[#233E58] mt-4 pl-3">Publicación de Desaparecido - {publicacion?.nombredesaparecido}</h1>
                        {publicacion?.verificado && (
                            <MdOutlineVerified
                                size={30}
                                color="#15b91a"
                                className="ml-2 mt-3"
                            />
                        )}
                    </div>
                    {/* Botones de Cerrar */}
                    <button
                        className="ml-2"
                        onClick={handleCloseFinal}
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
                            src={publicacion?.fotospublicacion?.[0]?.urlarchivo ? publicacion?.fotospublicacion?.[0].urlarchivo : "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/NO%20IMAGE%20AVAIBLE.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvTk8gSU1BR0UgQVZBSUJMRS5qcGciLCJpYXQiOjE3MzYzNzk5OTYsImV4cCI6ODY1NzM2MjkzNTk2fQ.eGVLqSNxbTfMuGsLh9fREp2cUzxLVIQjdDoUxI4ptSo&t=2025-01-08T23%3A46%3A35.873Z"}
                            className="h-[80%] w-[25vw] rounded-md object-fill"
                            alt="Imagen no Disponible"
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
                        <p className="text-md ml-5 text-[#233E58] mt-2"><strong>Fecha de creación:</strong> {formatearFecha(publicacion?.fechacreacion)}</p>
                        <p className="text-md ml-5 text-[#233E58] mt-2"><strong>Verificado:</strong> {publicacion?.verificado ? "Sí" : "No"}</p>
                        <p className="text-md ml-5 text-[#233E58] mt-2"><strong>Estado de la publicación:</strong> {publicacion?.estado?.nombreestado}</p>
                    </div>
                </div>

                {/* Avistamientos */}
                <div className="flex flex-row mt-[3vh] h-[48vh] mx-3 bg-[#c5d7e8a5] px-2 py-3 rounded-md">
                    <div className="flex flex-col ml-5 h-full rounded-md overflow-auto w-[55%] py-2 scrollbar-custom bg-[#c5d7e8a5] px-2">
                        <h2 className="text-2xl font-bold text-[#233E58] text-center ">Avistamientos de {publicacion?.nombredesaparecido}</h2>
                        <div className="flex flex-col mt-[2vh] mx-[3%] bg-[#c5d7e8a5] px-5 py-3 rounded-md">
                            {publicacion?.avistamiento?.length >0 ? (
                                publicacion?.avistamiento?.map((avistamiento, index) => (
                                    <AvistamientoCard
                                        key={avistamiento.idavistamiento}
                                        quienloVio={avistamiento.usuario.nombre + " " + avistamiento.usuario.apellido}
                                        lugarAvistamiento={avistamiento.localidad_avistamiento}
                                        descripcionAvistamiento={avistamiento.detalles}
                                        fotoAvistamiento={avistamiento.fotosavistamiento[0]?.urlarchivo}
                                        cantItems={publicacion?.avistamiento.length}
                                        publicacionActivada={publicacion?.estado?.id == 1}
                                        numItems={index}
                                        avistamiento={avistamiento}
                                        idPublicacion={publicacion?.id}
                                        setActualizarAvistamientos={setActualizarAvistamientos}
                                    />
                                ))

                            ):(
                                <h2 className="text-lg font-bold text-[#233E58] text-center mb-2">No hay avistamientos</h2>
                            )}
                        </div>
                    </div>
                    {(publicacion?.estado?.id == 1&& !servicio_emergencia) ? (
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
                                    id="fecha_avistamiento"
                                    name="fecha_avistamiento"
                                    value={formik.values.fecha_avistamiento}
                                    onChange={formik.handleChange}
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
                                    id="detalles"
                                    rows={4}
                                    name="detalles"
                                    value={formik.values.detalles}
                                    onChange={formik.handleChange}
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
                                    onChange={handleFileInputChange}
                                    name="nombre_desaparecido"
                                    className="w-[90%] mx-auto ml-4 px-3 py-2 border bg-white border-gray-300 rounded"
                                />
                            </div>

                            <div className="mb-4 mx-auto mt-[2vh]">
                                <label
                                    className="block text-md font-bold mb-2 ml-8"
                                    htmlFor="name"
                                >
                                    Ubicación del avistamiento:
                                </label>

                                <button
                                    className="bg-[#62c1c6] text-white rounded-md p-2 mt-[3%] flex items-center justify-center h-[14%] w-[80%] mx-auto"
                                    onClick={handleOpenMap}
                                >
                                    Seleccionar ubicación en el mapa
                                </button>

                                {formik?.values?.ubicacion_latitud && formik?.values?.ubicacion_longitud && (
                                    <div>
                                        <p className="text-sm font-bold text-[#233E58] mt-2 ml-8">Coordenadas Seleccionadas</p>
                                        <p className="text-sm font-bold text-[#233E58] mt-2 ml-12"><strong>Latitud:</strong> {formik?.values?.ubicacion_latitud}</p>
                                        <p className="text-sm font-bold text-[#233E58] mt-2 ml-12"><strong>Longitud:</strong> {formik?.values?.ubicacion_longitud}</p>
                                    </div>

                                )}
                            </div>

                            <div className="flex mx-auto justify-center items-center mt-auto w-full py-2">
                                <button
                                    className=" text-white rounded-md p-2  items-center justify-center h-[14%]"//bg-[#233E58]
                                    onClick={formik?.handleSubmit}
                                    disabled={sendingData || !formik.isValid}
                                    style={{ cursor: sendingData || !formik.isValid ? "not-allowed" : "pointer", backgroundColor: sendingData || !formik.isValid ? "#95c7f7" : "#233E58" }}
                                >
                                    Reportar Avistamiento
                                </button>

                                <button
                                    className="bg-[#c15250] text-white rounded-md p-2 ml-2 items-center justify-center h-[14%]"
                                    onClick={handleCloseFinal}
                                >
                                    Cancelar
                                </button>
                            </div>

                        </div>
                    ) : (
                        <div
                            className="flex-1 flex-col ml-5 h-full rounded-md bg-[#c5d7e8a5] overflow-auto  py-2 px-1 scrollbar-custom"
                        >
                            <h2 className="text-2xl font-bold text-[#233E58] text-center">Reportar Avistamiento de {publicacion?.nombredesaparecido}</h2>
                            <div className="flex flex-col w-full h-full justify-center items-center align-middle content-center">
                                <h2 className="text-lg font-bold text-[#233E58] text-center mb-2">{(!servicio_emergencia) ? "No puedes reportar avistamientos de una publicación inactiva" : "No puedes reportar avistamiento siendo una persona del servicio de emergencia"}</h2>
                                <GiCancel
                                    size={100}
                                    color="#c15250"
                                />
                            </div>
                        </div>

                        )}
                    </div>


                {/*Comentarios*/}

                {/* Avistamientos */}
                <div className="flex flex-row mt-[3vh] w-[70%] h-[48vh] mx-auto bg-[#c5d7e8a5] px-5 py-3 rounded-md">
                    <div className="flex flex-col h-full rounded-md overflow-auto py-2 scrollbar-custom w-full">
                        <h2 className="text-2xl font-bold text-[#233E58] text-center ">Comentarios</h2>
                        <HacerComentario idPublicacion={publicacion?.id} publicacion={publicacion} setPublicacion={setPublicacion}/>
                        {publicacion?.comentario?.length >0 ? (
                            publicacion?.comentario?.map((comentario, index) => (
                                <ComentarioCard
                                    key={comentario?.idcomentario}
                                    fotoPersona={comentario.usuario.urlfotoperfil}
                                    nombrePersona={comentario.usuario.nombre + " " + comentario.usuario.apellido}
                                    // fechaComentario={formatearFecha(comentario.fechacomentario)}
                                    fechaComentario={formatearFechaComentario(comentario.fechacreacion)}
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
                <ModalMapa
                    latitud_value={formik?.values?.ubicacion_latitud}
                    longitud_value={formik?.values?.ubicacion_longitud}
                    latitud_name="ubicacion_latitud"
                    longitud_name="ubicacion_longitud"
                    setFieldValue={formik.setFieldValue}
                    open={openMap}
                    handleClose={handleCloseMap}
                />
            </div>
        </Modal>
    );
    }


function ModalMapa({open, handleClose, latitud_value, longitud_value, latitud_name, longitud_name, setFieldValue}) {
    return(
        <Modal open={open} onClose={handleClose} className="content-center">
            <div
                className="flex-1 flex-col justify-center items-center self-center align-middle mx-auto w-[50vw]  bg-white rounded-lg p-4"
            >
                <h1 className="text-3xl font-extrabold text-[#233E58] mt-2 pl-3">Selecciona la Ubicacion del Avistamiento</h1>

                <Mapa
                    lat_name={latitud_name}
                    long_name={longitud_name}
                    lat_value={latitud_value}
                    long_value={longitud_value}
                    setFieldValue={setFieldValue}
                    initialZoom={14}
                    initialPosition={{ lat: 0, lng: 0 }}
                    onPositionChange={(position) => console.log(position)}
                />

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

function HacerComentario({idPublicacion, publicacion, setPublicacion}){
    const [comentario, setComentario] = useState("");
    const [mandandoComentario, setMandandoComentario] = useState(false);
    const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     console.log("COMENTARIO",comentario);
    // }
    // ,[comentario]);

    const handlePublicarComentario = (comentario,idpublicacion) => {
        setMandandoComentario(true);
        setLoading(true);
        crearComentario({idpublicacion: idpublicacion, texto: comentario},obtenerToken()).then((response) => {
            try {
            console.log("RESPONSE",response);
            if(response?.status === 200){
                console.log("Comentario creado correctamente: ", response.data);
                console.log("PUBLICACION",publicacion);
                setPublicacion({...publicacion, comentario: [response.data, ...publicacion?.comentario]});
                setComentario("");

            }else{
                console.log("Error al crear el comentario: ", response.data.message);
            }
            setMandandoComentario(false);
            setLoading(false);
        }catch(error){
            console.log("ERROR EN EL HANDLE",error);
            alert("Error al publicar el comentario");
            setMandandoComentario(false);
            setLoading(false);
        }
        })

    }
    return(
        <div className="flex flex-col w-[100%] mb-[2vh] mt-[2vh] rounded-lg">
        <div className="flex flex-row w-[90%]">
            <img
                src={obtenerFotoPerfil() || "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona4.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTQucG5nIiwiaWF0IjoxNzMwMjU3MTI0LCJleHAiOjg2NTczMDE3MDcyNH0.pOSAD4jrzsyGaE4jS3iG4O3xzSksmv2DBzfttoyErf4&t=2024-10-30T02%3A58%3A45.044Z"}
                className="w-[70px] h-[70px] mt-2 rounded-full object-fill justify-center align-middle items-center"
            />

            <div className="flex w-full flex-col ml-4 mt-0 justify-center">
                <p className="text-xl font-bold text-[#233E58]">{obtenerNombreUsuario()}</p>
                <div className="flex flex-row justify-between items-center">
                    <textarea
                    rows={2}
                        className="w-[85%] mx-auto ml-4 px-3 py-2 border border-gray-300 rounded mt-2"
                        placeholder="Escribe un comentario"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    />
                    <button
                        className="text-white rounded-md p-2  items-center justify-center ml-[2%] w-[15%]  mt-[2vh]" //bg-[#233E58]
                        onClick={() => handlePublicarComentario(comentario,idPublicacion)}
                        disabled={comentario === "" || mandandoComentario}
                        style={{cursor: comentario === "" || mandandoComentario ? "not-allowed" : "pointer", backgroundColor: comentario === "" || mandandoComentario ? "#c5d7e8" : "#233E58"}}
                    >
                        {loading ? "Publicando..." : "Comentar"}
                    </button>
                </div>
            </div>
        </div>
            <div className="w-full bg-[#233E58] mt-[2vh] rounded-2xl h-[2px]"/>
        </div>
    )
}

function AvistamientoCard({fotoAvistamiento, lugarAvistamiento, descripcionAvistamiento, quienloVio, cantItems,numItems,avistamiento, setActualizarAvistamientos, idPublicacion, publicacionActivada, servicio_emergencia}){
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedAvistamiento, setSelectedAvistamiento] = useState({idAvistamiento: null, idEstado: null, nombre: null, verificado: null});
    const [openModalDesAct, setOpenModalDesAct] = useState({abrir: false, idAvistamiento: null, activado: null, nombreAvistamiento: null});
    const [openModalVerificar, setOpenModalVerificar] = useState({abrir: false, idAvistamiento: null, activado: null, verificado: null, nombreAvistamiento: null});
    const [openModalEditar, setOpenModalEditar] = useState({abrir: false, avistamiento: null, nombreAvistamiento: null, idAvistamiento: null});

    const handleClick = (event, idAvistamiento, idEstado, nombreAvistamiento, verificado, avistamiento) => {
        setAnchorEl(event.currentTarget);
        console.log("ID DE LA PUBLICACION",idAvistamiento)
        setSelectedAvistamiento({
            idAvistamiento: idAvistamiento,
            idEstado: idEstado,
            nombre: nombreAvistamiento,
            verificado: verificado,
            avistamiento: avistamiento
        });
    };

    const handleClose = () => {
        setAnchorEl(null);
        // setSelectedPublicacion({idPublicacion: null, idEstado: null, nombre: null,verificado: null});
        setSelectedAvistamiento({idAvistamiento: null, idEstado: null, nombre: null, verificado: null});
    };

    const handleDeactivate = () => {
        console.log('Desactivando publicación:', selectedAvistamiento);
        setOpenModalDesAct({
            abrir: true,
            idAvistamiento: selectedAvistamiento?.idAvistamiento,
            activado: selectedAvistamiento?.idEstado == 1,
            nombreAvistamiento: ((numItems) == 0) ? "Último Avistamiento" : `Avistamiento #${(cantItems - numItems)}`
        });
        handleClose();
    };

    const handleVerify = () => {
        console.log('Verificando publicación:', selectedAvistamiento);
        setOpenModalVerificar({
            abrir: true,
            idAvistamiento: selectedAvistamiento?.idAvistamiento,
            activado: selectedAvistamiento?.idEstado == 1,
            verificado: selectedAvistamiento?.verificado,
            nombreAvistamiento: ((numItems) == 0) ? "Último Avistamiento" : `Avistamiento #${(cantItems - numItems)}`
        });
        handleClose();
    }

    const handleEdit = () => {
        console.log('Editando publicación:', selectedAvistamiento);
        setOpenModalEditar({
            abrir: true,
            avistamiento: selectedAvistamiento?.avistamiento,
            nombreAvistamiento: ((numItems) == 0) ? "Último Avistamiento" : `Avistamiento #${(cantItems - numItems)}`,
            idAvistamiento: selectedAvistamiento?.idAvistamiento
        });
        // handleEditandoPublicacion(selectedAvistamiento?.idPublicacion);
        handleClose();
    };

    return(
        <div>
            <div className="h-1 w-full bg-[#233E58] mt-3 rounded-3xl"></div>
            <div className="flex flex-row justify-between content-center align-middle items-center">
                <div className="flex flex-row ">
                    <h2 className="text-lg font-bold text-[#233E58] text-center mb-2">{ ((numItems) == 0) ? "Último Avistamiento" : `Avistamiento #${(cantItems - numItems)}`}</h2>
                    {avistamiento?.verificado && (
                        <MdOutlineVerified
                            size={20}
                            color="#15b91a"
                            className="ml-2 mt-1"
                        />
                        )}
                </div>
                <button
                    onClick={(event) => handleClick(event, avistamiento?.id, avistamiento?.idestatus, avistamiento?.detalles, avistamiento?.verificado, avistamiento)}
                >
                    <IoIosMore
                        size={30}
                        color="#233E58"
                        className="ml-2"
                    />
                </button>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{
                        '& .MuiPaper-root': {
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)', // Sombra más suave
                        }
                    }}
                >
                    {publicacionActivada  ?  (
                        <>
                        { (selectedAvistamiento?.idEstado === 1 && !servicio_emergencia) && (
                            <MenuItem onClick={handleEdit}>Editar Avistamiento</MenuItem>
                        )}
                            { (!servicio_emergencia) && 
                                <MenuItem onClick={handleDeactivate}>{(selectedAvistamiento?.idEstado == 1 ) ? "Desactivar Avistamiento" : "Activar Avistamiento"}</MenuItem>
                            }
                            {(!selectedAvistamiento?.verificado && selectedAvistamiento?.verificado !== null && selectedAvistamiento?.idEstado === 1  && !servicio_emergencia) && (
                                <MenuItem onClick={handleVerify}>Verificar Avistamiento</MenuItem>
                            )}
                        </>
                ):
                 (
                    <>
                    { (!servicio_emergencia) && (
                        <MenuItem onClick={handleClose}>Publicacion o Avistamiento No Activa. No se puede realizar ninguna acción</MenuItem>
                    )}
                 </>
                )}
                </Menu>
            </div>
        <div className="flex flex-row justify-between items-center">
            <img
                src={fotoAvistamiento}
                className="h-[16vh] w-[15vh] rounded-md object-cover"
            />
            <div className="flex-col ml-4">
                <p className="text-md text-[#233E58]"><strong>Quien lo vió:</strong> {quienloVio}</p>
                <p className="text-md text-[#233E58]"><strong>Donde lo vió:</strong> {lugarAvistamiento}</p>
                <p className="text-md text-[#233E58]"><strong>Descripción:</strong> {descripcionAvistamiento}</p>
                <p className="text-md text-[#233E58]"><strong>Estado:</strong> {avistamiento?.estado?.nombreestado}</p>
                <p className="text-md text-[#233E58]"><strong>Verificado:</strong> {avistamiento?.verificado ? "Si" : "No"}</p>
                {/* <p className="text-md text-[#233E58]"><strong>Estado:</strong> Activo</p> */}

            </div>
        </div>

        <ModalCambiarEstadoAvistamiento
            open={openModalDesAct.abrir}
            handleClose={() => setOpenModalDesAct({abrir: false, idAvistamiento: null, activado: null, nombreAvistamiento: null})}
            activado={openModalDesAct.activado}
            nombreAvistamiento={openModalDesAct.nombreAvistamiento}
            idAvistamiento={openModalDesAct.idAvistamiento}
            setActualizar={setActualizarAvistamientos}
            idPublicacion={idPublicacion}
        />

        <ModalVerificarAvistamiento
            open={openModalVerificar.abrir}
            handleClose={() => setOpenModalVerificar({abrir: false, idAvistamiento: null, activado: null, verificado: null, nombreAvistamiento: null})}
            activado={openModalVerificar.activado}
            nombreAvistamiento={ openModalVerificar.nombreAvistamiento}
            idAvistamiento={openModalVerificar.idAvistamiento}
            setActualizar={setActualizarAvistamientos}
            idPublicacion={idPublicacion}
        />

        <ModalEditarAvistamiento
            open={openModalEditar.abrir}
            avistamiento={openModalEditar.avistamiento}
            nombreAvistamiento={openModalEditar.nombreAvistamiento}
            handleClose={() => setOpenModalEditar({
                abrir: false,
                idAvistamiento: null,
                activado: null,
                nombreAvistamiento: null
            })}
            idAvistamiento={openModalEditar.idAvistamiento}
            setActualizar={setActualizarAvistamientos}
            idPublicacion={idPublicacion}
        />
    </div>

    )
}


function ModalCambiarEstadoAvistamiento({open, handleClose, activado, nombreAvistamiento, idAvistamiento, setActualizar, idPublicacion }) { // setActualizar

    const showToast = async (promise, mensaje) => {
        return toast.promise(
          promise,
          {
            pending: mensaje,
          },
          { position: "top-center", autoClose: 2000, className: "w-auto" }
        );
      };


    const handleConfirm = () => {

        if(activado){
            showToast(desactivarAvistamiento(idAvistamiento), "Desactivando avistamiento...").then((response) => {
                handleClose();
                if (response.status === 200) {
                    toast.success("Avistamiento Desactivado", { position: "top-center", autoClose: 2000, className: "w-auto" });
                    setActualizar({actualizar: true, idPublicacion: idPublicacion});
                    console.log("Publicación Desactivada",response);
                }
                else{
                    toast.error("Error al desactivar el avistamiento", { position: "top-center", autoClose: 2000, className: "w-auto" });
                }
            }).catch((error) => {
                toast.error("Error al desactivar el avistamiento", { position: "top-center", autoClose: 2000, className: "w-auto" });
                console.log(error);
            });
        }else{
            showToast(activarAvistamiento(idAvistamiento),"Activando avistamiento...").then((response) => {
                handleClose();
                if (response.status === 200) {
                    toast.success("Avistamiento Activado", { position: "top-center", autoClose: 2000, className: "w-auto" });
                    setActualizar({actualizar: true, idPublicacion: idPublicacion});
                    console.log("Publicación Activada",response);
                }else{
                    toast.error("Error al activar el avistamiento", { position: "top-center", autoClose: 2000, className: "w-auto" });
                }
            }).catch((error) => {
                toast.error("Error al activar el avistamientos", { position: "top-center", autoClose: 2000, className: "w-auto" });
                console.log(error);
            });
        }
    }


    return (
        <Modal open={open} onClose={handleClose} className='content-center'>
            <div
                className='flex flex-col justify-center items-center self-center mx-auto content-center w-[35vw] bg-white rounded-lg p-4'
            >
                <h1 className='w-full text-center text-3xl font-extrabold text-[#233E58] mt-4 pl-3'>Cambiar Estado de Publicación</h1>
                {activado  ? (
                    <p className='text-[#233E58] mt-8 px-6 text-xl'>¿Está seguro que desea cambiar el estado del avistamiento <strong>{nombreAvistamiento} - ID: {idAvistamiento}</strong> de <strong>Activada</strong> a <strong>Desactivada</strong>?</p>
                ) : (
                    <p className='text-[#233E58] mt-8 px-6 text-xl'>¿Está seguro que desea cambiar el estado del avistamiento <strong>{nombreAvistamiento} - ID: {idAvistamiento}</strong> de <strong>Desactivada</strong> a <strong>Activada</strong>?</p>
                )}

                <div className='flex flex-row justify-center items-center mt-8'>
                    <button
                        className='bg-[#233E58] text-white font-bold py-2 px-4 rounded-md mx-2'
                        onClick={handleConfirm}
                    >
                        Confirmar
                    </button>
                    <button
                        className='bg-[#E53E3E] text-white font-bold py-2 px-4 rounded-md mx-2'
                        onClick={handleClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </Modal>
    )
}

function ModalVerificarAvistamiento({open, handleClose, activado, nombreAvistamiento, idAvistamiento, setActualizar, idPublicacion}) { // setActualizar

    const showToast = async (promise, mensaje) => {
        return toast.promise(
          promise,
          {
            pending: mensaje,
          },
          { position: "top-center", autoClose: 2000, className: "w-auto" }
        );
      };

      const handleConfirm = () => {
        showToast(verificarAvistamiento(idAvistamiento), "Verificando avistamiento...").then((response) => {
            handleClose();
            if (response.status === 200) {
                toast.success("Avistamiento Verificado", { position: "top-center", autoClose: 2000, className: "w-auto" });
                setActualizar({actualizar: true, idPublicacion: idPublicacion});
                console.log("Avistamiento Verificado",response);
            }
            else{
                toast.error("Error al verificar el avistamiento", { position: "top-center", autoClose: 2000, className: "w-auto" });
            }
        }).catch((error) => {
            toast.error("Error al verificar el avistamiento", { position: "top-center", autoClose: 2000, className: "w-auto" });
            console.log(error);
        });
    }


    return (
        <Modal open={open} onClose={handleClose} className='content-center'>
            <div
                className='flex flex-col justify-center items-center self-center mx-auto content-center w-[35vw] bg-white rounded-lg p-4'
            >
                <h1 className='w-full text-center text-3xl font-extrabold text-[#233E58] mt-4 pl-3'>Verificar Vericidad del Avistamiento</h1>
                {/* {activado  ? ( */}
                    {/* <> */}
                        <p className='text-[#233E58] mt-8 px-6 text-xl'>¿Está seguro que desea verificar la veracidad del avistamiento <strong>{nombreAvistamiento} - ID: {idAvistamiento}</strong>?</p>
                        <p className='text-[#233E58] mt-8 px-6 text-xl'>Le sugerimos que antes de verificarlo, verifique las informaciones del mismo. Esta acción le daría mayor credibilidad al avistamiento, así que verificar correctamente las informaciones.</p>
                    {/* </> */}
                {/* ) : (
                    <p className='text-[#233E58] mt-8 px-6 text-xl'>¿Está seguro que desea cambiar el estado de la publicación de <strong>{nombrePublicacion} - ID: {idPublicacion}</strong> de <strong>Desactivada</strong> a <strong>Activada</strong>?</p>
                )} */}

                <div className='flex flex-row justify-center items-center mt-8'>
                    <button
                        className='bg-[#233E58] text-white font-bold py-2 px-4 rounded-md mx-2'
                        onClick={handleConfirm}
                    >
                        Confirmar
                    </button>
                    <button
                        className='bg-[#E53E3E] text-white font-bold py-2 px-4 rounded-md mx-2'
                        onClick={handleClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </Modal>
    )
}


function ModalEditarAvistamiento({open, handleClose, avistamiento, nombreAvistamiento, idAvistamiento, setActualizar, idPublicacion}) { // setActualizar
    // const [imageData, setImageData] = useState(null);
    const [sendingData, setSendingData] = useState(false);
    const [imagenAvistamiento, setImagenAvistamiento] = useState(null);
    const [initialValues, setInitialValues] = useState({
        fecha_avistamiento: new Date(),
        detalles: "",
        imageData: null,
        ubicacion_latitud: 0.0,
        ubicacion_longitud: 0.0,
    });

    const showToast = async (promise, mensaje) => {
        return toast.promise(
          promise,
          {
            pending: mensaje,
          },
          { position: "top-center", autoClose: 2000, className: "w-auto" }
        );
      };


    useEffect(() => {
        console.log("AVISTAMIENTO",avistamiento);
        if(avistamiento){
            console.log("AVISTAMIENTO AYAYAYAY",avistamiento);
            setInitialValues({
                fecha_avistamiento: new Date(avistamiento?.fechahora).toISOString().split("T")[0],
                detalles: avistamiento?.detalles,
                ubicacion_latitud: parseFloat(avistamiento?.ubicacion_desaparicion_latitud),
                ubicacion_longitud: parseFloat(avistamiento?.ubicacion_desaparicion_longitud),
            });
            formikEditar.validateForm();
            if(avistamiento?.fotosavistamiento.length > 0){
                setImagenAvistamiento(avistamiento?.fotosavistamiento[0]?.urlarchivo);
            }
        }
    }
    ,[avistamiento]);

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        // console.log("FILE",file);
        const base64 = (await convertToBase64(file)).split(",")[1];
        // console.log("BASE64",base64);
        formikEditar.setFieldValue("imageData", {
            base64File: base64,
            fileName: file.name,
            mimeType: file.type,
        });
    };
    const formikEditar = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            fecha_avistamiento: Yup.date().required("La fecha de avistamiento es requerida"),
            detalles: Yup.string().required("La descripción del avistamiento es requerida"),
            ubicacion_latitud: Yup.number().required("La latitud de la ubicación es requerida"),
            ubicacion_longitud: Yup.number().required("La longitud de la ubicación es requerida"),
        }),
        onSubmit: async (values) => {
            console.log("VALORES",values);
            setSendingData(true);
            values.ubicacion_latitud = values.ubicacion_latitud.toString();
            values.ubicacion_longitud = values.ubicacion_longitud.toString();

            showToast(editarAvistamiento(idAvistamiento, values), "Editando avistamiento...").then((response) => {
                handleClose();
                if (response.status === 200) {
                    toast.success("Avistamiento Editado", { position: "top-center", autoClose: 2000, className: "w-auto" });
                    setActualizar({actualizar: true, idPublicacion: idPublicacion});
                    console.log("Avistamiento Editado",response);
                }
                else{
                    toast.error("Error al editar el avistamiento", { position: "top-center", autoClose: 2000, className: "w-auto" });
                }
            }
            ).catch((error) => {
                toast.error("Error al editar el avistamiento", { position: "top-center", autoClose: 2000, className: "w-auto" });
                console.log(error);
            });
            setSendingData(false);
            // handleCrearAvistamiento(values);
        },
    });

    useEffect(() => {
        console.log("FORMIK",formikEditar);
    }
    ,[formikEditar]);


    return(
        <Modal open={open} onClose={handleClose} className='content-center'>
            <div
                className="flex-1 flex-col justify-center items-center overflow-auto self-center align-middle mx-auto w-[35vw] h-[85vh] bg-white content-center rounded-lg p-4 scrollbar-custom px-5 py-2"
                >
                {/* <ToastContainer />  */}
                <h1 className='w-full text-center text-3xl font-extrabold text-[#233E58] mt-4 pl-3'>Editar Avistamiento - {nombreAvistamiento}</h1>
                <div className='flex flex-col w-[100%] mt-4'>
                    <label className='text-[#233E58] font-bold text-lg mb-2' htmlFor='name'>Fecha de Avistamiento</label>
                    <input
                        type='date'
                        id='fecha_avistamiento'
                        name='fecha_avistamiento'
                        value={formikEditar?.values?.fecha_avistamiento}
                        onChange={formikEditar.handleChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded'
                    />
                </div>
                <div className='flex flex-col w-[100%] mt-4'>
                    <label className='text-[#233E58] font-bold text-lg mb-2' htmlFor='name'>Descripción del Avistamiento</label>
                    <textarea
                        id='detalles'
                        name='detalles'
                        value={formikEditar?.values?.detalles}
                        onChange={formikEditar.handleChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded'
                    />
                </div>
                <div className='flex flex-col w-[100%] mt-4'>
                    <label className='text-[#233E58] font-bold text-lg mb-2' htmlFor='name'>Foto del Avistamiento</label>
                    <input
                        type='file'
                        id='foto_avistamiento'
                        onChange={handleFileInputChange}
                        name='nombre_desaparecido'
                        className='w-full px-3 py-2 border border-gray-300 rounded'
                    />
                    {imagenAvistamiento && (
                        <div className="flex flex-col">
                            <label className='text-[#233E58] font-bold text-lg mt-2' htmlFor='name'>Foto Actual</label>
                            <img
                                src={imagenAvistamiento}
                                className='w-[100px] h-[100px] mt-2 rounded-md object-cover'
                            />
                        </div>
                    )}
                </div>
                <div className='flex flex-col w-[100%] mt-4'>
                    <label className='text-[#233E58] font-bold text-lg mb-2' htmlFor='name'>Ubicación del Avistamiento</label>
                    <Mapa
                        lat_name={"ubicacion_latitud"}
                        long_name={"ubicacion_longitud"}
                        lat_value={formikEditar?.values?.ubicacion_latitud}
                        long_value={formikEditar?.values?.ubicacion_longitud}
                        setFieldValue={formikEditar?.setFieldValue}
                        initialZoom={14}
                        initialPosition={{ lat: 0, lng: 0 }}
                        onPositionChange={(position) => console.log(position)}
                    />
                </div>
                <div className='flex flex-row justify-center items-center mt-8'>
                    <button
                        className='text-white font-bold py-2 px-4 rounded-md mx-2'
                        onClick={formikEditar?.handleSubmit}
                        disabled={sendingData || !formikEditar.isValid || !formikEditar.dirty}
                        style={{
                            cursor: sendingData || !formikEditar.isValid || !formikEditar.dirty ? "not-allowed" : "pointer",
                            backgroundColor: sendingData || !formikEditar.isValid || !formikEditar.dirty ? "#95c7f7" : "#233E58"
                        }}

                    >
                        Confirmar
                    </button>
                    <button
                        className='bg-[#E53E3E] text-white font-bold py-2 px-4 rounded-md mx-2'
                        onClick={handleClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </Modal>
    )
}