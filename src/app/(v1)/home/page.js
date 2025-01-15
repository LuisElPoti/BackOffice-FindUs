"use client";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { AiFillEye } from "react-icons/ai";
import { MdAddBox } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";
import { obtenerInformacionesHome, calcular_porcentaje_diferencia_entre_semana,crear_reporte_backoffice } from "../../../../services/userService";
import { obtenerToken } from "../../../../services/cookiesServices";
import { useEffect, useState } from "react";
import { BsBinoculars } from "react-icons/bs";
import { FaFileExcel } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PieChartWithTotal from "../../components/graficoDonaUsuario";
import { obtenerRolUsuario } from "../../../../services/cookiesServices";


export default function Home() {
  const [informacionesSemanaActual, setInformacionesSemanaActual] = useState([]);
  const [informacionesSemanaPasada, setInformacionesSemanaPasada] = useState([]);
  const [informacionesGraficoUsuarios, setInformacionesGraficoUsuarios] = useState([]);
  const [informacionesGraficoMateriales, setInformacionesGraficoMateriales] = useState([]);
  const [botonDescargarActivo, setBotonDescargarActivo] = useState(true);

  useEffect(() => {
    obtenerInformacionesHome(obtenerToken()).then((response) => {
      console.log(response);
      if(response.status === 200){
        setInformacionesSemanaActual(response.data?.informaciones_semana_actual);
        setInformacionesSemanaPasada(response.data?.informacion_semana_pasada);
        setInformacionesGraficoUsuarios(response.data?.infornacion_grafico_usuarios);
        setInformacionesGraficoMateriales(response.data?.informacion_grafico_materiales_educativos);
      }else{
        console.log("Error al obtener la información");
      }
    });
  }, []);

  const showToast = async (promise, mensaje) => {
          return toast.promise(
            promise,
            {
              pending: mensaje,
            },
            { position: "top-center", autoClose: 2000, className: "w-auto" }
          );
        };

  if(obtenerRolUsuario() != "3" && obtenerRolUsuario() != "2"){
    // Notify the user that they don't have permission to access this section
    // Add buttons to redirect to the home page or to log out
    alert("No tienes permiso para acceder a la sección de Inicio");
    if (obtenerRolUsuario() === "4") {
      window.location.href = "/servicios";
    } else {
      location.href = "/login";
    }
    return null
  }

  if (informacionesSemanaActual.length === 0 || informacionesSemanaPasada.length === 0 || informacionesGraficoUsuarios.length === 0 || informacionesGraficoMateriales.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#75b57d]"></div>
      </div>
    );
  }

  const descargarReporte = () => {
    setBotonDescargarActivo(false);
    showToast(crear_reporte_backoffice(obtenerToken()), "Creando Archivo...").then((response) => {
      if(response.status === 200){
        console.log("Reporte creado con éxito");

        const base64File = response.data.filebase64;  // Ajusta esto según la estructura de tu respuesta
        // Crear un enlace de descarga
        const downloadLink = document.createElement('a');
        downloadLink.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64File}`;
        downloadLink.download = 'Reporte_Estadisticas.xlsx'; // Nombre del archivo a descargar
        downloadLink.click();  // Simula el clic para iniciar la descarga  

        console.log(response);
      }else{
        console.log("Error al crear el reporte");
      }
    });
    setBotonDescargarActivo(true);
  }


  return (
    <div className="flex flex-col h-screen overflow-hidden bg-colorResumen">
      <ToastContainer />
      <div className="h-[45%] bg-greenBackground items-center relative">
        <h2 className="text-xl text-letterColor font-bold ml-12 mt-8">Inicio</h2>
        <button 
          className="text-white absolute top-8 right-8 font-medium bg-blueBoton hover:bg-blueOscuro rounded-lg p-2 flex items-center justify-center h-[40px] transition-colors duration-300" 
          onClick={() => descargarReporte()}
          style={{backgroundColor: botonDescargarActivo ? "#3E86B9" : "#BEBFC0"}}
          disabled={!botonDescargarActivo}
          >
            <FaFileExcel className="text-white w-6 h-6 mr-2"/>
            Descargar Reporte de Estadisticas
          </button>
        <div className="flex items-center mt-8 justify-center space-x-8">

          <div className="bg-colorResumen w-[22%] py-4 rounded-lg flex flex-col">
            <div className="flex items-center justify-between px-6">
              <div className="flex flex-col">
                <h3 className="text-xs font-bold text-customBlue">TOTAL REPORTES ACTIVOS</h3>
                <p className="text-xl font-bold text-blueInactive mt-1">{informacionesSemanaActual?.publicaciones_activas}</p>
              </div>
              <div className="rounded-full w-11 h-11 bg-redReport flex items-center justify-center mt-[-5px] ml-[10px]">
                <AiFillEye className="text-white w-[55%] h-[55%]"></AiFillEye>
              </div>
            </div>

            <div className="flex items-center text-xs ml-6 mt-1">
              {calcular_porcentaje_diferencia_entre_semana(informacionesSemanaActual?.publicaciones_activas,informacionesSemanaPasada?.reportes_activos) >= 0 ? (
              <FaArrowUp className="text-greenLetter"/>
              ) : (
              <FaArrowDown className="text-redLetter"/>
              )}
              <p 
                className="font-bold ml-2"
                style={{color: calcular_porcentaje_diferencia_entre_semana(informacionesSemanaActual?.publicaciones_activas,informacionesSemanaPasada?.reportes_activos) >= 0 ? "#19A274" : "#FF4A4A"}}
              >
                {calcular_porcentaje_diferencia_entre_semana(informacionesSemanaActual?.publicaciones_activas,informacionesSemanaPasada?.reportes_activos)}%
              </p>
              <p className="ml-2 text-greenLetter2">Desde la semana pasada</p>
            </div>
          </div>
          
          <div className="bg-colorResumen w-[22%] py-4 rounded-lg flex flex-col">
            <div className="flex items-center justify-between px-6">
              <div className="flex flex-col">
                <h3 className="text-xs font-bold text-customBlue">NUEVOS REPORTES</h3>
                <p className="text-xl font-bold text-blueInactive mt-1">{informacionesSemanaActual?.publicaciones_semana}</p>
              </div>
              <div className="rounded-full w-11 h-11 bg-orangeReport flex items-center justify-center mt-[-8px] ml-[10px]">
                <MdAddBox className="text-white w-[55%] h-[55%]"></MdAddBox>
              </div>
            </div>
            <div className="flex items-center text-xs ml-6 mt-1">
              {calcular_porcentaje_diferencia_entre_semana(informacionesSemanaActual?.publicaciones_semana,informacionesSemanaPasada?.nuevos_reportes) >= 0 ? (
                <FaArrowUp className="text-greenLetter"/>
              ) : (
                <FaArrowDown className="text-redLetter"/>
              )}
              <p
                className="font-bold ml-2"
                style={{color: calcular_porcentaje_diferencia_entre_semana(informacionesSemanaActual?.publicaciones_semana,informacionesSemanaPasada?.nuevos_reportes) >= 0 ? "#19A274" : "#FF4A4A"}}
              >
                  {calcular_porcentaje_diferencia_entre_semana(informacionesSemanaActual?.publicaciones_semana,informacionesSemanaPasada?.nuevos_reportes)}%
              </p>
              <p className="ml-2 text-greenLetter2">Desde la semana pasada</p>
            </div>
          </div>


          <div className="bg-colorResumen w-[22%] py-4 rounded-lg flex flex-col">
            <div className="flex items-center justify-between px-6">
              <div className="flex flex-col">
                <h3 className="text-xs font-bold text-customBlue">AVISTAMIENTOS NUEVOS</h3>
                <p className="text-xl font-bold text-blueInactive mt-1">{informacionesSemanaActual?.avistamientos_semana}</p>
              </div>
              <div className="rounded-full w-11 h-11 bg-blueReport flex items-center justify-center mt-[-8px] ml-[10px]">
                <BsBinoculars className="text-white w-[55%] h-[55%]"></BsBinoculars>
              </div>
            </div>
            <div className="flex items-center text-xs ml-6 mt-1">
              {calcular_porcentaje_diferencia_entre_semana(informacionesSemanaActual?.avistamientos_semana,informacionesSemanaPasada?.avistamientos_activos) >= 0 ? (
                <FaArrowUp className="text-greenLetter"/>
                ) : (
                <FaArrowDown className="text-redLetter"/>
              )}
              <p 
                className="font-bold ml-2"
                style={{color: calcular_porcentaje_diferencia_entre_semana(informacionesSemanaActual?.avistamientos_semana,informacionesSemanaPasada?.avistamientos_activos) >= 0 ? "#19A274" : "#FF4A4A"}}
              > 
                {calcular_porcentaje_diferencia_entre_semana(informacionesSemanaActual?.avistamientos_semana,informacionesSemanaPasada?.avistamientos_activos)}%
              </p>
              <p className="ml-2 text-greenLetter2">Desde la semana pasada</p>
            </div>
          </div>
          
          <div className="bg-colorResumen w-[22%] py-4 rounded-lg flex flex-col">
            <div className="flex items-center justify-between px-6">
              <div className="flex flex-col">
                <h3 className="text-xs font-bold text-customBlue">REPORTES RESUELTOS</h3>
                <p className="text-xl font-bold text-blueInactive mt-1">{informacionesSemanaActual?.total_reportes_resueltos}</p>
              </div>
              <div className="rounded-full w-11 h-11 bg-blueReport flex items-center justify-center mt-[-8px] ml-[10px]">
                <IoShieldCheckmark className="text-white w-[55%] h-[55%]"></IoShieldCheckmark>
              </div>
            </div>
            <div className="flex items-center text-xs ml-6 mt-1">
              <FaArrowUp className="text-greenLetter"/>
              <p 
                className="font-bold ml-2"
                style={{color: calcular_porcentaje_diferencia_entre_semana(informacionesSemanaActual?.total_reportes_resueltos, informacionesSemanaPasada?.reportes_resueltos) >= 0 ? "#19A274" : "#FF4A4A"}}
                >
                  {calcular_porcentaje_diferencia_entre_semana(informacionesSemanaActual?.total_reportes_resueltos, informacionesSemanaPasada?.reportes_resueltos)}%
                  {/* 1.29% */}
                </p>
              <p className="ml-2 text-greenLetter2">Desde la semana pasada</p>
            </div>
          </div>
        </div>

        {/* Contenedor para los dos cuadros grandes */}
        <div className="flex justify-center space-x-8 absolute top-[250px] left-[12.5%] w-[75%]">
          <div className="w-[48%] bg-colorResumen py-8 shadow-lg rounded-lg">
            <h3 className="text-lg font-bold text-customBlue text-center">Total de Usuarios:</h3>
            <h3 className="text-lg font-bold text-customBlue text-center">{informacionesGraficoUsuarios?.cantidad_total_usuarios}</h3>
            <PieChartWithTotal 
              labels={informacionesGraficoUsuarios?.cantidad_usuarios_por_rol?.map((item) => item.nombrerol)}
              data={informacionesGraficoUsuarios?.cantidad_usuarios_por_rol?.map((item) => item?._count?.usuario)}
              backgroundColor={["#80deea", "#26c6da", "#004d61", "#f06292"]}
              hoverBackgroundColor={["#4ebac9", "#1b9cb1", "#003b48", "#d7547e"]}
            />
            {/* <img src="/assets/grafica.jpg" alt="Gráfica" className="mx-auto"/> */}
          </div>
          <div className="w-[48%] bg-colorResumen py-8 shadow-lg rounded-lg">
            <h3 className="text-lg font-bold text-customBlue text-center">Total de Materiales Educativos</h3>
            <h3 className="text-lg font-bold text-customBlue text-center">{informacionesGraficoMateriales?.cantidad_total_materiales_educativos}</h3>
            <PieChartWithTotal 
              labels={informacionesGraficoMateriales?.cantidad_materiales_educativos_por_tipo?.map((item) => item.nombrecategoriamaterial)}
              data={informacionesGraficoMateriales?.cantidad_materiales_educativos_por_tipo?.map((item) => item?._count?.recursoeducativo)}
              backgroundColor={["#c5e1a5", "#81c784", "#ffb74d", "#b0bec5", "#fff176"]}
              hoverBackgroundColor={["#a8d293", "#6bb96a", "#ffa726", "#90a4ae", "#ffee58"]}
            />
            {/* <img src="/assets/grupobusqueda.png" alt="Grupo de busqueda" className="mx-auto"/> */}
          </div>
        </div>
      </div>
    </div>
  );
}
