"use client";
import { Inter } from "next/font/google";
import Sidebar from "./../components/sidebar";
import { useEffect, useState } from "react";
import { validarUsuarioLogueado, } from "../../../services/userService";
import { obtenerToken } from "../../../services/cookiesServices";
import { CircularProgress } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  // Verificar que el usuario este logeado
  const [loading, setLoading] = useState(true);
  const verificarUsuario = async () => {
    setLoading(true);
    const response = await validarUsuarioLogueado(obtenerToken());
    if (response.status === 401) {
      window.location.href = "/login";
      return;
    }
    setLoading(false);
  };
  
  useEffect(() => {
    verificarUsuario();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <CircularProgress />
  //     </div>
  //   );
  // }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
        <Sidebar verificarLogin={verificarUsuario}></Sidebar>
        <div className= "flex-1">
          {loading ? <LoadingComponent /> :
            children}
        </div>
        </div>
      </body>
    </html>
  );
}


function LoadingComponent() {
  return (
    <div className="flex justify-center items-center">
      <CircularProgress />
    </div>
  );
}