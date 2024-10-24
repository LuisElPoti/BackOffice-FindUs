'use client';

import { useState } from 'react';

export default function Login() {
  const [password, setPassword] = useState('');
  const [validations, setValidations] = useState({
    minLength: false,
    hasUpperLower: false,
    hasNumber: false,
    hasValidSymbols: false,
  });

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

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
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
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                value={password}
                onChange={handlePasswordChange}
              />

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

              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password"
                placeholder="Confirma tu contraseña"
              />

              <button className="mt-12 tracking-wide font-semibold bg-blueInactive text-white w-full py-4 rounded-lg hover:bg-blueActive transition-all duration-300 ease-in-out flex items-center justify-center">
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