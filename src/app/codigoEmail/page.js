'use client'; 

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Login() {
  const router = useRouter();
  const inputsRef = useRef([]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    } else {
      e.target.value = '';
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && e.target.value.length === 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const validarContrasena = () => {
    router.push('/validarContrasena');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
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
              Introduce el código de 6 dígitos que enviamos a tu correo.
            </h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <div className="flex space-x-2">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 text-2xl text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    ref={(el) => (inputsRef.current[index] = el)}
                    onInput={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
              <button
                onClick={validarContrasena} 
                className="mt-12 tracking-wide font-semibold bg-blueInactive text-white w-full py-4 rounded-lg hover:bg-blueActive transition-all duration-300 ease-in-out flex items-center justify-center"
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
