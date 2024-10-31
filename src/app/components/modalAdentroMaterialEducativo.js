import { Modal } from "@mui/material";
import Mapa from "./map";
import { useState, useEffect, use } from "react";
import { IoMdClose } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";
import {CircularProgress } from '@mui/material';
import { obtenerMaterialEducativoByID } from "../../../services/materialEducativoServices";
import { formatearFecha } from "../../../services/publicacionServices";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { obtenerFotoPerfil, obtenerNombreUsuario, obtenerToken } from "../../../services/cookiesServices";

export default function ModalAdentroMaterialEducativo({ open, handleClose, idMaterialEducativo=undefined }) {//
    const [openMap, setOpenMap] = useState(false);
    const [material, setMaterial] = useState({});
    const [loadingData, setLoadingData] = useState(false);

    //Funcion para simular delay
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // const showToast = async (promise, mensaje) => {
    //     return toast.promise(promise, {
    //       pending: mensaje,
    //       // success: 'Usuario registrado correctamente.',
    //       // autoClose: 8000,
    //     },{position: "top-center",className: "w-auto"});
    //   };

    useEffect(() => {
        if(idMaterialEducativo !== undefined){
            setLoadingData(true);
          // Aquí se puede hacer la petición a la API para obtener la publicación con el id
          obtenerMaterialEducativoByID(idMaterialEducativo).then((response) => {

            console.log("DATA DEL MATERIAL EDUCATIVO",response.data);
            if (response.status === 200) {
              setMaterial(response.data);
              // console.log(response.data.avistamiento[0].fotosavistamiento[0].urlarchivo);
              setLoadingData(false);
            }
          }).catch((error) => {
            console.log("ERROR EN EL USEEFFECT",error);
          });
        }
    }, [idMaterialEducativo]);


    //   const validationSchema = Yup.object({
    //     fecha_avistamiento: Yup.date().required("Este campo es obligatorio"),
    //     detalles: Yup.string().required("Este campo es obligatorio"),
    //     ubicacion_latitud: Yup.string().required("Este campo es obligatorio"),
    //     ubicacion_longitud: Yup.string().required("Este campo es obligatorio"),
    //     imageData: Yup.object().required(),
    //   });
    

    //   const formik = useFormik({
    //     initialValues: {
    //       fecha_avistamiento: new Date(),
    //       detalles: "",
    //       ubicacion_latitud: undefined,
    //       ubicacion_longitud: undefined,
    //       imageData: null,
    //       idPublicacion: idPublicacion,
    //     },
    //     validationSchema: validationSchema,
    //     onSubmit: async (values) => {
        
    //       console.log(values)
    //       setSendingData(true);
    //       values.ubicacion_latitud = values.ubicacion_latitud.toString();
    //       values.ubicacion_longitud = values.ubicacion_longitud.toString();
    //       values.idPublicacion = publicacion?.id;
    //       try{
    //         const { imageData, ...datosAvistamiento } = values;

    //         const dataFoto = {
    //             // idavistamiento: response.data.idAvistamiento,
    //             base64File: values?.imageData?.base64,
    //             fileName: values?.imageData?.fileName,
    //             mimeType: values?.imageData?.mimeType
    //           }
    //         showToast(crearAvistamiento({dataAvistamiento: datosAvistamiento, dataFoto: dataFoto}),"Creando avistamiento...").then((response) => {
    //             if(response.status === 200){
    //                 // console.log("Avistamiento creado correctamente: ", response.data);
    //                 // console.log("ID DEL AVISTAMIENTO: ", response.data.idAvistamiento);

    //                 obtenerAvistamientoPublicacion(values.idPublicacion).then((response) => {
    //                     setPublicacion({...publicacion, avistamiento: response.data});
    //                     // console.log("AVISTAMIENTOS DE LA PUBLICACION",response);
    //                 });
    //                 formik.resetForm();
    //                 toast.success("Avistamiento creado correctamente",{position: "top-center",className: "w-auto",autoClose: 3000});
    //             }else{
    //                 console.log("Error al crear la publicación: ", response.data.message);
    //                 toast.error("Error al crear el avistamiento",{position: "top-center",className: "w-auto",autoClose: 3000});
    //             }
    //             setSendingData(false);
    //         }).catch((error) => {
    //             console.log("ERROR EN EL SUBMIT",error);
    //             setSendingData(false);
    //         });
    //       }catch(error){
    //         console.log("ERROR EN EL SUBMIT",error);
    //     }
    //   }
    //   });
    
    //   useEffect(() => {
    //     console.log("FORMIK VALES",formik.values);
    // }, [formik?.values]);


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
        <Modal open={open} className="content-center">
            <div
                className="flex-1 flex-col justify-center items-center overflow-auto self-center align-middle mx-auto w-[45vw] h-[60vh] bg-[#f4f3f3] rounded-lg p-4 scrollbar-custom"
            >
                <ToastContainer/>
                <div className="flex flex-row justify-between align-middle items-center content-center">
                    <h1 className="text-3xl font-extrabold text-[#233E58] mt-4 pl-3">Material Educativo - {material?.nombre}</h1>
                    {/* Botones de Cerrar */}
                    <button
                        onClick={handleClose}
                    >
                        <IoMdClose
                            size={30}
                        />
                    </button>
                </div>

                <div className="flex flex-col mt-[3vh] mx-3 bg-[#c5d7e8a5] px-5 py-3 rounded-md scrollbar-custom overflow-auto">
                        <h2 className="text-2xl font-bold text-[#233E58]">Información del Recurso Educativo</h2>
                        <ul className="list-disc">
                            <li className="text-md ml-10 text-[#233E58] mt-2"> <strong>Nombre:</strong> {material?.nombre}</li>
                            <li className="text-md ml-10 text-[#233E58] mt-2"><strong>Categoría del Material:</strong> {material?.categoriamaterial?.nombrecategoriamaterial}</li>
                            <li className="text-md ml-10 text-[#233E58] mt-2"><strong>Usuario que lo creó:</strong> {material?.usuario?.nombre} {material?.usuario?.apellido} - ID: {material?.usuario?.id}</li>
                            <li className="text-md ml-10 text-[#233E58] mt-2"><strong>Descripción:</strong> {material?.descripcion}</li>
                            <li className="text-md ml-10 text-[#233E58] mt-2"><strong>Fecha de Creación:</strong> {formatearFecha(material?.fechacreacion)}</li>
                            <li className="text-md ml-10 text-[#233E58] mt-2"><strong>Estado:</strong> {material?.estado?.nombreestado}</li>
                        </ul>
                        
                        {/* <p className="text-md ml-5 text-[#233E58] mt-2"> <strong>Nombre:</strong> Recurso #1 - La vida te da sorpresas, sorpresas te da la visa !AY DIOS!</p>
                        <p className="text-md ml-5 text-[#233E58] mt-2"><strong>Categoría del Material:</strong> Link a Video</p>
                        <p className="text-md ml-5 text-[#233E58] mt-2"><strong>Usuario que lo creó:</strong> William Chawillfer Ferreira Rosado</p>
                        <p className="text-md ml-5 text-[#233E58] mt-2"><strong>Descripción:</strong> 8 Millones de Historias tiene la CIUDAD DE NUEVA YORK</p>
                        <p className="text-md ml-5 text-[#233E58] mt-2"><strong>Fecha de Creación:</strong> 20/10/2021</p>
                        <p className="text-md ml-5 text-[#233E58] mt-2"><strong>Estado:</strong> ACTIVO</p> */}
                </div>
                <div className="w-full ">
                    <button 
                        className="flex mt-5 w-[40%] items-center bg-[#233E58] text-white font-bold py-2 px-4 rounded-md mx-auto"
                    >
                        <a href={material?.urlmaterial} target="_blank" rel="noreferrer" className="text-white font-bold text-center w-full">
                            Ver Material Educativo
                        </a>
                    </button>
                </div>
            </div>
        </Modal>
    );
    }