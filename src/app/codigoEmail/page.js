'use client'; 

import { useRouter } from 'next/navigation';
import { useRef,useState,useEffect } from 'react';
import OtpInput from "react-otp-input";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verificarCodigoCambioContrasena } from '../../../services/userService';
import { solicitarCambioContrasena } from '../../../services/userService';
import { guardarToken } from '../../../services/cookiesServices';
import Spinner from '../components/spinComponent';

export default function Login() {
  const router = useRouter();
  const inputsRef = useRef([]);
  const [sedingCode, setSendingCode] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState("");
  const [timeResend, setTimeResend] = useState(0);
  const [avaibleResend, setAvaibleResend] = useState(true);
  const [timesResended, setTimesResended] = useState(0);

  useEffect(() => {
    if(timeResend > 0 && !avaibleResend){
        setTimeout(() => {
            setTimeResend(timeResend - 1);
        }, 1000);
    }else if(timeResend == 0 && !avaibleResend){
        setAvaibleResend(true);
    }
  }, [avaibleResend, timeResend]);

  const handleResendCode = () => {
    if(!avaibleResend) return;

    showToast(solicitarCambioContrasena({email: email, resend: true}),"Reenviando Correo...").then((response) => {
        if(response.status == 200){
            toast.success(`Correo reenviado correctamente: ${response.data.message}`, {position: "top-center",className: "w-auto"});
        }else{
            toast.error(`Error al reenviar correo: ${response.data.message}`,{position: "top-center",className: "w-auto"});
        }
        console.log(response.data);
    }).catch((error) => {
        toast.error(`Error al reenviar correo: ${response.data.message}`,{position: "top-center",className: "w-auto"});
        console.log(error);
    });           
    setAvaibleResend(false);
    setTimeResend(60*(timesResended+1));
    setTimesResended(timesResended+1);
};
  
  useEffect(() => {
    // Recuperar el correo almacenado en sessionStorage si existe
    const storedEmail = sessionStorage.getItem('userEmail');
    
    if (storedEmail) {
      setEmail(storedEmail);
    }
    else{
      toast.info("No ha sido posible recuperar el correo. Lo enviaremos a la página principal para que reescriba de nuevo su correo", {position: "top-center",className: "w-auto"});
      setTimeout(() => {
        router.push('/restablecerContrasena');
      }, 4000);
    }
  }, []);

  const handleOtpChange = (otpValue) => {
    if(otpValue == ""){
      return;
    }
    const numericOtp = otpValue.replace(/\D/g, '');
    console.log("NUMERIC OTP: ");
    console.log(numericOtp);
    setOtp(numericOtp);
  };

  const showToast = async (promise, mensaje) => {
    return toast.promise(promise, {
      pending: mensaje,
      // success: 'Usuario registrado correctamente.',
      // autoClose: 8000,
    },{position: "top-center",className: "w-auto"});
  };


  const verificarCodigo = () => {
    setSendingCode(true);
    showToast(verificarCodigoCambioContrasena({email: email, codigoVerificacion: otp}),"Verificando Código").then((response) => {
        if(response.status == 200){
            console.log("Código verificado correctamente");
            console.log(response.data.token);
            toast.success("Código verificado correctamente.", {position: "top-center",className: "w-auto"});
            guardarToken(response.data.token);
            setTimeout(() => {
                router.push('/nuevaContrasena');
            }, 1000);
        }else{
            toast.error(`Error al verificar código: ${response.data.message}`,{position: "top-center",className: "w-auto"});
            console.log(response.data);
            setSendingCode(false);
        }
        console.log(response.data);
    }).catch((error) => {
        toast.error(`Error al verificar código: ${response.data.message}`,{position: "top-center",className: "w-auto"});
        setSendingCode(false);
        console.log(error);
    });
  };

  if (!email) {
    return(
      <>
        <ToastContainer />
        <Spinner />
      </>
    ) ;
  }
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <ToastContainer />
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex items-center mb-12">
            <img
              src="/assets/Logo.svg"
              className="w-auto"
              alt="Logo FindUs"
            />
            <h3 className="text-4xl font-bold text-customBlue ml-5">FindUs</h3>
          </div>
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-customBlue">Ingresa el código</h3>
          </div>
          <div className="mb-8">
            <h3 className="text-1xl font text-customBlue">
              Introduce el código de 6 dígitos que enviamos al correo <strong>{email}.</strong>
            </h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <div className="flex space-x-2">
                <OtpInput
                  value={otp}
                  onChange={handleOtpChange}
                  numInputs={6} // Se define que serán 6 dígitos
                  isInputNum    // Asegura que solo se puedan ingresar números
                  shouldAutoFocus // Foco automático en el primer campo
                  inputStyle={{
                    width: '3rem',
                    height: '3rem',
                    margin: '0 0.5rem',
                    fontSize: '1.5rem',
                    borderRadius: '0.25rem',
                    border: '2px solid #d1d5db', // Cambia esto si quieres otro color
                    textAlign: 'center',
                  }}
                  renderInput={(props) => <input {...props} />} 
                />
              </div>
              <button
                onClick={verificarCodigo} 
                className="mt-12 tracking-wide font-semibold bg-blueInactive text-white w-full py-4 rounded-lg hover:bg-blueActive transition-all duration-300 ease-in-out flex items-center justify-center"
                disabled={otp.length < 6 || sedingCode}
                style={{backgroundColor: (otp.length == 6 && !sedingCode) ? "#3E86B9" : "#3e86b979"}}
              >
                <span className="ml-1">Confirmar</span>
              </button>
              <div className='w-[100%]  mt-[2vh]'>
                {timeResend == 0 ? (
                  <p className="text-[#233E58] text-[14px] font-extrabold  w-[100%] text-center">
                    ¿No te ha llegado el correo?
                    <span className="mx-[1px]"/>
                    <button
                        className="text-[#3E86B9] text-[14px] font-extrabold  text-center"
                        onClick={handleResendCode}
                    >
                     Solicitar otro
                    </button>
                  </p>
                  ) : (
                  <p className="text-[#233E58] text-[14px] font-extrabold  w-[100%] text-center ">
                    ¿No te ha llegado el correo?, espera
                    <strong className="text-[#3E86B9] text-[14px] font-extrabold   "> {timeResend} </strong>
                    segundos para solicitar otro.
                  </p>
                )}
              </div>
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
