
"use client";
import React, {useState} from "react";
import Sidebar from "./components/sidebar";
import Home from "./home/page";
import Users from "./users/page";
import Publicaciones from "./publicaciones/page";
import Material from "./material/page";
import Servicios from "./servicios/page";
import Configuration from "./configuration/page";

export default function Page() {

  const [selectedScreen, setSelectedScreen] = useState('home');

  return (
    <div className="flex">
      <Sidebar setSelectedScreen={setSelectedScreen}></Sidebar>

      <div className= "flex-1">
      {selectedScreen === 'home' && <Home/>}
      {selectedScreen === 'users' && <Users/>}
      {selectedScreen === 'publicaciones' && <Publicaciones/>}
      {selectedScreen === 'material' && <Material/>}
      {selectedScreen === 'servicios' && <Servicios/>}
      {selectedScreen === 'configuration' && <Configuration/>}
      </div>
    </div>

    
  );
}