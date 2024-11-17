import React, { useState } from "react";
import { BiSolidHome, BiSolidAmbulance } from "react-icons/bi";
import { FaUser, FaMessage } from "react-icons/fa6";
import { RiBook2Fill } from "react-icons/ri";
import Avatar from '@mui/material/Avatar';
import { PiSignOutBold } from "react-icons/pi";
import { useEffect } from "react";
import { obtenerInfoBasicaUserBD } from "../../../services/userService";
import FotoPerfirDefault from "../../../public/assets/profilePicture.svg"
import { obtenerToken,obtenerFotoPerfil,obtenerNombreUsuario, guardarFotoPerfil,guardarNombreUsuario } from "../../../services/cookiesServices";

export default function SideBar({ setSelectedScreen }) {
    const [selected, setSelected] = useState('home');
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [fotoPerfil, setFotoPerfil] = useState(obtenerFotoPerfil());


    const handleClick = (item) => {
        setSelected(item);

        if (item === 'configuration') {
            setIsConfigOpen(!isConfigOpen); // Toggle configuration section
        } else {
            setIsConfigOpen(false); // Close config section for other selections
        }

        setSelectedScreen(item);
    };


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
                <div className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-all duration-300 ease-in-out transform ${selected === 'home' ? 'bg-blueSelect' : 'hover:bg-blueSelect hover:scale-105'}`} onClick={() => handleClick('home')}>
                    <BiSolidHome className="w-5 h-5 ml-10" />
                    <h4 className={`ml-3 ${selected === 'home' ? 'font-bold' : ''}`}>Inicio</h4>
                </div>

                {/* Users Button */}
                <div className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-all duration-300 ease-in-out transform ${selected === 'users' ? 'bg-blueSelect' : 'hover:bg-blueSelect hover:scale-105'}`} onClick={() => handleClick('users')}>
                    <FaUser className="w-5 h-5 ml-10" />
                    <h4 className={`ml-5 ${selected === 'users' ? 'font-bold' : ''}`}>Usuarios</h4>
                </div>

                {/* Publicaciones Button */}
                <div className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-all duration-300 ease-in-out transform ${selected === 'publicaciones' ? 'bg-blueSelect' : 'hover:bg-blueSelect hover:scale-105'}`} onClick={() => handleClick('publicaciones')}>
                    <FaMessage className="w-4 h-4 ml-10" />
                    <h4 className={`ml-3 ${selected === 'publicaciones' ? 'font-bold' : ''}`}>Publicaciones</h4>
                </div>

                {/* Material Educativo Button */}
                <div className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-all duration-300 ease-in-out transform ${selected === 'material' ? 'bg-blueSelect' : 'hover:bg-blueSelect hover:scale-105'}`} onClick={() => handleClick('material')}>
                    <RiBook2Fill className="w-5 h-5 ml-10" />
                    <h4 className={`ml-3 ${selected === 'material' ? 'font-bold' : ''}`}>Material educativo</h4>
                </div>

                {/* Servicios de Emergencia Button */}
                <div className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-all duration-300 ease-in-out transform ${selected === 'servicios' ? 'bg-blueSelect' : 'hover:bg-blueSelect hover:scale-105'}`} onClick={() => handleClick('servicios')}>
                    <BiSolidAmbulance className="w-5 h-5 ml-10" />
                    <h4 className={`ml-3 ${selected === 'servicios' ? 'font-bold' : ''}`}>Servicios de emergencia</h4>
                </div>

                {/* Configuración section */}
                <div>
                    <div className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-all duration-300 ease-in-out transform ${selected === 'configuration' ? 'bg-blueSelect' : 'hover:bg-blueSelect hover:scale-105'}`} 
                        onClick={() => handleClick('configuration')}>
                        <img src="/assets/config-icon.svg" alt="Configuración" className="w-5 h-5 ml-10 transition-transform duration-300 transform hover:scale-110" />
                        <h4 className={`ml-3 transition-colors duration-300 ${selected === 'configuration' ? 'font-bold' : ''}`}>Configuración</h4>
                    </div>
                </div>
            </div>

            {/* Configuración y perfil */}
            <div className="flex flex-col items-start py-6">
                <div className="w-full text-customBlue flex items-center pt-6">
                    <Avatar alt="Rosanna Bautista" src={fotoPerfil || FotoPerfirDefault} className="ml-10" />
                    <div className="ml-3 items-start max-w-[50%]">
                        <h4 className="font-bold text-sm">{obtenerNombreUsuario()||"Rosanna Bautista"}</h4>
                        <h5 className="text-xs">Administrador</h5>
                    </div>
                    <PiSignOutBold className={`w-6 h-6 ml-4 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110`} />
                </div>
            </div>
        </div>
    );
}
