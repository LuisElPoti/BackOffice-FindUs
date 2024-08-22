import React, {useState} from "react";
import { BiSolidHome, BiSolidAmbulance} from "react-icons/bi";
import {FaUser, FaMessage} from "react-icons/fa6"
import {RiBook2Fill} from "react-icons/ri"
import { MdOutlineSettings } from "react-icons/md";
import Avatar from '@mui/material/Avatar';

export default function SideBar() {

    const [selected, setSelected]=useState(null);

    const handleClick = (item) => {
        setSelected(item);
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex items-start">
            {/* <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex flex-1"> */}
                <div className="w-1/5 bg-blueSidebar min-h-screen flex flex-col items-start py-6 pb-10">
                    <div className="flex items-center ml-6 mb-7">
                        <img
                            src="/assets/Logo.svg"
                            className="w-9 align-middle"
                            alt="Logo FindUs"
                        />
                        <h3 className="text-2xl font-bold text-customBlue ml-4 flex items-center">FindUs</h3>
                    </div>
                    
                        <div className={`w-full text-customBlue flex items-center py-3 cursor-pointer ${selected === 'home' ? 'bg-blueSelect' : 'hover:bg-blueSelect'}`} onClick={() => handleClick('home')}>
                            <BiSolidHome className="w-6 h-6 ml-8"></BiSolidHome>
                            <h4 className="ml-5">Inicio</h4>
                        </div>
                        <div className={`w-full text-customBlue flex items-center py-3 cursor-pointer ${selected === 'users' ? 'bg-blueSelect' : 'hover:bg-blueSelect'}`} onClick={() => handleClick('users')}>
                            <FaUser className="w-6 h-6 ml-8"></FaUser>
                            <h4 className="ml-5">Usuarios</h4>
                        </div>
                        <div className={`w-full text-customBlue flex items-center py-3 cursor-pointer ${selected === 'publicacion' ? 'bg-blueSelect' : 'hover:bg-blueSelect'}`} onClick={() => handleClick('publicacion')}>
                            <FaMessage className="w-5 h-5 ml-8"></FaMessage>
                            <h4 className="ml-5">Publicaciones</h4>
                        </div>
                        <div className={`w-full text-customBlue flex items-center py-3 cursor-pointer ${selected === 'material' ? 'bg-blueSelect' : 'hover:bg-blueSelect'}`} onClick={() => handleClick('material')}>
                            <RiBook2Fill className="w-6 h-6 ml-8"></RiBook2Fill>
                            <h4 className="ml-5">Material educativo</h4>
                        </div>
                        <div className={`w-full text-customBlue flex items-center py-3 cursor-pointer ${selected === 'servicios' ? 'bg-blueSelect' : 'hover:bg-blueSelect'}`} onClick={() => handleClick('servicios')}>
                            <BiSolidAmbulance className="w-6 h-6 ml-8"></BiSolidAmbulance>
                            <h4 className="ml-5">Servicios de emergencia</h4>
                        </div>
                        <div className="w-full text-customBlue flex items-center pt-44">
                            <MdOutlineSettings className="w-6 h-6 ml-8"></MdOutlineSettings>
                            <h4 className="ml-5 font-bold">Configuración</h4>
                        </div>
                        <hr className="w-4/5 border-t-2 mt-4 mx-auto rounded-full" style={{borderColor: 'rgba(44,106,156,0.3)'}}></hr>
                        <div className="w-full text-customBlue flex items-center pt-6">
                            <Avatar alt="Rosanna Bautista" src="/assets/profilePicture.png" className="ml-8"></Avatar>
                            <div className="ml-3 items-start">
                                <h4 className="font-bold">Rosanna Bautista</h4>
                                <h5 className="text-sm">Administrador</h5>
                            </div>
                        </div>
                </div>
            {/* </div> */}
        </div>
    );
}
