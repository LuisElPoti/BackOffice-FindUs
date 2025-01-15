'use client';

import { useState,useEffect, Suspense } from 'react';
import { FaEye, FaEyeSlash} from "react-icons/fa6";
import { cambiarContrasena, verificarToken } from '../../../services/userService';
import { toast, ToastContainer } from "react-toastify";
import { useRouter, useSearchParams } from 'next/navigation';
import "react-toastify/dist/ReactToastify.css";
import { eliminarToken, obtenerToken, guardarToken } from '../../../services/cookiesServices';
import Spinner from '../components/spinComponent';

function Login() {
  const [password, setPassword] = useState('');
  const searchParams = useSearchParams();
  const [accessToken, setAccessToken] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sendingData, setSendingData] = useState(false);
  const router = useRouter();
  const [validToken, setValidToken] = useState(false);
  const [validations, setValidations] = useState({
    minLength: false,
    hasUpperLower: false,
    hasNumber: false,
    hasValidSymbols: false,
  });

  const showToast = async (promise, mensaje) => {
    return toast.promise(promise, {
      pending: mensaje,
      // success: 'Usuario registrado correctamente.',
      // autoClose: 8000,
    },{position: "top-center",className: "w-auto"});
  };

  useEffect(() => {
    // Captura el hash de la URL y extrae el access_token
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '?')); // Reemplaza el # para poder usar URLSearchParams
    const token = params.get('access_token');

    if (token != null && token != '') {
      setAccessToken(token);
      guardarToken(token);
      console.log('Token de acceso:', token);
    }else{
      setAccessToken('');
      console.log('No se ha detectado token de acceso');
    }
  }, []);

  useEffect(() => {
    if(obtenerToken() == null && (accessToken == '' || accessToken == null)){
        console.log("No se ha detectado token");
        console.log(accessToken);
        console.log(searchParams.get('access_token'));
        toast.error(`No se ha detectado ninguna solicitud. Haga una solicitud y siga los pasos para proceder a esta página`,{position: "top-center",className: "w-auto",autoClose: 100000});
            
        setTimeout(() => {
          // router.push('/login');
        }, 3000);
        return;
    }

    console.log("Token detectado");
    console.log(obtenerToken());
    // Validar token
    verificarToken(obtenerToken()).then((response) => {
      console.log(response);
        if(response.status == 200){
            setValidToken(true);
        }else{
            toast.error(`Error al verificar token: ${response.data.message}`,{position: "top-center",className: "w-auto",autoClose: 3000});
            setTimeout(() => {
                // router.push('/login');
            }, 3000);
        }
    }).catch((error) => {
        toast.error(`Error al verificar token: ${error}`,{position: "top-center",className: "w-auto",autoClose: 3000});
        setTimeout(() => {
            // router.push('/login');
        }, 3000);        
    });
  }, [accessToken]);

  const verificarContrasenaValida = () => {
    return validations.minLength && validations.hasUpperLower && validations.hasNumber && validations.hasValidSymbols;
  };

  const cambiarContrasenaFunc = async () => {
    setSendingData(true);
    showToast(cambiarContrasena({contrasena: password}, obtenerToken()),"Cambiando Contraseña...").then((response) => {
      if(response.status == 200){
          toast.success(`Contraseña cambiada correctamente: ${response.data.message}`, {position: "top-center",className: "w-auto"});
          eliminarToken();
          setTimeout(() => {
              router.push("/login");
          }, 500);
      }else{
          toast.error(`Error al cambiar contraseña: ${response.data.message}`,{position: "top-center",className: "w-auto"});
          setSendingData(false);
          console.log("ME FUI A LA PETICION");
          console.log(obtenerToken());  
          console.log(response.data);
      }
      console.log(response.data);
    }).catch((error) => {
      toast.error(`Error al cambiar contraseña: ${response.data.message}`,{position: "top-center",className: "w-auto"});
      setSendingData(false);
      console.log("ME FUI AL CATCH");
      console.log(error);
    });
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    setValidations({
      minLength: value.length >= 8 && value.length > 0,
      hasUpperLower: /[a-z]/.test(value) && /[A-Z]/.test(value) && value.length > 0,
      hasNumber: /\d/.test(value) && value.length > 0,
      hasValidSymbols: /^[^$%@^+=&!*ñ]*$/.test(value) && value.length > 0,
    });
  };

  if(!validToken){
    return(
      <>
        <ToastContainer />
        <Spinner />
      </>
    );
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
            <h3 className="text-2xl font-bold text-customBlue">Ingresa tu nueva contraseña</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
            <div className="relative h-auto">
              <input
                className="w-full h-full px-8 py-4 rounded-lg font-medium bg-gray-100 border placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu nueva contraseña"
                value={password}
                onChange={handlePasswordChange}
                style={{ borderColor: verificarContrasenaValida() ? '#e5e7eb' : 'red' }}
              />
              
              <button
                type="button"
                onClick={() => { setShowPassword(!showPassword) }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center align-middle my-auto" // Añadido flex para centrar
                style={{ height: '100%' }} // Asegura que el botón ocupe la misma altura que el input
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-500" aria-hidden="true" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-500" aria-hidden="true" />
                )}
              </button>
            </div>
              <div className="p-4 rounded-lg text-gray-700">
                <ul className="list-none space-y-2 text-sm">
                  <li className="flex items-center">
                    <img
                      src={validations.minLength ? '/assets/on.png' : '/assets/off.png'}
                      alt="check"
                      className="w-4 h-4 mr-2"
                    />
                    Tener al menos 8 caracteres
                  </li>
                  <li className="flex items-center">
                    <img
                      src={validations.hasUpperLower ? '/assets/on.png' : '/assets/off.png'}
                      alt="check"
                      className="w-4 h-4 mr-2"
                    />
                    Utilizar mayúsculas y minúsculas
                  </li>
                  <li className="flex items-center">
                    <img
                      src={validations.hasNumber ? '/assets/on.png' : '/assets/off.png'}
                      alt="check"
                      className="w-4 h-4 mr-2"
                    />
                    Incluir al menos un número
                  </li>
                  <li className="flex items-center">
                    <img
                      src={validations.hasValidSymbols ? '/assets/on.png' : '/assets/off.png'}
                      alt="check"
                      className="w-4 h-4 mr-2"
                    />
                    Evitar símbolos excepto $%@^+=&!*ñ
                  </li>
                </ul>
              </div>
              <div className="relative h-auto">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"                  
                  placeholder="Confirma tu contraseña"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={e => setConfirmPassword(e.target.value)}
                  style={{borderColor: confirmPassword == password ? '#e5e7eb' : 'red'}}
                />

                <button
                  type="button"
                  onClick={() => { setShowConfirmPassword(!showConfirmPassword) }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center align-middle my-auto" // Añadido flex para centrar
                  style={{ height: '100%' }} // Asegura que el botón ocupe la misma altura que el input
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  )}
                </button>
              </div>
              <button 
                className="mt-12 tracking-wide font-semibold bg-blueInactive text-white w-full py-4 rounded-lg hover:bg-blueActive transition-all duration-300 ease-in-out flex items-center justify-center"
                disabled={!(verificarContrasenaValida() && confirmPassword == password) || sendingData}
                style={{backgroundColor: ((verificarContrasenaValida() && confirmPassword == password)  && !sendingData) ? "#3E86B9" : "#3e86b979"}}
                onClick={cambiarContrasenaFunc}
              >
                <span className="ml-1">Restablecer contraseña</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-greenBackground text-center hidden lg:flex">
          <div
            className="w-full h-full bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/assets/Top-decoration.png')",
              backgroundSize: '150% auto',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default function NuevaContrasena() {
  return (
    <Suspense fallback={<Spinner />}>
      <Login />
    </Suspense>
  );
}