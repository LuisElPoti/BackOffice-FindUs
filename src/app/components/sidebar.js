import React, {useState} from "react";
import { BiSolidHome, BiSolidAmbulance, IoSettingsOutline } from "react-icons/bi";
import {FaUser, FaMessage} from "react-icons/fa6"
import {RiBook2Fill} from "react-icons/ri"

export default function SideBar() {

    const [selected, setSelected]=useState(null);

    const handleClick = (item) => {
        setSelected(item);
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex flex-1">
                <div className="w-1/4 bg-blueSidebar min-h-screen flex flex-col items-start py-6 pb-10">
                    <div className="flex items-center ml-6 mb-7">
                        <img
                            src="/assets/Logo.svg"
                            className="w-9 align-middle"
                            alt="Logo FindUs"
                        />
                        <h3 className="text-2xl font-bold text-customBlue ml-4 flex items-center">FindUs</h3>
                    </div>
                    
                        <div className={`w-full text-customBlue flex items-center py-4 cursor-pointer ${selected === 'home' ? 'bg-blueSelect' : 'hover:bg-blueSelect'}`} onClick={() => handleClick('home')}>
                            <BiSolidHome className="w-6 h-6 ml-8"></BiSolidHome>
                            <h4 className="ml-5">Inicio</h4>
                        </div>
                        <div className={`w-full text-customBlue flex items-center py-4 cursor-pointer ${selected === 'users' ? 'bg-blueSelect' : 'hover:bg-blueSelect'}`} onClick={() => handleClick('users')}>
                            <FaUser className="w-6 h-6 ml-8"></FaUser>
                            <h4 className="ml-5">Usuarios</h4>
                        </div>
                        <div className={`w-full text-customBlue flex items-center py-4 cursor-pointer ${selected === 'publicacion' ? 'bg-blueSelect' : 'hover:bg-blueSelect'}`} onClick={() => handleClick('publicacion')}>
                            <FaMessage className="w-5 h-5 ml-8"></FaMessage>
                            <h4 className="ml-5">Publicaciones</h4>
                        </div>
                        <div className={`w-full text-customBlue flex items-center py-4 cursor-pointer ${selected === 'material' ? 'bg-blueSelect' : 'hover:bg-blueSelect'}`} onClick={() => handleClick('material')}>
                            <RiBook2Fill className="w-6 h-6 ml-8"></RiBook2Fill>
                            <h4 className="ml-5">Material educativo</h4>
                        </div>
                        <div className={`w-full text-customBlue flex items-center py-4 cursor-pointer ${selected === 'servicios' ? 'bg-blueSelect' : 'hover:bg-blueSelect'}`} onClick={() => handleClick('servicios')}>
                            <BiSolidAmbulance className="w-6 h-6 ml-8"></BiSolidAmbulance>
                            <h4 className="ml-5">Servicios de emergencia</h4>
                        </div>
                </div>
            </div>
        </div>
    );
}
