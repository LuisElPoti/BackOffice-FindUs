export default function SignUp() {
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-1xl font-medium text-customBlue">Nombre</h3>
              <input
                className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div>
              <h3 className="text-1xl font-medium text-customBlue">Apellidos</h3>
              <input
                className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Ingresa tus apellidos"
              />
            </div>
            <div>
              <h3 className="text-1xl font-medium text-customBlue">Correo Electrónico</h3>
              <input
                className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                placeholder="Ingresa tu correo"
              />
            </div>
            <div>
              <h3 className="text-1xl font-medium text-customBlue">Teléfono</h3>
              <input
                className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="tel"
                placeholder="Ingresa tu teléfono"
              />
            </div>
            <div>
              <h3 className="text-1xl font-medium text-customBlue">Contraseña</h3>
              <input
                className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="password"
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <div>
              <h3 className="text-1xl font-medium text-customBlue">Documento de identidad</h3>
              <input
                className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="document"
                placeholder="0038987568-2"
              />
            </div>
          </div>
          <button
            className="mt-12 tracking-wide font-semibold bg-blueInactive text-white w-full py-3 rounded-lg hover:bg-blueActive transition-all duration-300 ease-in-out flex items-center justify-center"
          >
            <span className="ml-1">Crear Cuenta</span>
          </button>
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
