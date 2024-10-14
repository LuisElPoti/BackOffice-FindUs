"use client";
// import { GoogleMap, Marker,useLoadScript } from "@react-google-maps/api";
import { Map, AdvancedMarker, APIProvider,Pin } from "@vis.gl/react-google-maps";
import React, { useState, useEffect, useCallback } from "react";
import { PiColumnsPlusLeft } from "react-icons/pi";

// const libraries = Object.freeze(["places"]);
const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "5px",
};
  

export default function Mapa({lat_value=undefined, long_value=undefined,long_name, lat_name,setFieldValue}) {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);

    // // Cargar el script de Google Maps
    // const { isLoaded, loadError } = useLoadScript({
    //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Usa variables de entorno para seguridad
    //     libraries,
    // });

    // Obtener la ubicación actual del usuario
    useEffect(() => {
        if (navigator.geolocation ) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });
            },
            () => alert("No se pudo obtener tu ubicación")
        );
        }

        if (lat_value != undefined && long_value != undefined) {
            console.log("ENTREE AL IF")
            console.log(lat)
            console.log(lng)
            setSelectedPosition({ lat: lat_value, lng: long_name });
        }
    }, []);

    // Manejador para seleccionar una ubicación en el mapa
    const onMapClick = useCallback((event) => {
        console.log('map clicked');
        console.log(event.detail);
        setSelectedPosition({
        lat: event.detail.latLng.lat,
        lng: event.detail.latLng.lng,
        });
        setFieldValue(lat_name, event.detail.latLng.lat);
        setFieldValue(long_name, event.detail.latLng.lng);
    }, []);

    // if (loadError) return <p>Error al cargar el mapa</p>;
    // if (!isLoaded) return <p>Cargando mapa...</p>;

    return(
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <div style={{ height: "40vh", width: "100%" }}>
                <Map
                    style={containerStyle}
                    defaultCenter={currentPosition || { lat: 0, lng: 0 }}
                    defaultZoom={14}
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
                    onClick={onMapClick}
                    onCameraChanged={ (ev) =>
                        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                      }
                    >
                    {currentPosition && 
                        <AdvancedMarker position={currentPosition} >
                            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                        </AdvancedMarker>}
                    {selectedPosition && 
                        <AdvancedMarker position={selectedPosition} >
                            <Pin background={'#5becd2'} glyphColor={'#000'} borderColor={'#000'} />
                        </AdvancedMarker>
                    }
                </Map>
        
                {selectedPosition && (
                <div style={{ position: "fixed", bottom: 10, left: 10, background: "#fff", padding: "10px" }}>
                    <p>Coordenadas seleccionadas:</p>
                    <p>Latitud: {selectedPosition.lat}</p>
                    <p>Longitud: {selectedPosition.lng}</p>
                </div>
                )}`
            </div>
        </APIProvider>
    )
}