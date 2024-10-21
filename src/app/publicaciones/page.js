"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";
import OtpInput from "react-otp-input";
import { obtenerTiposDocumentos } from "../../../services/catalogoServices";
import {
  registrarUsuario,
  formato_nombres,
  confirmarCorreo,
} from "../../../services/userService";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { crearPublicacion } from "../../../services/publicacionServices";
import { subirArchivo } from "../../../services/uploadFileServices";
import { obtenerToken } from "../../../services/cookiesServices";
import Mapa from "@/app/components/map";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function Publicaciones() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [sendingPublicacionData, setSendingPublicacionData] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [dataTiposDocumentos, setDataTiposDocumentos] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(14); // Establece un zoom inicial. Puede ser un valor entre 0 y 21

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
          setDocumentData(fileData);
          console.log("Documento cargado:", fileData);
        } else if (section === "photoUpload") {
          console.log("Imagen cargada:", fileData);
          setImageData(fileData);
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
      edad: new Date(),
      ubicacion_latitud: "",
      ubicacion_longitud: "",
    },
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

        const response = await crearPublicacion(values, obtenerToken()); // Espera la respuesta
        setApiResponse(response); // Guarda la respuesta para manejar el estado
        console.log("Respuesta de la petición:", response);
        if (response.status == 200) {
          toast.success("Publicación creada correctamente", {
            position: "top-center",
            autoClose: 2000,
            className: "w-auto",
          });
          setTimeout(() => {
            router.push("/");
          }, 5000);
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
            const uploadResponse = await subirArchivo(uploadData);
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
            const uploadResponse = await subirArchivo(uploadData);
            if (uploadResponse.status == 200) {
              console.log(
                "Documento subido correctamente: ",
                uploadResponse.data
              );
            } else {
              console.log("Error al subir el documento: ", uploadResponse);
            }
          }
        } else {
            toast.error("Error al crear la publicación", {
                position: "top-center",
                autoClose: 5000,
                className: "w-auto",
            });
        }
        setSendingPublicacionData(false);

      } catch (error) {
        console.log("Error al crear la publicación: ", error);
        setApiResponse(error);
      }
    },
  });

//   useEffect(() => {
//     console.log("Respuesta de la petición:", apiResponse);
//     if (apiResponse?.status == 200) {
//       toast.success("Publicación creada correctamente", {
//         position: "top-center",
//         autoClose: 2000,
//         className: "w-auto",
//       });
//       setTimeout(() => {
//         router.push("/publicaciones");
//       }, 5000);
//     } else {
//       toast.error("Error al crear la publicación", {
//         position: "top-center",
//         autoClose: 5000,
//         className: "w-auto",
//       });
//     }
//     setSendingPublicacionData(false);
//   }, [apiResponse]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-colorResumen">
      <div className="h-[45%] bg-greenBackground relative">
        <h2 className="text-xl text-letterColor font-bold ml-12 mt-8">
          Publicaciones
        </h2>
      </div>

      <div className="absolute top-8 right-8 flex items-center">
        <button className="text-white p-2 mr-4 flex items-center justify-center h-[40px]">
          <img
            src="/assets/buscar_button.png"
            alt="Search"
            className="w-[38px] h-[38px]"
          />
        </button>
        <ToastContainer />
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
            padding: "0px",
            borderRadius: "8px",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <div className="p-8 bg-blueBackground rounded-md">
            <h2 className="text-2xl text-customBlue font-bold mb-4">
              Crear publicación de persona desaparecida
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
                        multiple
                        onChange={(event) =>
                          handleInputChange("photoUpload", event)
                        }
                      />
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
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={sendingPublicacionData || !formik.isValid}
                  style={{
                    backgroundColor:
                      sendingPublicacionData || !formik.isValid
                        ? "#B0B0B0"
                        : "#3E86B9",
                  }}
                  className="bg-blueBoton hover:bg-blueOscuro text-white font-bold py-2 px-4 rounded"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </Popup>
      </div>

      <div className="relative z-10 bg-grayBackground -mt-36 rounded-tl-3xl rounded-tr-3xl p-10 overflow-y-scroll"></div>
    </div>
  );
}
