"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";
import OtpInput from "react-otp-input";
import { obtenerTiposDocumentos } from "../../../../services/catalogoServices";
import {
  registrarUsuario,
  formato_nombres,
  confirmarCorreo,
} from "../../../../services/userService";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { crearPublicacion, obtenerInformacionEditarPublicacionBO, actualizarPublicacionBO } from "../../../../services/publicacionServices";
import { subirArchivo, actualizarArchivoPubicacionBO, actualizarFotoPublicacionBO } from "../../../../services/uploadFileServices";
import { obtenerToken } from "../../../../services/cookiesServices";
import Mapa from "@/app/components/map";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa'; // Import icons for edit, check, and cancel
import TablaPublicaciones from "../../components/tablePublicaciones";
import ModalAdentroPublicaciones from "../../components/modalAdentroPublicaciones";
import { Modal, CircularProgress } from "@mui/material";
import { obtenerRolUsuario } from "../../../../services/cookiesServices";


export default function Publicaciones() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState({
    mostrar: false,
    id: undefined,
  });
  const [sendingPublicacionData, setSendingPublicacionData] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [dataTiposDocumentos, setDataTiposDocumentos] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(14); // Establece un zoom inicial. Puede ser un valor entre 0 y 21
  const [nuevaPublicacion, setNuevaPublicacion] = useState(false);

  //Datos Necesarios de Publicacion a Editar
  const [editandoPublicacion, setEditandoPublicacion] = useState({editando: false, infoPublicacion: null});
  const [obteniendoInfoEditar, setObteniendoInfoEditar] = useState(false);
  const [documentoPublicacion, setDocumentoPublicacion] = useState({fotoDesaparecido: null, documentoPolicia: null});
  const [abrirPublicacion, setAbrirPublicacion] = useState(false);

  //Datos del formik
  const [initialValues, setInitialValues] = useState({
    nombre_desaparecido: "",
    id_tipo_documento: "",
    documento_desaparecido: "",
    telefono: "",
    fecha_desaparicion: new Date(),
    descripcion_desaparecido: "",
    relacion_desaparecido: "",
    contacto: "",
    fecha_nacimiento: new Date(),
    edad: new Date(),
    ubicacion_latitud: "",
    ubicacion_longitud: "",
  });
  
  //AQUI LO PRIMERO DE ROSANNA
  const [selectedPerson, setSelectedPerson] = useState(null); // State to hold the selected person info
  const [isEditing, setIsEditing] = useState({}); // To track editable state for each field

  const handleRowClick = (idPublicacion) => {
    // setSelectedPerson(personData); // Set the clicked person's data
    console.log("ID Publicacion ON ROW CLICK: ", idPublicacion);
    setModalVisible({ mostrar: true, id: idPublicacion });
  };

  const closePopup = () => {
    // setSelectedPerson(null); // Clear the popup when closed
    setModalVisible(false);
  };

  const handleEditToggle = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field], // Toggle the edit mode for the field
    }));
  };

  const handleFieldChange = (field, value) => {
    setSelectedPerson((prevState) => ({
      ...prevState,
      [field]: value, // Update the selected person's data
    }));
  };
  //AQUI TERMINA LO DE ROSANNA

  //

  const handleEditantoPublicacion = (idPublicacion) => {
    console.log("Editando Publicacion con ID: ", idPublicacion);
    setObteniendoInfoEditar(true);
    obtenerInformacionEditarPublicacionBO(idPublicacion).then((response) => {
      console.log("Respuesta de la petición de Editar:", response.data);
      if (response.status == 200) {
        setInitialValues({
          nombre_desaparecido: response.data.nombredesaparecido,
          id_tipo_documento: response.data.tipodocumento.id,
          documento_desaparecido: response.data.numerodocumentodesaparecido,
          telefono: response.data.telefono,
          fecha_desaparicion: new Date(response.data.fechadesaparicion).toISOString().split("T")[0],
          descripcion_desaparecido: response.data.descripcionpersonadesaparecido,
          relacion_desaparecido: response.data.relacionusuariocondesaparecido,
          contacto: response.data.informacioncontacto,
          fecha_nacimiento: new Date(response.data.fechanacimiento).toISOString().split("T")[0],
          ubicacion_latitud: parseFloat(response.data.ubicacion_desaparicion_latitud).toString(),
          ubicacion_longitud: parseFloat(response.data.ubicacion_desaparicion_longitud).toString(),
        });


        setMapPosition({lat: parseFloat(response.data.ubicacion_desaparicion_latitud), lng: parseFloat(response.data.ubicacion_desaparicion_longitud)});
        setSelectedPosition({lat: parseFloat(response.data.ubicacion_desaparicion_latitud), lng: parseFloat(response.data.ubicacion_desaparicion_longitud)});
        //SETEAR LOS DATOS DE LAS FOTOS Y DOCUMENTOS
        const fotoDesaparecido = response.data.fotospublicacion.find((foto) => foto.idtipofotopublicacion == 1);
        console.log("Foto Desaparecido: ", fotoDesaparecido);
        const documentoPolicia = response.data.fotospublicacion.find((foto) => foto.idtipofotopublicacion == 2);

        setDocumentoPublicacion({fotoDesaparecido: fotoDesaparecido, documentoPolicia: documentoPolicia});
        setEditandoPublicacion({editando: true, infoPublicacion: idPublicacion});
        setObteniendoInfoEditar(false);
        setAbrirPublicacion(true);
      }
    });
  };

  const [expandedSection, setExpandedSection] = useState(null);
  const [formFilled, setFormFilled] = useState({
    personalInfo: false,
    disappearanceDetails: false,
    documentUpload: false,
  });

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleMapPositionChange = (position) => {
    setMapPosition(position);
    setSelectedPosition(position);
  };

  const handleInputChange = (section, event) => {
    const files = event.target.files;

    const fileDataArray = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const fullBase64 = reader.result; // Esto incluye el tipo MIME
        const base64 = fullBase64.split(",")[1]; // Solo obtenemos el base64
        const fileData = {
          fileName: file.name,
          mimeType: file.type,
          base64: base64,
        };

        // Condicional basado en la sección (por ejemplo, documentUpload)
        if (section === "documentUpload") {
          console.log("Documento cargado:", fileData);
          setDocumentData(fileData);
          console.log("Documento cargado:", fileData);
        } else if (section === "photoUpload") {
          console.log("Imagen cargada:", fileData);
          setImageData({...fileData, imagenPreview: fullBase64});
        }
        fileDataArray.push(fileData);
      };

      reader.onerror = (error) => {
        console.error("Error leyendo el archivo:", error);
      };

      // Leer el archivo como base64
      reader.readAsDataURL(file);
    });
  };

  const showToast = async (promise, mensaje) => {
    return toast.promise(
      promise,
      {
        pending: mensaje,
      },
      { position: "top-center", autoClose: 2000, className: "w-auto" }
    );
  };

  // function calcular edad
  const calcularEdad = (fecha_nacimiento) => {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha_nacimiento.getFullYear();

    // Obtener el mes actual y el mes de nacimiento
    const mesActual = hoy.getMonth();
    const mesNacimiento = fecha_nacimiento.getMonth();

    // Comprobar si el cumpleaños aún no ha ocurrido este año
    if (
      mesActual < mesNacimiento ||
      (mesActual === mesNacimiento &&
        hoy.getDate() < fecha_nacimiento.getDate())
    ) {
      edad--;
    }

    return edad;
  };

  useEffect(() => {
    // console.log("useEffect ejecutado");
    // console.log("TOKENNNNNN");
    // console.log(obtenerToken());
    formik.validateForm();
    obtenerTiposDocumentos().then((response) => {
      // console.log("Respuesta de la petición:", response.data);
      if (response.status == 200) {
        setDataTiposDocumentos(response.data);
      }
    });
  }, []);

  const validationSchema = Yup.object().shape({
    nombre_desaparecido: Yup.string().required("Este campo es obligatorio"),
    id_tipo_documento: Yup.number().required("Este campo es obligatorio"),
    documento_desaparecido: Yup.string().required("Este campo es obligatorio"),
    telefono: Yup.string().required("Este campo es obligatorio"),
    fecha_desaparicion: Yup.date().required("Este campo es obligatorio"),
    descripcion_desaparecido: Yup.string().required(
      "Este campo es obligatorio"
    ),
    relacion_desaparecido: Yup.string().required("Este campo es obligatorio"),
    contacto: Yup.string().required("Este campo es obligatorio"),
    fecha_nacimiento: Yup.date().required("Este campo es obligatorio"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSendingPublicacionData(true);
      try {
        console.log("Fecha de nacimiento: ", values.fecha_nacimiento);
        values.fecha_nacimiento = new Date(values.fecha_nacimiento);
        values.fecha_desaparicion = new Date(values.fecha_desaparicion);
        values.edad = calcularEdad(values.fecha_nacimiento);
        values.id_tipo_documento = parseInt(values.id_tipo_documento);

        values.ubicacion_latitud = values.ubicacion_latitud.toString();
        values.ubicacion_longitud = values.ubicacion_longitud.toString();

        console.log("Enviando datos: ", values);

        console.log("Token: ", obtenerToken());



        const response = editandoPublicacion.editando ?  
            await showToast(actualizarPublicacionBO(editandoPublicacion.infoPublicacion, values, obtenerToken()),"Actualizando Publicacion")
            : 
            await showToast(crearPublicacion(values, obtenerToken()),"Creando Publicacion"); // Espera la respuesta
          
        console.log("Respuesta de la petición:", response);

        setApiResponse(response); // Guarda la respuesta para manejar el estado

        console.log("Respuesta de la petición:", response);

        if (response.status == 200) {
          console.log("Publicación creada correctamente: ", response.data);
          const idPublicacion = response.data.idpublicacion;
          // Subir archivos
          if (imageData) {
            const fecha = new Date();
            const fechaString = fecha.toISOString().split("T")[0];
            const nombreFoto =
              imageData.fileName.split(".")[0] +
              fechaString +
              "." +
              imageData.fileName.split(".")[1];
            const sanitizedFileName = nombreFoto.replace(/[\s/]/g, "_"); // Reemplaza espacios y barras
            console.log("Nombre de la foto: ", sanitizedFileName);

            const uploadData = {
              idpublicacion: idPublicacion,
              base64Image: imageData?.base64,
              fileName: sanitizedFileName,
              mimeType: imageData?.mimeType,
            };
            console.log(
              "Datos de la imagen: ",
              "fileName:",
              uploadData.fileName,
              "mimeType:",
              uploadData.mimeType,
              "idPublicacion:",
              uploadData.idpublicacion
            );

            // Subir la imagen
            const uploadResponse = editandoPublicacion.editando ? await actualizarFotoPublicacionBO({...uploadData, id: documentoPublicacion?.fotoDesaparecido?.id}) : await subirArchivo(uploadData);
            if (uploadResponse.status == 200) {
              console.log("Imagen subida correctamente: ", uploadResponse.data);
            } else {
              console.log("Error al subir la imagen: ", uploadResponse);
            }
          }

          if (documentData) {
            const fecha = new Date();
            const fechaString = fecha.toISOString().split("T")[0];
            const nombreDocumento =
              documentData.fileName.split(".")[0] +
              fechaString +
              "." +
              documentData.fileName.split(".")[1];
            const sanitizedFileName = nombreDocumento.replace(/[\s/]/g, "_"); // Reemplaza espacios y barras

            console.log("Nombre del documento: ", sanitizedFileName);

            const uploadData = {
              idpublicacion: idPublicacion,
              base64File: documentData?.base64,
              fileName: sanitizedFileName,
              mimeType: documentData?.mimeType,
            };
            console.log(
              "Datos del documento: ",
              "fileName:",
              uploadData.fileName,
              "mimeType:",
              uploadData.mimeType,
              "idPublicacion:",
              uploadData.idpublicacion
            );
            // Subir el documento
            const uploadResponse = editandoPublicacion?.editando ? await actualizarArchivoPubicacionBO({...uploadData, id: documentoPublicacion?.documentoPolicia?.id}) : await subirArchivo(uploadData);
            if (uploadResponse.status == 200) {
              console.log(
                "Documento subido correctamente: ",
                uploadResponse.data
              );
            } else {
              console.log("Error al subir el documento: ", uploadResponse);
            }
          }

          toast.success("Publicación creada correctamente", {
            position: "top-center",
            autoClose: 5000,
            className: "w-auto",
          });
          onPopupClose();
          setNuevaPublicacion(true);

        } else {
          toast.error("Error al crear la publicación", {
            position: "top-center",
            autoClose: 5000,
            className: "w-auto",
          });
          setSendingPublicacionData(false);
        }
        setSendingPublicacionData(false);
      } catch (error) {
        console.log("Error al crear la publicación: ", error);
        setSendingPublicacionData(false);
        setApiResponse(error);
        toast.error("Error al crear la publicación", {
          position: "top-center",
          autoClose: 5000,
          className: "w-auto",
        });
      }
    },
  });

  const resetInitialValues = () => {
    setInitialValues({
      nombre_desaparecido: "",
      id_tipo_documento: "",
      documento_desaparecido: "",
      telefono: "",
      fecha_desaparicion: new Date(),
      descripcion_desaparecido: "",
      relacion_desaparecido: "",
      contacto: "",
      fecha_nacimiento: new Date(),
      edad: new Date(),
      ubicacion_latitud: "",
      ubicacion_longitud: "",
    });
  };


  const onPopupClose = () => {
    setExpandedSection(null)
    setEditandoPublicacion({editando: false, infoPublicacion: null})
    setAbrirPublicacion(false)
    setDocumentoPublicacion({fotoDesaparecido: null, documentoPolicia: null})
    setDocumentData(null)
    setImageData(null)  
    formik.resetForm()
    resetInitialValues()

  }

  useEffect(() => {
    // Verifica el rol del usuario solo en el cliente
  if(obtenerRolUsuario() != "2" && obtenerRolUsuario() != "3"){
    // Notify the user that they don't have permission to access this section
    // Add buttons to redirect to the home page or to log out
    alert("No tienes permiso para acceder a la sección de Publicaciones");
    if (obtenerRolUsuario() === "4") {
      window.location.href = "/servicios";
    } else {
      location.href = "/login";
    }
  }
  }
  ,[])

  if(obtenerRolUsuario() != "2" && obtenerRolUsuario() != "3"){
    return null;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-50-50-vertical">
      {/* <div className="h-[45%] bg-greenBackground relative"> */}
      <h2 className="text-xl text-letterColor font-bold ml-12 mt-8">
        Publicaciones
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
        <Popup
          trigger={
            <button className="text-white font-medium bg-blueBoton hover:bg-blueOscuro rounded-lg p-2 flex items-center justify-center h-[40px] transition-colors duration-300">
              Crear publicación +
            </button>
          }
          position="right center"
          modal
          open={editandoPublicacion.editando ? abrirPublicacion : false}
          closeOnDocumentClick
          onClose={() => {
              onPopupClose(); // Reset the form values
            }
          }
          contentStyle={{
            padding: "0px",
            borderRadius: "8px",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <div className="p-8 bg-blueBackground rounded-md">
            <h2 className="text-2xl text-customBlue font-bold mb-4">
              {editandoPublicacion.editando ? "Editar publicación" : "Crear publicación"}
              {/* { "Crear publicación de persona desaparecida"} */}
            </h2>

            <form onSubmit={formik.handleSubmit}>
              {/* Información Personal */}
              <div className="mb-4">
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 font-semibold bg-transparent text-customBlue rounded-lg focus:outline-none flex justify-between items-center border-b border-gray-300"
                  onClick={() => toggleSection("personalInfo")}
                >
                  <span>
                    <img
                      src={
                        formFilled.personalInfo
                          ? "/assets/on.png"
                          : "/assets/1.png"
                      }
                      alt="icon"
                      className="inline-block w-6 h-6 mr-2"
                    />
                    Información personal de la persona desaparecida
                  </span>
                  <img
                    src={
                      expandedSection === "personalInfo"
                        ? "/assets/chevron-up.png"
                        : "/assets/chevron-down.png"
                    }
                    alt="chevron"
                    className="w-5 h-3"
                  />
                </button>
                {expandedSection === "personalInfo" && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="name"
                      >
                        Nombre completo:
                      </label>
                      <input
                        type="text"
                        id="nombre_desaparecido"
                        name="nombre_desaparecido"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        onChange={formik.handleChange}
                        value={formik.values.nombre_desaparecido}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="idNumber"
                      >
                        Tipo de Documento de identidad:
                      </label>
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
                        onChange={formik.handleChange}
                        value={formik.values.id_tipo_documento}
                      >
                        <option
                          value=""
                          label="Selecciona un tipo de documento"
                        ></option>
                        {dataTiposDocumentos.map((item) => (
                          <option
                            key={item.id}
                            value={item.id}
                            label={item.nombretipodocumento}
                          ></option>
                        ))}
                        {/* <option value="1" label="Cédula"></option>
                                            <option value="2" label="Pasaporte"></option> */}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="idNumber"
                      >
                        Documento de identidad:
                      </label>
                      <input
                        type="text"
                        id="documento_desaparecido"
                        name="documento_desaparecido"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        onChange={formik.handleChange}
                        value={formik.values.documento_desaparecido}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="phone"
                      >
                        Teléfono de contacto:
                      </label>
                      <input
                        type="text"
                        id="telefono"
                        name="telefono"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        onChange={formik.handleChange}
                        value={formik.values.telefono}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="birthDate"
                      >
                        Fecha de nacimiento:
                      </label>
                      <input
                        type="date"
                        id="fecha_nacimiento"
                        name="fecha_nacimiento"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        onChange={formik.handleChange}
                        value={formik.values.fecha_nacimiento}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="disappearanceDate"
                      >
                        Fecha de desaparición:
                      </label>
                      <input
                        type="date"
                        id="fecha_desaparicion"
                        name="fecha_desaparicion"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        value={formik.values.fecha_desaparicion}
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
                  onClick={() => toggleSection("disappearanceDetails")}
                >
                  <span>
                    <img
                      src={
                        formFilled.disappearanceDetails
                          ? "/assets/on.png"
                          : "/assets/2.png"
                      }
                      alt="icon"
                      className="inline-block w-6 h-6 mr-2"
                    />
                    Detalles de la desaparición
                  </span>
                  <img
                    src={
                      expandedSection === "disappearanceDetails"
                        ? "/assets/chevron-up.png"
                        : "/assets/chevron-down.png"
                    }
                    alt="chevron"
                    className="w-5 h-3"
                  />
                </button>
                {expandedSection === "disappearanceDetails" && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="description"
                      >
                        Descripción física:
                      </label>
                      <textarea
                        id="descripcion_desaparecido"
                        name="descripcion_desaparecido"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        rows="2"
                        value={formik.values.descripcion_desaparecido}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="lastSight"
                      >
                        Información de Contacto:
                      </label>
                      <textarea
                        id="contacto"
                        name="contacto"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        rows="2"
                        value={formik.values.contacto}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="lastSight"
                      >
                        Relación con el Desaparecido:
                      </label>
                      <input
                        id="relacion_desaparecido"
                        name="relacion_desaparecido"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        value={formik.values.relacion_desaparecido}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="lastSight"
                      >
                        Ubicacion de desaparición:
                      </label>
                      <Mapa
                        setFieldValue={formik.setFieldValue}
                        lat_value={selectedPosition?.lat}
                        long_value={selectedPosition?.lng}
                        lat_name={"ubicacion_latitud"}
                        long_name={"ubicacion_longitud"}
                        initialPosition={mapPosition}
                        initialZoom={mapZoom}
                        onPositionChange={handleMapPositionChange}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Carga de documentos */}
              <div className="mb-4">
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 bg-transparent font-semibold text-customBlue rounded-lg focus:outline-none flex justify-between items-center border-b border-gray-300"
                  onClick={() => toggleSection("documentUpload")}
                >
                  <span>
                    <img
                      src={
                        formFilled.documentUpload
                          ? "/assets/on.png"
                          : "/assets/3.png"
                      }
                      alt="icon"
                      className="inline-block w-6 h-6 mr-2"
                    />
                    Carga de documentos
                  </span>
                  <img
                    src={
                      expandedSection === "documentUpload"
                        ? "/assets/chevron-up.png"
                        : "/assets/chevron-down.png"
                    }
                    alt="chevron"
                    className="w-5 h-3"
                  />
                </button>
                {expandedSection === "documentUpload" && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="photoUpload"
                      >
                        Fotos del desaparecido:
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id="photoUpload"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        onChange={(event) =>
                          handleInputChange("photoUpload", event)
                        }
                      />

                      {(documentoPublicacion.fotoDesaparecido || imageData) && (
                        <>
                            <label
                                className="block text-sm font-medium mt-2"
                            >
                                {imageData?.imagenPreview ? "Vista Previa:" : "Foto cargada:"}
                            </label>
                          <img
                            src={imageData?.imagenPreview ? imageData?.imagenPreview : documentoPublicacion.fotoDesaparecido.urlarchivo}
                            alt="upload"
                            className="w-36 h-36 mb-2 mt-2"
                          />
                      </>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="idDocument"
                      >
                        Reporte de la policía:
                      </label>
                      <input
                        type="file"
                        id="idDocument"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        onChange={(event) =>
                          handleInputChange("documentUpload", event)
                        }
                      />
                      {/*Boton de Descargar o Abrir Archivo*/}
                      {documentoPublicacion.documentoPolicia && ( 
                        <button className="bg-blueBoton hover:bg-blueOscuro mt-2 text-white font-bold py-2 px-4 rounded">
                          <a href={documentoPublicacion.documentoPolicia.urlarchivo} target="_blank">Descargar Archivo</a>

                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={sendingPublicacionData || !formik.isValid || !formik.dirty}
                  style={{
                    backgroundColor:
                      sendingPublicacionData || !formik.isValid || !formik.dirty
                        ? "#B0B0B0"
                        : "#3E86B9",
                  }}
                  className="bg-blueBoton hover:bg-blueOscuro text-white font-bold py-2 px-4 rounded"
                >
                  {sendingPublicacionData ? "Enviando..." : (editandoPublicacion.editando ? "Editar" : "Crear")}
                </button>
              </div>
            </form>
          </div>
        </Popup>
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
          handleEditandoPublicacion={handleEditantoPublicacion}
          nuevaPublicacion={nuevaPublicacion}
          setNuevaPublicacion={setNuevaPublicacion}
        />
      </div>

      
      <ModalAdentroPublicaciones
        idPublicacion={modalVisible.id}
        open={modalVisible.mostrar}
        handleClose={() => setModalVisible({ mostrar: false, id: undefined })}
      />

              <Modal open={obteniendoInfoEditar} className="content-center">
                <div
                    className="flex justify-center items-center self-center mx-auto content-center w-[50vw] bg-white rounded-lg p-4 h-[20vh]"
                >
                    <CircularProgress/>
                </div>
              </Modal>
    </div>
  );
}
