import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { AiFillEye } from "react-icons/ai";
import { MdAddBox } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-colorResumen">
      <div className="h-[45%] bg-greenBackground items-center relative">
        <h2 className="text-xl text-letterColor font-bold ml-12 mt-8">Inicio</h2>
        <div className="flex items-center mt-8 justify-center space-x-8">
          <div className="bg-colorResumen w-[22%] py-4 rounded-lg flex flex-col">
            <div className="flex items-center justify-between px-6">
              <div className="flex flex-col">
                <h3 className="text-xs font-bold text-customBlue">TOTAL REPORTES ACTIVOS</h3>
                <p className="text-xl font-bold text-blueInactive mt-1">237</p>
              </div>
              <div className="rounded-full w-11 h-11 bg-redReport flex items-center justify-center mt-[-5px] ml-[10px]">
                <AiFillEye className="text-white w-[55%] h-[55%]"></AiFillEye>
              </div>
            </div>
            <div className="flex items-center text-xs ml-6 mt-1">
              <FaArrowUp className="text-greenLetter"/>
              <p className="font-bold text-greenLetter ml-2">2.56%</p>
              <p className="ml-2 text-greenLetter2">Desde la semana pasada</p>
            </div>
          </div>
          
          <div className="bg-colorResumen w-[22%] py-4 rounded-lg flex flex-col">
            <div className="flex items-center justify-between px-6">
              <div className="flex flex-col">
                <h3 className="text-xs font-bold text-customBlue">NUEVOS REPORTES</h3>
                <p className="text-xl font-bold text-blueInactive mt-1">12</p>
              </div>
              <div className="rounded-full w-11 h-11 bg-orangeReport flex items-center justify-center mt-[-8px] ml-[10px]">
                <MdAddBox className="text-white w-[55%] h-[55%]"></MdAddBox>
              </div>
            </div>
            <div className="flex items-center text-xs ml-6 mt-1">
              <FaArrowDown className="text-redLetter"/>
              <p className="font-bold text-redLetter ml-2">0.47%</p>
              <p className="ml-2 text-greenLetter2">Desde la semana pasada</p>
            </div>
          </div>
          
          <div className="bg-colorResumen w-[22%] py-4 rounded-lg flex flex-col">
            <div className="flex items-center justify-between px-6">
              <div className="flex flex-col">
                <h3 className="text-xs font-bold text-customBlue">REPORTES RESUELTOS</h3>
                <p className="text-xl font-bold text-blueInactive mt-1">36</p>
              </div>
              <div className="rounded-full w-11 h-11 bg-blueReport flex items-center justify-center mt-[-8px] ml-[10px]">
                <IoShieldCheckmark className="text-white w-[55%] h-[55%]"></IoShieldCheckmark>
              </div>
            </div>
            <div className="flex items-center text-xs ml-6 mt-1">
              <FaArrowUp className="text-greenLetter"/>
              <p className="font-bold text-greenLetter ml-2">1.29%</p>
              <p className="ml-2 text-greenLetter2">Desde la semana pasada</p>
            </div>
          </div>
        </div>

        {/* Contenedor para los dos cuadros grandes */}
        <div className="flex justify-center space-x-8 absolute top-[250px] left-[12.5%] w-[75%]">
          <div className="w-[48%] bg-colorResumen py-8 shadow-lg rounded-lg">
            <h3 className="text-lg font-bold text-customBlue text-center">Resumen Semanal</h3>
            <img src="/assets/grafica.jpg" alt="Gráfica" className="mx-auto"/>
          </div>
          <div className="w-[48%] bg-colorResumen py-8 shadow-lg rounded-lg">
            <h3 className="text-lg font-bold text-customBlue text-center">Total Grupos de Búsqueda</h3>
            <img src="/assets/grupobusqueda.png" alt="Grupo de busqueda" className="mx-auto"/>
          </div>
        </div>
      </div>
    </div>
  );
}
