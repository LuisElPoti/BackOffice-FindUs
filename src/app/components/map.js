"use client";
import { Map, AdvancedMarker, APIProvider, Pin } from "@vis.gl/react-google-maps";
import React, { useState, useEffect, useCallback } from "react";

const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "5px",
};

export default function Mapa({ lat_value = undefined, long_value = undefined, long_name, lat_name, setFieldValue, initialPosition,
    initialZoom,
    onPositionChange,}) {

    const [currentPosition, setCurrentPosition] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 }); // Centro del mapa por defecto
    const [mapZoom, setMapZoom] = useState(14); // Zoom inicial del mapa

    // Obtener la ubicación actual del usuario
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const currentPos = { lat: latitude, lng: longitude };
                    setCurrentPosition(currentPos);
                    
                    // Si no hay posición seleccionada y no hay centro predefinido, centra el mapa en la ubicación actual del usuario
                    if (!selectedPosition && lat_value === undefined && long_value === undefined) {
                        setMapCenter(currentPos);
                    }
                },
                () => alert("No se pudo obtener tu ubicación")
            );
        }

        // Si se proporcionan coordenadas externas, úsalas como posición seleccionada
        if (lat_value !== undefined && long_value !== undefined) {
            const providedPos = { lat: parseFloat(lat_value), lng: parseFloat(long_value) };
            setSelectedPosition(providedPos);
            setMapCenter(providedPos); // Centra el mapa en la ubicación proporcionada
        }
    }, [lat_value, long_value]);

    // Manejador para seleccionar una ubicación en el mapa
    const onMapClick = useCallback((event) => {
        const lat = event.detail.latLng.lat;
        const lng = event.detail.latLng.lng;
        const newPosition = { lat, lng };

        setSelectedPosition(newPosition);
        setFieldValue(lat_name, lat);
        setFieldValue(long_name, lng);
        
        // Centra el mapa y ajusta el zoom al seleccionar una ubicación
        // setMapCenter(newPosition);
        // setMapZoom(16); // Ajuste del zoom al seleccionar una ubicación

        // if (onPositionChange) {
        //     onPositionChange(newPosition);
        // }

    }, [lat_name, long_name, setFieldValue, onPositionChange]);

    // Manejador para cambios en la cámara (centro/zoom)
    const onCameraChanged = useCallback((ev) => {
        setMapCenter(ev.detail.center);
        setMapZoom(ev.detail.zoom);
    }, []);

    // // Sincorinizar la posicion y el zoom del mapa con el estado
    // useEffect(() => {
    //     setMapCenter(initialPosition || { lat: 0, lng: 0 });
    //     setMapZoom(initialZoom || 14);
    // }, [initialPosition, initialZoom]);

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <div style={{ height: "40vh", width: "100%" }}>
                <Map
                    style={containerStyle}
                    center={mapCenter} // Mantiene el centro del mapa en el estado
                    zoom={mapZoom} // Mantiene el zoom en el estado
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
                    onClick={onMapClick}
                    onCameraChanged={onCameraChanged}
                >
                    {currentPosition && (
                        <AdvancedMarker position={currentPosition}>
                            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                        </AdvancedMarker>
                    )}
                    {selectedPosition && (
                        <AdvancedMarker position={selectedPosition}>
                            <Pin background={'#5becd2'} glyphColor={'#000'} borderColor={'#000'} />
                        </AdvancedMarker>
                    )}
                </Map>

                {selectedPosition && (
                    <div style={{ position: "fixed", bottom: 10, left: 10, background: "#fff", padding: "10px" }}>
                        <p>Coordenadas seleccionadas:</p>
                        <p>Latitud: {selectedPosition.lat}</p>
                        <p>Longitud: {selectedPosition.lng}</p>
                    </div>
                )}
            </div>
        </APIProvider>
    );
}
