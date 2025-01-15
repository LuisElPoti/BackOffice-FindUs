"use client";
import React, { useState, useEffect } from "react";
import { BiSolidHome, BiSolidAmbulance } from "react-icons/bi";
import { FaUser, FaMessage } from "react-icons/fa6";
import { RiBook2Fill } from "react-icons/ri";
import Avatar from '@mui/material/Avatar';
import { PiSignOutBold } from "react-icons/pi";
import { Modal } from "@mui/material";
import { obtenerInfoBasicaUserBD } from "../../../services/userService";
import FotoPerfirDefault from "../../../public/assets/profilePicture.svg"
import { useRouter, usePathname } from "next/navigation";
import { obtenerToken,obtenerFotoPerfil,obtenerNombreUsuario, guardarFotoPerfil,guardarNombreUsuario , obtenerRolUsuario, eliminarDatosUsuario, obtenerNombreRolUsuario} from "../../../services/cookiesServices";

export default function SideBar({ verificarLogin }) {
    // Obtener la ruta actual
    const router = useRouter();
    const [selected, setSelected] = useState(usePathname().split("/")[1]);
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [modalCOnfirmacionCerrarSesion, setModalConfirmacionCerrarSesion] = useState(false);
    const [fotoPerfil, setFotoPerfil] = useState(obtenerFotoPerfil());
    const id_rol = obtenerRolUsuario();
    const nombre_rol = obtenerNombreRolUsuario();

    
    const handleClick = (item) => {
        router.push(`/${item}`)
        setSelected(item)
        verificarLogin();
        // setSelected(item);

        // if (item === 'configuration') {
        //     setIsConfigOpen(!isConfigOpen); // Toggle configuration section
        // } else {
        //     setIsConfigOpen(false); // Close config section for other selections
        // }

        // setSelectedScreen(item);
    };

    useEffect(() => {
        // Función para actualizar el estado cuando cambie el localStorage
        const handleStorageChange = () => {
            const nuevaFotoPerfil = obtenerFotoPerfil();
            setFotoPerfil(nuevaFotoPerfil);
        };

        // Escuchar el evento `storage` para cambios en el localStorage
        window.addEventListener('storage', handleStorageChange);

        // Limpiar el evento al desmontar el componente
    }, [FotoPerfirDefault]);
    
    const tomarFotoPerfil = async () => {
        console.log("Obteniendo foto de perfil...");
        if (fotoPerfil == null) {
            console.log("Foto de perfil no encontrada");
            await obtenerInfoBasicaUserBD(obtenerToken()).then((response) => {
                if (response.status === 200) {
                    console.log("Foto de perfil encontrada en BD: ", response.data);
                    guardarFotoPerfil(response.data.urlFotoPerfil);
                    guardarNombreUsuario(response.data.nombreUsuario);
                    setFotoPerfil(response.data.urlFotoPerfil);
                }
                else {
                    console.log("Error al obtener foto de perfil: ", response);
                }
            });
        }
        else {
            console.log("Foto de perfil encontrada: ", fotoPerfil);
        }
    }

    useEffect(() => {
        tomarFotoPerfil();
    }
    , [fotoPerfil]);


    if (id_rol == "1" || id_rol == "undefined") {
        alert("No tienes permisos para acceder a esta sección.");
        router.push("/login");
    }


    return (
        <div className="md:w-1/5 bg-blueSidebar min-h-screen flex flex-col">
            {/* Logo y menú */}
            <div className="flex flex-col flex-grow py-6">
                <div className="flex items-center ml-6 mb-7">
                    <img
                        src="/assets/Logo.svg"
                        className="w-9 align-middle"
                        alt="Logo FindUs"
                    />
                    <h3 className="text-2xl font-bold text-customBlue ml-4 flex items-center">FindUs</h3>
                </div>

                {/* Home Button */}
                {(id_rol == "2" || id_rol == "3") && (
                    <button 
                        className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-all duration-300 ease-in-out transform ${selected === 'home' ? 'bg-blueSelect' : 'hover:bg-blueSelect hover:scale-105'}`} 
                        // onClick={() => handleClick('home')}
                        onClick={() => handleClick('home')}
                    >
                        <BiSolidHome className="w-5 h-5 ml-10" />
                        <h4 className={`ml-3 ${selected === 'home' ? 'font-bold' : ''}`}>Inicio</h4>
                    </button>
                )}

                {/* Users Button */}
                {id_rol == "3" && (
                    <button 
                        className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-all duration-300 ease-in-out transform ${selected === 'users' ? 'bg-blueSelect' : 'hover:bg-blueSelect hover:scale-105'}`} 
                        // onClick={() => handleClick('users')}
                        onClick={() => handleClick('users')}
                    >
                        <FaUser className="w-5 h-5 ml-10" />
                        <h4 className={`ml-5 ${selected === 'users' ? 'font-bold' : ''}`}>Usuarios</h4>
                    </button>
                )}

                {/* Publicaciones Button */}
                {(id_rol == "2" || id_rol == "3") && (
                    <button 
                        className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-all duration-300 ease-in-out transform ${selected === 'publicaciones' ? 'bg-blueSelect' : 'hover:bg-blueSelect hover:scale-105'}`} 
                        // onClick={() => handleClick('publicaciones')}
                        onClick={() => handleClick('publicaciones')}
                    >
                        <FaMessage className="w-4 h-4 ml-10" />
                        <h4 className={`ml-3 ${selected === 'publicaciones' ? 'font-bold' : ''}`}>Publicaciones</h4>
                    </button>
                )}

                {/* Material Educativo Button */}
                {(id_rol == "2" || id_rol == "3") && (
                    <button 
                        className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-all duration-300 ease-in-out transform ${selected === 'material_educativo' ? 'bg-blueSelect' : 'hover:bg-blueSelect hover:scale-105'}`} 
                        // onClick={() => handleClick('material')}
                        onClick={() => handleClick('material_educativo')}
                    >
                        <RiBook2Fill className="w-5 h-5 ml-10" />
                        <h4 className={`ml-3 ${selected === 'material' ? 'font-bold' : ''}`}>Material educativo</h4>
                    </button>
                )}

                {/* Servicios de Emergencia Button */}
                <button 
                    className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-all duration-300 ease-in-out transform ${selected === 'servicios' ? 'bg-blueSelect' : 'hover:bg-blueSelect hover:scale-105'}`} 
                    // onClick={() => handleClick('servicios')}
                    onClick={() => handleClick('servicios')}
                >
                    <BiSolidAmbulance className="w-5 h-5 ml-10" />
                    <h4 className={`ml-3 ${selected === 'servicios' ? 'font-bold' : ''}`}>Servicios de emergencia</h4>
                </button>

                {/* Configuración section */}
                <div>
                    <button 
                        className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-all duration-300 ease-in-out transform ${selected === 'configuration' ? 'bg-blueSelect' : 'hover:bg-blueSelect hover:scale-105'}`} 
                        // onClick={() => handleClick('configuration')}
                        onClick={() => handleClick('configuration')}
                        >
                        <img src="/assets/config-icon.svg" alt="Configuración" className="w-5 h-5 ml-10 transition-transform duration-300 transform hover:scale-110" />
                        <h4 className={`ml-3 transition-colors duration-300 ${selected === 'configuration' ? 'font-bold' : ''}`}>Configuración</h4>
                    </button    >
                </div>
            </div>

            {/* Configuración y perfil */}
            <div className="flex flex-col items-start py-6">
                <div className="w-full text-customBlue flex items-center pt-6">
                    <Avatar alt="Rosanna Bautista" src={fotoPerfil || FotoPerfirDefault} className="ml-10" />
                    <div className="ml-3 items-start max-w-[50%]">
                        <h4 className="font-bold text-sm">{obtenerNombreUsuario()}</h4>
                        <h5 className="text-xs">{nombre_rol}</h5>
                    </div>
                    <button
                        onClick={() => setModalConfirmacionCerrarSesion(true)}
                    >
                        <PiSignOutBold className={`w-6 h-6 ml-4 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110`} />
                    </button>
                </div>
            </div>

            {/* Modal de confirmación para cerrar sesión */}
            <Modal
                open={modalCOnfirmacionCerrarSesion}
                onClose={() => setModalConfirmacionCerrarSesion(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='content-center'
            >
                <div className="flex flex-col justify-center items-center self-center mx-auto content-center w-[35vw] bg-white rounded-lg p-4">
                    <h4 className="text-lg font-bold text-customBlue">¿Estás seguro de que deseas cerrar sesión?</h4>
                    <div className="flex justify-center mt-6">
                        <button 
                            className="bg-[#E53E3E] text-white px-4 py-2 rounded-lg mr-4"
                            onClick={() => {
                                eliminarDatosUsuario();
                                router.push("/login");
                            }}
                        >
                            Sí
                        </button>
                        <button 
                            className="bg-[#233E58] text-white px-4 py-2 rounded-lg"
                            onClick={() => setModalConfirmacionCerrarSesion(false)}
                        >
                            No
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
}
