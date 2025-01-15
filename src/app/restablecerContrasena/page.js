'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { solicitarCambioContrasena } from '../../../services/userService';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [sedingData, setSendingData] = useState(false);

  const verificarFormatoCorreo = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const showToast = async (promise, mensaje) => {
    return toast.promise(promise, {
      pending: mensaje,
      // success: 'Usuario registrado correctamente.',
      // autoClose: 8000,
    },{position: "top-center",className: "w-auto"});
  };

  const solicitarCambio = async () => {
    setSendingData(true);
    const data = {
      email: email
    };
    showToast(solicitarCambioContrasena(data),"Enviando Correo...").then((response) => {
      if(response.status == 200){
          sessionStorage.setItem('userEmail', email);
          if(response.data.message.includes("vigente")){
              toast.info(response.data.message,{position: "top-center",className: "w-auto"});
              setTimeout(() => {
                router.push('/codigoEmail');
              }, 6000);
          }else{
            router.push('/codigoEmail');
          }
      }else{
          toast.error(`Error al enviar correo: ${response.data.message}`,{position: "top-center",className: "w-auto"});
          setSendingData(false);
      }
      console.log(response);
  }).catch((error) => {
      toast.error(`Error al enviar correo: ${response.data.message}`,{position: "top-center",className: "w-auto"});
      setSendingData(false);
  });           
  }


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
            <h3 className="text-2xl font-bold text-customBlue">Restablece tu contraseña</h3>
          </div>
          <div className="mb-8">
            <h3 className="text-1xl font text-customBlue">Ingresa el correo con el que registraste tu cuenta para enviarte un código de restablecimiento.</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <div className="mb-4">
                <h3 className="text-1xl font-medium text-customBlue">Correo electrónico</h3>
              </div>
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                placeholder="nombre@dominio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{borderColor: !verificarFormatoCorreo(email) ? "red" : "#e5e7eb"}}
              />
              <div className="mb-4"></div>
              
              <button
                onClick={solicitarCambio}
                className="mt-12 tracking-wide font-semibold bg-blueInactive  text-white w-full py-4 rounded-lg hover:bg-blueActive transition-all duration-300 ease-in-out flex items-center justify-center"
                disabled={!verificarFormatoCorreo(email) || sedingData}
                style={{backgroundColor: (verificarFormatoCorreo(email) && !sedingData) ? "#3E86B9" : "#3e86b979"}}
              >
                <span className="ml-1">Confirmar</span>
              </button>
            </div>
          </div>
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
