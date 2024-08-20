"use client";
import { useFormik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export default function SignUp() {

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required('El nombre es requerido').matches(/^[a-zA-Z]+$/, 'El nombre solo debe contener letras'),
    apellidos: Yup.string()
      .required('Los apellidos son requeridos').matches(/^[a-zA-Z]+$/, 'Los apellidos solo deben contener letras'),
    correo: Yup.string()
      .email('Correo no es válido')
      .required('El correo es requerido'),
    telefono: Yup.string()
      .matches(/^\d+$/, 'El teléfono solo debe contener números')
      .required('El teléfono es requerido'),
    contrasena: Yup.string().required("Este campo es obligatorio").min(8, "La contraseña debe tener al menos 8 caracteres").matches(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
    .matches(/\d/, "La contraseña debe tener al menos un número")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "La contraseña debe tener al menos un caracter especial"),
    documento: Yup.string()
      .matches(/^\d{8,12}$/, 'Documento no válido')
      .required('El documento es requerido'),
  });

  const [pressed, setPressed] = useState({
    nombre: false,
    apellidos: false,
    correo: false,
    contrasena: false,
    telefono: false,
    documento: false,
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
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-3/5 xl:w-7/12 p-6 sm:p-12">
          <div className="flex items-center mb-4">
            <img
              src="/assets/Logo.svg"
              className="w-auto"
              alt="Logo FindUs"
            />
            <h3 className="text-4xl font-bold text-customBlue ml-5">FindUs</h3>
          </div>
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-customBlue">Crea tu Cuenta</h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-1xl font-medium text-customBlue">Nombre</h3>
                <input
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  name="nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  pressed={pressed.nombre}
                  onClick={()=> setPressed({...pressed, nombre:true})}
                  error={formik.errors.nombre}
                />
                {formik.touched.nombre && formik.errors.nombre ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.nombre}</div>
                ) : null}
              </div>
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
                <h3 className="text-1xl font-medium text-customBlue">Correo Electrónico</h3>
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
                  type="tel"
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
                <h3 className="text-1xl font-medium text-customBlue">Documento de identidad</h3>
                <input
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="document"
                  placeholder="0038987568-2"
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
          <a
            href="/login"
            className="mt-6 text-3xs font-medium text-blueActive hover:underline block text-center mx-auto"
          >
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
    </div>
  );
}
