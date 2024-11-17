"use client"; // Indica que es un Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash} from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import { login } from "../../../services/userService"; // Importa tu servicio de login
import "react-toastify/dist/ReactToastify.css";
import { guardarToken,eliminarDatosUsuario } from "../../../services/cookiesServices";

export default function Login() {
  const router = useRouter();
  const [sendingData, setSendingData] = useState(false); // Estado para controlar la carga
  const [showPassword, setShowPassword] = useState(false);

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Correo no válido").required("El correo es requerido"),
    contrasena: Yup.string().required("La contraseña es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      contrasena: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSendingData(true);

      // Llamada al servicio de login
      login(values)
        .then((response) => {
          if (response.status === 200 && response.data.autenticado) {
            console.log("LOGIN",response.data);
            toast.success("Inicio de sesión exitoso", {position: "top-center",autoClose: 1000,className: "w-auto"});
            eliminarDatosUsuario();
            guardarToken(response.data.token);
            
            setTimeout(() => {
              router.push("/");
            },1000);
            
          } else {
            toast.error(response.data.message || "Error al iniciar sesión", {position: "top-center",autoClose: 5000, className: "w-auto"});
            setSendingData(false);
          }
        })
        .catch(() => {
          toast.error("Error al iniciar sesión. Inténtalo nuevamente.");
          setSendingData(false);
        });
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <ToastContainer />
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex items-center mb-12">
            <img src="/assets/Logo.svg" className="w-auto" alt="Logo FindUs" />
            <h3 className="text-4xl font-bold text-customBlue ml-5">FindUs</h3>
          </div>
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-customBlue">Inicia Sesión</h3>
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <div className="mb-4">
                <h3 className="text-1xl font-medium text-customBlue">Correo electrónico</h3>
              </div>
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                placeholder="nombre@dominio.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                required
              />
            
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
              ) : null}
              <div className="mb-4"></div>
              <div className="mt-2">
                <h3 className="text-1xl font-medium text-customBlue">Contraseña</h3>
              </div>
              <div className="relative h-auto">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  name="contrasena"
                  value={formik.values.contrasena}
                  onChange={formik.handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={()=> {setShowPassword(!showPassword)}}
                  className="absolute inset-y-0 right-0  items-center justify-center align-middle px-3 h-full"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 mt-4 text-gray-500" aria-hidden="true" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  )}
                </button>
              </div>
              {formik.touched.contrasena && formik.errors.contrasena ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.contrasena}</div>
              ) : null}
              <button
                type="submit"
                className={`mt-12 tracking-wide font-semibold bg-blueInactive text-white w-full py-4 rounded-lg hover:bg-blueActive transition-all duration-300 ease-in-out flex items-center justify-center ${
                  sendingData ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={sendingData}
              >
                <span className="ml-1">Iniciar Sesión</span>
              </button>
              <a
                href="/restablecerContrasena"
                className="mt-6 text-3xs font-medium text-blueInactive hover:underline block text-center mx-auto"
              >
                ¿Olvidaste tu contraseña?
              </a>
              <a
                href="/signup"
                className="mt-6 text-3xs font-medium text-blueInactive hover:underline block text-center mx-auto"
              >
                No tienes cuenta? Regístrate aquí
              </a>
            </div>
          </form>
        </div>
        <div className="flex-1 bg-greenBackground text-center hidden lg:flex">
          <div
            className="w-full h-full bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/assets/Top-decoration.png')",
              backgroundSize: "150% auto",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
