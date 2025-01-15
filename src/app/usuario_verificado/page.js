'use client';

import Link from 'next/link';
import { use, useState,useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { useSearchParams } from 'next/navigation';
import { eliminarToken, obtenerToken, guardarToken } from '../../../services/cookiesServices';
import { verificar_usuario_link } from '../../../services/userService';
import "react-toastify/dist/ReactToastify.css";
import Spinner from '../components/spinComponent';



export default function Verified() {
    const searchParams = useSearchParams();
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const showToast = async (promise, mensaje) => {
        return toast.promise(promise, {
          pending: mensaje,
          // success: 'Usuario registrado correctamente.',
          // autoClose: 8000,
        },{position: "top-center",className: "w-auto"});
      };
    
    useEffect(() => {
        // Captura el hash de la URL y extrae el access_token
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.replace('#', '?')); // Reemplaza el # para poder usar URLSearchParams
        const token = params.get('access_token');
    
        if (token != null && token != '') {
        //   setAccessToken(token);
        //   guardarToken(token);
          console.log('Token de acceso:', token);
          verificar_usuario_link(token).then((response) => {
            console.log(response);
              if(response.status == 200){
                  setLoading(false);
              }else{
                  toast.error(`Error al verificar token: ${response.data.message}`,{position: "top-center",className: "w-auto",autoClose: 3000});
                  setTimeout(() => {
                      // router.push('/login');
                  }, 3000);
              }
          }).catch((error) => {
              toast.error(`Error al verificar token: ${error}`,{position: "top-center",className: "w-auto",autoClose: 3000});
              setTimeout(() => {
                  // router.push('/login');
              }, 3000);        
          });
        }else{
        //   setAccessToken('');
          console.log('No se ha detectado token de acceso');
        }
      }, []);

    // useEffect(() => {
    //     if(obtenerToken() == null && (accessToken == '' || accessToken == null)){
    //         console.log("No se ha detectado token");
    //         console.log(accessToken);
    //         console.log(searchParams.get('access_token'));
    //         toast.error(`No se ha detectado ninguna solicitud. Haga una solicitud y siga los pasos para proceder a esta página`,{position: "top-center",className: "w-auto",autoClose: 100000});
                
    //         setTimeout(() => {
    //           // router.push('/login');
    //         }, 3000);
    //         return;
    //     }
    
    //     console.log("Token detectado");
    //     console.log(obtenerToken());
    //     // Validar token
        
    //   }, [accessToken]);
    
    
    if (loading) {
        return 
        <>
            <ToastContainer />
            <Spinner />
        </>;
      }
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>¡Usuario verificado con éxito!</h1>
        <p style={styles.message}>Ahora puedes iniciar sesión en tu cuenta.</p>
        <Link href="/login">
          <button style={styles.button}>Ir al login</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    margin: 0,
  },
  card: {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#333',
  },
  message: {
    fontSize: '16px',
    marginBottom: '20px',
    color: '#555',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
