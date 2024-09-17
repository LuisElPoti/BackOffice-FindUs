"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Player } from '@lottiefiles/react-lottie-player';
import OtpInput from "react-otp-input";

export default function SignUp() {
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState("");	

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es requerido")
      .matches(/^[a-zA-Z]+$/, "El nombre solo debe contener letras"),
    apellidos: Yup.string()
      .required("Los apellidos son requeridos")
      .matches(/^[a-zA-Z]+$/, "Los apellidos solo deben contener letras"),
    correo: Yup.string()
      .email("Correo no es válido")
      .required("El correo es requerido"),
    telefono: Yup.string()
      .matches(/^\d+$/, "El teléfono solo debe contener números")
      .required("El teléfono es requerido"),
    contrasena: Yup.string()
      .required("Este campo es obligatorio")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
      .matches(/\d/, "La contraseña debe tener al menos un número")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "La contraseña debe tener al menos un caracter especial"),
    documento: Yup.string()
      .matches(/^\d{8,12}$/, "Documento no válido")
      .required("El documento es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellidos: "",
      correo: "",
      contrasena: "",
      telefono: "",
      documento: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setModalVisible(true); // Mostrar el modal cuando el formulario se envíe
    },
  });

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
                  name="nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                />
                {formik.touched.nombre && formik.errors.nombre ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.nombre}</div>
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
              {/* Campos restantes */}
              <div>
                <h3 className="text-1xl font-medium text-customBlue">Correo</h3>
                <input
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Ingresa tu correo"
                  name="correo"
                  value={formik.values.correo}
                  onChange={formik.handleChange}
                />
                {formik.touched.correo && formik.errors.correo ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.correo}</div>
                ) : null}
              </div>
              <div>
                <h3 className="text-1xl font-medium text-customBlue">Teléfono</h3>
                <input
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Ingresa tu teléfono"
                  name="telefono"
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                />
                {formik.touched.telefono && formik.errors.telefono ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.telefono}</div>
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
                <h3 className="text-1xl font-medium text-customBlue">Documento</h3>
                <input
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Ingresa tu documento"
                  name="documento"
                  value={formik.values.documento}
                  onChange={formik.handleChange}
                />
                {formik.touched.documento && formik.errors.documento ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.documento}</div>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
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
              className="mt-4 bg-blueInactive text-white py-2 px-4 rounded-lg"
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
