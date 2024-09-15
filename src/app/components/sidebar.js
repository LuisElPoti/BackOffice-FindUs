import React, {useState} from "react";
import { BiSolidHome, BiSolidAmbulance} from "react-icons/bi";
import {FaUser, FaMessage} from "react-icons/fa6"
import {RiBook2Fill} from "react-icons/ri"
import { MdOutlineSettings } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import Avatar from '@mui/material/Avatar';

export default function SideBar({setSelectedScreen}) {

    const [selected, setSelected]=useState('home');

    const handleClick = (item) => {
        setSelected(item);
        setSelectedScreen(item);
    }

    return (
        //<div className="flex min-h-screen">
            //<div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex flex-1">
                <div className="md:w-1/5 bg-blueSidebar min-h-screen flex flex-col items-start py-6 pb-10">
                    <div className="flex items-center ml-6 mb-7">
                        <img
                            src="/assets/Logo.svg"
                            className="w-9 align-middle"
                            alt="Logo FindUs"
                        />
                        <h3 className="text-2xl font-bold text-customBlue ml-4 flex items-center">FindUs</h3>
                    </div>
                    
                        <div className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-colors duration-300 ${selected === 'home' ? 'bg-blueSelect' : 'hover:bg-blueSelect'}`} onClick={() => handleClick('home')}>
                            <BiSolidHome className="w-5 h-5 ml-10"></BiSolidHome>
                            <h4 className={`ml-3 ${selected === 'home' ? 'font-bold' : ''}`}>Inicio</h4>
                        </div>
                        <div className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-colors duration-300 ${selected === 'users' ? 'bg-blueSelect' : 'hover:bg-blueSelect'}`} onClick={() => handleClick('users')}>
                            <FaUser className="w-5 h-5 ml-10"></FaUser>
                            <h4 className={`ml-5 ${selected === 'users' ? 'font-bold' : ''}`}>Usuarios</h4>
                        </div>
                        <div className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-colors duration-300 ${selected === 'publicaciones' ? 'bg-blueSelect' : 'hover:bg-blueSelect'}`} onClick={() => handleClick('publicaciones')}>
                            <FaMessage className="w-4 h-4 ml-10"></FaMessage>
                            <h4 className={`ml-3 ${selected === 'publicaciones' ? 'font-bold' : ''}`}>Publicaciones</h4>
                        </div>
                        <div className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-colors duration-300 ${selected === 'material' ? 'bg-blueSelect' : 'hover:bg-blueSelect'}`} onClick={() => handleClick('material')}>
                            <RiBook2Fill className="w-5 h-5 ml-10"></RiBook2Fill>
                            <h4 className={`ml-3 ${selected === 'material' ? 'font-bold' : ''}`}>Material educativo</h4>
                        </div>
                        <div className={`w-full text-customBlue text-sm flex items-center py-3 cursor-pointer transition-colors duration-300 ${selected === 'servicios' ? 'bg-blueSelect' : 'hover:bg-blueSelect'}`} onClick={() => handleClick('servicios')}>
                            <BiSolidAmbulance className="w-5 h-5 ml-10"></BiSolidAmbulance>
                            <h4 className={`ml-3 ${selected === 'servicios' ? 'font-bold' : ''}`}>Servicios de emergencia</h4>
                        </div>
                        <div className={`w-full text-customBlue flex items-center mt-52 cursor-pointer py-2 transition-colors duration-300 ${selected === 'config' ? 'bg-none' : ''}`} onClick={() => handleClick('config')}>
                            <MdOutlineSettings className="w-5 h-5 ml-10"></MdOutlineSettings>
                            <h4 className={`ml-3 font-bold text-sm`}>Configuración</h4>
                        </div>
                        <hr className="w-4/5 border-t-2 mt-4 mx-auto rounded-full" style={{borderColor: 'rgba(44,106,156,0.3)'}}></hr>
                        <div className="w-full text-customBlue flex items-center pt-6">
                            <Avatar alt="Rosanna Bautista" src="/assets/profilePicture.png" className="ml-10"></Avatar>
                            <div className="ml-3 items-start">
                                <h4 className="font-bold text-sm">Rosanna Bautista</h4>
                                <h5 className="text-xs">Administrador</h5>
                            </div>
                            <PiSignOutBold className={`w-6 h-6 ml-8 cursor-pointer ${selected === 'signout' ? 'bg-none' : 'hover:w-8 h-8'}`}></PiSignOutBold>
                        </div>
                </div>
            //</div>
        //</div>
    );
}
