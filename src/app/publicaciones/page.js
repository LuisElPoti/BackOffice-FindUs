"use client";
import React from "react";
import MyTable from "../components/tablePublicaciones";

export default function Publicaciones() {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-colorResumen">
            <div className="h-[45%] bg-greenBackground relative">
                <h2 className="text-xl text-letterColor font-bold ml-12 mt-8">Publicaciones</h2>
            </div>

        <div className="absolute top-8 right-8 flex items-center">
          <button className="text-white p-2 mr-4 flex items-center justify-center h-[40px]">
            <img
              src="/assets/buscar_button.png" 
              alt="Search"
              className="w-[38px] h-[38px]" 
            />
          </button>
          <button className="text-white font-medium bg-blueBoton hover:bg-blueOscuro rounded-lg p-2 flex items-center justify-center h-[40px] transition-colors duration-300">
            Crear publicación +
          </button>
        </div>
              
            <div className="flex-grow relative">
                <MyTable />
            </div>
        </div>
    );
}
