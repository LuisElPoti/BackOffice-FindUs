"use client";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

export default function Material() {
    const [expandedSection, setExpandedSection] = useState(null);
    const [formFilled, setFormFilled] = useState({
        personalInfo: false,
        disappearanceDetails: false,
        documentUpload: false,
    });

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const handleInputChange = (section) => {
        setFormFilled((prevState) => ({
            ...prevState,
            [section]: true,
        }));
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-colorResumen">
            {/* Fondo superior con título */}
            <div className="h-[45%] bg-greenBackground relative">
                <h2 className="text-xl text-letterColor font-bold ml-12 mt-8">Material Educativo</h2>
            </div>

            {/* Botón y popup */}
            <div className="absolute top-8 right-8 flex items-center">
                <button className="text-white p-2 mr-4 flex items-center justify-center h-[40px]">
                    <img
                        src="/assets/buscar_button.png"
                        alt="Search"
                        className="w-[38px] h-[38px]"
                    />
                </button>

                <Popup
                    trigger={
                        <button className="text-white font-medium bg-blueBoton hover:bg-blueOscuro rounded-lg p-2 flex items-center justify-center h-[40px] transition-colors duration-300">
                            Crear material +
                        </button>
                    }
                    position="right center"
                    modal
                    closeOnDocumentClick
                    onClose={() => setExpandedSection(null)} 
                    contentStyle={{
                        padding: '0px',
                        borderRadius: '8px',
                    }}
                >
                    <div className="p-8 bg-blueBackground rounded-md">
                        <h2 className="text-2xl text-customBlue font-bold mb-4">Crear nuevo material educativo</h2>

                        <form>
                            {/* Información del material */}
                            <div className="mb-4">
                                <button
                                    type="button"
                                    className="w-full text-left px-4 py-2 font-semibold bg-transparent text-customBlue rounded-lg focus:outline-none flex justify-between items-center border-b border-gray-300"
                                    onClick={() => toggleSection('personalInfo')}
                                >
                                    <span>
                                        <img
                                            src={formFilled.personalInfo ? '/assets/on.png' : '/assets/1.png'}
                                            alt="icon"
                                            className="inline-block w-6 h-6 mr-2"
                                        />
                                        Información del material
                                    </span>
                                    <img
                                        src={expandedSection === 'personalInfo' ? '/assets/chevron-up.png' : '/assets/chevron-down.png'}
                                        alt="chevron"
                                        className="w-5 h-3"
                                    />
                                </button>
                                {expandedSection === 'personalInfo' && (
                                    <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="name">Nombre del material</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={() => handleInputChange('personalInfo')}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="description">Descripción del recurso</label>
                                            <textarea
                                                id="description"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                rows="4"
                                                onChange={() => handleInputChange('personalInfo')}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Carga de archivos */}
                            <div className="mb-4">
                                <button
                                    type="button"
                                    className="w-full text-left px-4 py-2 bg-transparent font-semibold text-customBlue rounded-lg focus:outline-none flex justify-between items-center border-b border-gray-300"
                                    onClick={() => toggleSection('documentUpload')}
                                >
                                    <span>
                                        <img
                                            src={formFilled.documentUpload ? '/assets/on.png' : '/assets/3.png'}
                                            alt="icon"
                                            className="inline-block w-6 h-6 mr-2"
                                        />
                                        Carga de archivos
                                    </span>
                                    <img
                                        src={expandedSection === 'documentUpload' ? '/assets/chevron-up.png' : '/assets/chevron-down.png'}
                                        alt="chevron"
                                        className="w-5 h-3"
                                    />
                                </button>
                                {expandedSection === 'documentUpload' && (
                                    <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="fileUpload">Archivo del material</label>
                                            <input
                                                type="file"
                                                id="fileUpload"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                multiple
                                                onChange={() => handleInputChange('documentUpload')}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-blueBoton hover:bg-blueOscuro text-white font-bold py-2 px-4 rounded"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </Popup>
            </div>

            <div className="relative z-10 bg-grayBackground -mt-36 rounded-tl-3xl rounded-tr-3xl p-10 overflow-y-scroll">

            </div>
        </div>
    );
}
