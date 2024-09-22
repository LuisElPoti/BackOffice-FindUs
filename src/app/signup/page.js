"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { use, useState, useEffect } from "react";
import { Player } from '@lottiefiles/react-lottie-player';
import OtpInput from "react-otp-input";
import { obtenerTiposDocumentos } from "/services/catalogoServices";
import {registrarUsuario,formato_nombres,confirmarCorreo} from "/services/userService";

export default function SignUp() {
  const [modalVisible, setModalVisible] = useState(false);
  const [sendingUserData, setSendingUserData] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [apiRessponse, setApiResponse] = useState();
  const [data, setData] = useState(
    [{ nombreTipoDocumento: 'NA', id: 1 }]
);	

const hideRegisterStatusModalOnSuccess = () => {
  setVisibleRegisterStatusModal(false);
  formik.resetForm();
  window.location = "../login";
}


const handleConfirm = () => {
  // Aquí puedes manejar la confirmación del código
  setSendingCode(true);
  confirmarCorreo({codigoVerificacion: code.join(""),email: apiRessponse?.data.email}).then((response) => {
       console.log("Respuesta de la peticiónnnnnnnnnnnnnnn:", response);
      if(response.status == 200){
          setApiResponse({...response, verifyingCode: true});
      }else{
          setApiResponse({...apiRessponse, status: response.status,data:{...apiRessponse?.data, message: response.data.message}});
          setSendingCode(false);
      }
  }
  );
   console.log(code.join(""));
   console.log("Código confirmado");
};
  const validationSchema = Yup.object().shape({
    nombres: Yup.string()
      .required("El nombre es requerido")
      .matches(/^[a-zA-Z]+$/, "El nombre solo debe contener letras"),
    apellidos: Yup.string()
      .required("Los apellidos son requeridos")
      .matches(/^[a-zA-Z]+$/, "Los apellidos solo deben contener letras"),
    email: Yup.string()
      .email("Correo no es válido")
      .required("El correo es requerido"),
    numeroTelefono: Yup.string()
      .matches(/^\d+$/, "El teléfono solo debe contener números")
      .required("El teléfono es requerido"),
    contrasena: Yup.string()
      .required("Este campo es obligatorio")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
      .matches(/\d/, "La contraseña debe tener al menos un número")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "La contraseña debe tener al menos un caracter especial"),
    numero_documento: Yup.string()
      .matches(/^\d{8,12}$/, "Documento no válido")
      .required("El documento es requerido"),
    IdTipoDocumento: Yup.string().required("El tipo de documento es requerido"),
    fechaNacimiento: Yup.date()
      .required("La fecha de nacimiento es requerida")
      .nullable()
      .max(new Date(), "La fecha de nacimiento no puede ser mayor a la fecha actual"),
      confirmar_contrasena: Yup.string()
      .oneOf([Yup.ref('contrasena'), null], 'Las contraseñas no coinciden')
      .required('Es necesario confirmar la contraseña'),
  });

  const formik = useFormik({
    initialValues: {
      nombres: "",
      apellidos: "",
      email: "",
      contrasena: "",
      confirmar_contrasena: "",
      numeroTelefono: "",
      numero_documento: "",
      IdTipoDocumento: "",
      fechaNacimiento: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSendingUserData(true);
      values.nombres = formato_nombres(values.nombres);
      values.apellidos = formato_nombres(values.apellidos);
      values.IdTipoDocumento = parseInt(values.IdTipoDocumento);
      registrarUsuario(values).then((response) => {
        console.log("Respuesta de la peticion: ", response.data);
        setApiResponse({status: response.status, data: response.data, verifyingCode: false});
        if(response.status == 400){
          if(response?.data?.message.includes("email")){
            formik.setFieldValue("email", "");
          }
          if(response?.data?.message.includes("documento")) {
            formik.setFieldValue("numero_documento", "");
          }
        }
      });
    }
  });

  useEffect(() => {
    if(apiRessponse?.status == 200){
        if(apiRessponse?.verifyingCode){
          setModalVisible(true);
        }else{
            setSendingUserData(false);
            showEmailConfirmationModal();
        }
    }
}
, [apiRessponse]);

 useEffect(() => {
        // console.log("useEffect ejecutado");
        formik.validateForm();
        obtenerTiposDocumentos().then((response) => {
            // console.log("Respuesta de la petición:", response.data);
            if(response.status == 200){
                setData(response.data);
            }
    });
    }, []);


  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOtpChange = (otpValue) => {
    const numericOtp = otpValue.replace(/\D/g, '');
    setOtp(numericOtp);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-6 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-3/5 xl:w-7/12 p-6 sm:p-12">
          <div className="flex items-center mb-4">
            <img src="/assets/Logo.svg" className="w-10" alt="Logo FindUs" />
            <h3 className="text-2xl font-bold text-customBlue ml-5">FindUs</h3>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-customBlue">Crea tu Cuenta</h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Campo Nombre */}
              <div>
                <h3 className="text-1xl font-medium text-customBlue">Nombre</h3>
                <input
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  name="nombres"
                  value={formik.values.nombres}
                  onChange={formik.handleChange}
                />
                {formik.touched.nombres && formik.errors.nombres ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.nombres}</div>
                ) : null}
              </div>
              {/* Campo Apellidos */}
              <div>
                <h3 className="text-1xl font-medium text-customBlue">Apellidos</h3>
                <input
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Ingresa tus apellidos"
                  name="apellidos"
                  value={formik.values.apellidos}
                  onChange={formik.handleChange}
                />
                {formik.touched.apellidos && formik.errors.apellidos ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.apellidos}</div>
                ) : null}
              </div>
              <div>
                <h3 className="text-1xl font-medium text-customBlue">Fecha de nacimiento</h3>
                <input
                  className="w-full px-4 py-2 rounded-lg font-medium text-gray-500 bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="date"
                  name="fechaNacimiento"
                  value={formik.values.fechaNacimiento}
                  onChange={formik.handleChange}
                />
                {formik.touched.fechaNacimiento && formik.errors.fechaNacimiento ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.fechaNacimiento}</div>
                ) : null}
              </div>
              <div>
                <h3 className="text-1xl font-medium text-customBlue">Correo</h3>
                <input
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Ingresa tu correo"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
                ) : null}
              </div>
              <div>
                <h3 className="text-1xl font-medium text-customBlue">Contraseña</h3>
                <input
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  name="contrasena"
                  value={formik.values.contrasena}
                  onChange={formik.handleChange}
                />
                {formik.touched.contrasena && formik.errors.contrasena ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.contrasena}</div>
                ) : null}
              </div>
              <div>
                <h3 className="text-1xl font-medium text-customBlue">Confirmar Contraseña</h3>
                <input
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Confirma tu contraseña"
                  name="confirmar_contrasena"
                  value={formik.values.confirmar_contrasena}
                  onChange={formik.handleChange}
                />
                {formik.touched.confirmar_contrasena && formik.errors.confirmar_contrasena ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.confirmar_contrasena}</div>
                ) : null}
              </div>
              <div>
                <h3 className="text-1xl font-medium text-customBlue">Tipo de documento de identidad</h3>
                <select
                  className="w-full px-2 py-2 rounded-lg font-medium text-gray-500 bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  name="IdTipoDocumento"
                  value={formik.values.IdTipoDocumento}
                  onChange={formik.handleChange}
                >
                  <option value="" label="Selecciona un tipo de documento"></option>
                  <option value="1" label="Cédula"></option>
                  <option value="2" label="Pasaporte"></option>
                </select>
                {formik.touched.IdTipoDocumento && formik.errors.IdTipoDocumento ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.IdTipoDocumento}</div>
                ) : null}
              </div>
              <div>
                <h3 className="text-1xl font-medium text-customBlue">Número de documento de identidad</h3>
                <input
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Ingresa tu documento"
                  name="numero_documento"
                  value={formik.values.numero_documento}
                  onChange={formik.handleChange}
                />
                {formik.touched.numero_documento && formik.errors.numero_documento ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.numero_documento}</div>
                ) : null}
              </div>
            </div>
            <div>
                <h3 className="text-1xl font-medium text-customBlue mt-6">Número de Teléfono</h3>
                <input
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Ingresa tu teléfono"
                  name="numeroTelefono"
                  value={formik.values.numeroTelefono}
                  onChange={formik.handleChange}
                />
                {formik.touched.numeroTelefono && formik.errors.numeroTelefono ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.numeroTelefono}</div>
                ) : null}
              </div>
            <button
              type="submit"
              handleSubmit={formik.handleSubmit}
              className="mt-12 tracking-wide font-semibold bg-blueInactive text-white w-full py-3 rounded-lg hover:bg-blueActive transition-all duration-300 ease-in-out flex items-center justify-center"
            >
              <span className="ml-1">Crear Cuenta</span>
            </button>
          </form>
          <a href="/login" className="mt-6 text-3xs font-medium text-blueActive hover:underline block text-center mx-auto">
            ¿Ya tienes cuenta? Iniciar sesión
          </a>
        </div>
        <div className="flex-1 bg-greenBackground text-center hidden lg:flex lg:w-2/5 xl:w-5/12">
          <div
            className="w-full h-full bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/assets/Top-decoration.png')",
              backgroundSize: "150% auto",
            }}
          ></div>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 text-customBlue">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center w-96 h-100px">
          <Player
            autoplay
            loop
            src="/assets/email_sended.json"
            style={{ height: '200px', width: '200px' }}
          >
          </Player>
            <h2 className="text-2xl font-bold mb-4">Correo Electrónico Enviado</h2>
            <p className="text-center mb-4">Para verificar que eres tu, revisa tu correo electrónico e introduce el código de verificación aquí debajo.</p>
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}  // Se define que serán 6 dígitos
              isInputNum  // Asegura que solo se puedan ingresar números
              shouldAutoFocus  // Foco automático en el primer campo
              inputStyle={{
                width: '2.5rem',
                height: '2.5rem',
                margin: '0 0.5rem',
                fontSize: '1.5rem',
                borderRadius: '0.25rem',
                border: '1px solid #254E70',
              }}
              renderInput={(props) => <input {...props} />} 
            />
            <button
              className={`mt-4 text-white py-2 px-4 rounded-lg
              ${otp.length < 6 
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blueInactive hover:bg-blueActive'}`

              }
              onClick={closeModal}
              disabled={otp.length < 6}  // Deshabilita el botón si el código no tiene 6 dígitos
            >
              Confirmar Correo
            </button>
          </div> 
        </div>
      )}
    </div>
  );
}
