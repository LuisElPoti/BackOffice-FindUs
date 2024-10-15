"use client";
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import Mapa from '@/app/components/map'
import { useFormik } from "formik";
import * as Yup from "yup";


export default function Publicaciones() {
    const [expandedSection, setExpandedSection] = useState(null);
    const [formFilled, setFormFilled] = useState({
        personalInfo: false,
        disappearanceDetails: false,
        documentUpload: false,
    });

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const handleInputChange = (section) => {
        setFormFilled((prevState) => ({
            ...prevState,
            [section]: true,
        }));
    };

    const validationSchema = Yup.object({
        nombre_desaparecido: Yup.string().required("Este campo es obligatorio"),
        id_tipo_documento: Yup.number().required("Este campo es obligatorio"),
        documento_desaparecido: Yup.string().required("Este campo es obligatorio"),
        telefono: Yup.string().required("Este campo es obligatorio"),
        fecha_desaparicion: Yup.date().required("Este campo es obligatorio"),
        descripcion_desaparecido: Yup.string().required("Este campo es obligatorio"),
        relacion_desaparecido: Yup.string().required("Este campo es obligatorio"),
        contacto: Yup.string().required("Este campo es obligatorio"),
        fecha_nacimiento: Yup.date().required("Este campo es obligatorio"),
    });

    const formik = useFormik({
        initialValues: {
          nombre_desaparecido: "",
          id_tipo_documento: "",
          documento_desaparecido: "",
          telefono: "",
          fecha_desaparicion: new Date(),
          descripcion_desaparecido: "",
          relacion_desaparecido: "",
          contacto: "",
          fecha_nacimiento: new Date(),
          // idusuario: 24,
          edad: new Date(),
          ubicacion_latitud: "",
          ubicacion_longitud: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log("Enviando datos: ", values);
        //   setLoading(true);
        //   try {
        //     console.log("Fecha de nacimiento: ", values.fecha_nacimiento);
        //     values.edad = calcularEdad(values.fecha_nacimiento);
        //     values.id_tipo_documento = parseInt(values.id_tipo_documento);
            
        //     values.ubicacion_latitud = values.ubicacion_latitud.toString();
        //     values.ubicacion_longitud = values.ubicacion_longitud.toString();
      
        //     console.log("Enviando datos: ", values);
      
        //     const response = await crearPublicacion(values,obtenerToken()); // Espera la respuesta
        //     setApiResponse(response); // Guarda la respuesta para manejar el estado
            
        //     if (response.status === 200) {
        //       console.log("Publicación creada correctamente: ", response.data);
        //       const idPublicacion = response.data.idpublicacion;
        //       console.log("Publicación creada correctamente: ", response.data);
    
        //       // Paso 2: Subir la imagen o el archivo si se proporcionó
        //       if (imageData) {
        //         const uploadData = {
        //           idpublicacion: idPublicacion,
        //           base64Image: imageData?.base64,
        //           base64File: null,
        //           fileName: imageData?.fileName,
        //           mimeType: imageData?.mimeType
        //         };
    
        //         console.log("Datos de la imagen: ", "fileName:", uploadData.fileName, "mimeType:", uploadData.mimeType, "idPublicacion:", uploadData.idpublicacion);
                
        //         // Llamada a la API para subir la imagen/archivo
        //         const uploadResponse = await subirArchivo(uploadData);
        //         if (uploadResponse.status === 200) {
        //           console.log("Imagen subida correctamente");
        //         } else {
        //           console.error("Error al subir la imagen", uploadResponse.data.message);
        //         }
        //       }
    
        //       if(documentData){
        //         const uploadData = {
        //           idpublicacion: idPublicacion,
        //           base64Image: null,
        //           base64File: documentData?.base64,
        //           fileName: documentData?.fileName,
        //           mimeType: documentData?.mimeType,
        //         };
    
        //         console.log("Datos del archivo: ", "fileName:", uploadData.fileName, "mimeType:", uploadData.mimeType, "idPublicacion:", uploadData.idpublicacion);
                
        //         // // Llamada a la API para subir la imagen/archivo
        //         const uploadResponse = await subirArchivo(uploadData, 'tu_token_aqui');
        //         if (uploadResponse.status === 200) {
        //           console.log("Archivo subido correctamente");
        //         } else {
        //           console.error("Error al subir el archivo: ", uploadResponse.data.message);
        //         }
        //       }
              
        //       setLoading(false);  
        //       setModalVisible(true);
        //       setTimeout(() => {
        //         setModalVisible(false);
        //         router.push("../home");
        //       }, 2000);
        //     } else {
        //       console.log("Error al crear la publicación: ", response.data.message);
        //       setModalVisible(true);
        //       setLoading(false);
        //     }
        //   } catch (error) {
        //     setModalVisible(true);
        //     setLoading(false);
        //     console.error("Error en la petición: ", error);
        //   }
        },
    });

    useEffect(() => {
        console.log(formik.values);
    }
    , [formik.values]);

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-colorResumen">
            <div className="h-[45%] bg-greenBackground relative">
                <h2 className="text-xl text-letterColor font-bold ml-12 mt-8">Publicaciones</h2>
            </div>

            <div className="absolute top-8 right-8 flex items-center">
                <button className="text-white p-2 mr-4 flex items-center justify-center h-[40px]">
                    <img
                        src="/assets/buscar_button.png"
                        alt="Search"
                        className="w-[38px] h-[38px]"
                    />
                </button>

                <Popup
                    trigger={
                        <button className="text-white font-medium bg-blueBoton hover:bg-blueOscuro rounded-lg p-2 flex items-center justify-center h-[40px] transition-colors duration-300">
                            Crear publicación +
                        </button>
                    }
                    position="right center"
                    modal
                    closeOnDocumentClick
                    onClose={() => setExpandedSection(null)} 
                    contentStyle={{
                        padding: '0px',
                        borderRadius: '8px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                    }}
                >
                    <div className="p-8 bg-blueBackground rounded-md">
                        <h2 className="text-2xl text-customBlue font-bold mb-4">Crear publicación de persona desaparecida</h2>

                        <form>
                            {/* Información Personal */}
                            <div className="mb-4">
                                <button
                                    type="button"
                                    className="w-full text-left px-4 py-2 font-semibold bg-transparent text-customBlue rounded-lg focus:outline-none flex justify-between items-center border-b border-gray-300"
                                    onClick={() => toggleSection('personalInfo')}
                                >
                                    <span>
                                        <img
                                            src={formFilled.personalInfo ? '/assets/on.png' : '/assets/1.png'}
                                            alt="icon"
                                            className="inline-block w-6 h-6 mr-2"
                                        />
                                        Información personal de la persona desaparecida
                                    </span>
                                    <img
                                        src={expandedSection === 'personalInfo' ? '/assets/chevron-up.png' : '/assets/chevron-down.png'}
                                        alt="chevron"
                                        className="w-5 h-3"
                                    />
                                </button>
                                {expandedSection === 'personalInfo' && (
                                    <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="name">Nombre completo:</label>
                                            <input
                                                type="text"
                                                id="nombre_desaparecido"
                                                name="nombre_desaparecido"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="idNumber">Tipo de Documento de identidad:</label>
                                            {/* <input
                                                type="text"
                                                id="idNumber"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={() => handleInputChange('personalInfo')}
                                            /> */}
                                             <select
                                                className="w-full px-3 py-3 rounded font-medium text-gray-500 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                type="text"
                                                id="id_tipo_documento"
                                                name="id_tipo_documento"
                                                value={2}
                                                onChange={formik.handleChange}
                                                >
                                                <option value="" label="Selecciona un tipo de documento"></option>
                                                {/* {data.map((item) => (
                                                    <option key={item.id} value={item.id} label={item.nombretipodocumento}></option>
                                                ))} */}
                                                <option value="1" label="Cédula"></option>
                                                <option value="2" label="Pasaporte"></option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="idNumber">Documento de identidad:</label>
                                            <input
                                                type="text"
                                                id="documento_desaparecido"
                                                name="documento_desaparecido"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="birthDate">Fecha de nacimiento:</label>
                                            <input
                                                type="date"
                                                id="fecha_nacimiento"
                                                name="fecha_nacimiento"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="disappearanceDate">Fecha de desaparición:</label>
                                            <input
                                                type="date"
                                                id="fecha_desaparicion"
                                                name="fecha_desaparicion"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Detalles de la desaparición */}
                            <div className="mb-4">
                                <button
                                    type="button"
                                    className="w-full text-left px-4 py-2 bg-transparent text-customBlue font-semibold rounded-lg focus:outline-none flex justify-between items-center border-b border-gray-300"
                                    onClick={() => toggleSection('disappearanceDetails')}
                                >
                                    <span>
                                        <img
                                            src={formFilled.disappearanceDetails ? '/assets/on.png' : '/assets/2.png'}
                                            alt="icon"
                                            className="inline-block w-6 h-6 mr-2"
                                        />
                                        Detalles de la desaparición
                                    </span>
                                    <img
                                        src={expandedSection === 'disappearanceDetails' ? '/assets/chevron-up.png' : '/assets/chevron-down.png'}
                                        alt="chevron"
                                        className="w-5 h-3"
                                    />
                                </button>
                                {expandedSection === 'disappearanceDetails' && (
                                    <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="description">Descripción física:</label>
                                            <textarea
                                                id="descripcion_desaparecido"
                                                name="descripcion_desaparecido"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                rows="2"
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="lastSight">Información de Contacto:</label>
                                            <textarea
                                                id="contacto"
                                                name="contacto"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                rows="2"
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="lastSight">Relación con el Desaparecido:</label>
                                            <input
                                                id="relacion_desaparecido"
                                                name="relacion_desaparecido"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="lastSight">Relación con el Desaparecido:</label>
                                            <Mapa setFieldValue={formik.setFieldValue} lat_name={"ubicacion_latitud"}  long_name={"ubicacion_longitud"}/>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Carga de documentos */}
                            <div className="mb-4">
                                <button
                                    type="button"
                                    className="w-full text-left px-4 py-2 bg-transparent font-semibold text-customBlue rounded-lg focus:outline-none flex justify-between items-center border-b border-gray-300"
                                    onClick={() => toggleSection('documentUpload')}
                                >
                                    <span>
                                        <img
                                            src={formFilled.documentUpload ? '/assets/on.png' : '/assets/3.png'}
                                            alt="icon"
                                            className="inline-block w-6 h-6 mr-2"
                                        />
                                        Carga de documentos
                                    </span>
                                    <img
                                        src={expandedSection === 'documentUpload' ? '/assets/chevron-up.png' : '/assets/chevron-down.png'}
                                        alt="chevron"
                                        className="w-5 h-3"
                                    />
                                </button>
                                {expandedSection === 'documentUpload' && (
                                    <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="photoUpload">Fotos del desaparecido:</label>
                                            <input
                                                type="file"
                                                id="photoUpload"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                multiple
                                                onChange={() => handleInputChange('documentUpload')}
                                            />
                                        </div>
                                        {/* <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="policeReport">Documento de identidad:</label>
                                            <input
                                                type="file"
                                                id="policeReport"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={() => handleInputChange('documentUpload')}
                                            />
                                        </div> */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="idDocument">Reporte de la policía:</label>
                                            <input
                                                type="file"
                                                id="idDocument"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={() => handleInputChange('documentUpload')}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-blueBoton hover:bg-blueOscuro text-white font-bold py-2 px-4 rounded"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </Popup>
            </div>

            <div className="relative z-10 bg-grayBackground -mt-36 rounded-tl-3xl rounded-tr-3xl p-10 overflow-y-scroll">

            </div>
        </div>
    );
}
