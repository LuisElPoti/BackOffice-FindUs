"use client";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import MyTable from "../components/tablePublicaciones";

export default function Publicaciones() {
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

                <Popup
                    trigger={
                        <button className="text-white font-medium bg-blueBoton hover:bg-blueOscuro rounded-lg p-2 flex items-center justify-center h-[40px] transition-colors duration-300">
                            Crear publicación +
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
                        <h2 className="text-2xl text-customBlue font-bold mb-4">Crear publicación de persona desaparecida</h2>

                        <form>
                            {/* Información Personal */}
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
                                        Información personal de la persona desaparecida
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
                                            <label className="block text-sm font-medium mb-2" htmlFor="name">Nombre completo:</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={() => handleInputChange('personalInfo')}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="idNumber">Documento de identidad:</label>
                                            <input
                                                type="text"
                                                id="idNumber"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={() => handleInputChange('personalInfo')}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="birthDate">Fecha de nacimiento:</label>
                                            <input
                                                type="date"
                                                id="birthDate"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={() => handleInputChange('personalInfo')}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="disappearanceDate">Fecha de desaparición:</label>
                                            <input
                                                type="date"
                                                id="disappearanceDate"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={() => handleInputChange('personalInfo')}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Detalles de la desaparición */}
                            <div className="mb-4">
                                <button
                                    type="button"
                                    className="w-full text-left px-4 py-2 bg-transparent text-customBlue font-semibold rounded-lg focus:outline-none flex justify-between items-center border-b border-gray-300"
                                    onClick={() => toggleSection('disappearanceDetails')}
                                >
                                    <span>
                                        <img
                                            src={formFilled.disappearanceDetails ? '/assets/on.png' : '/assets/2.png'}
                                            alt="icon"
                                            className="inline-block w-6 h-6 mr-2"
                                        />
                                        Detalles de la desaparición
                                    </span>
                                    <img
                                        src={expandedSection === 'disappearanceDetails' ? '/assets/chevron-up.png' : '/assets/chevron-down.png'}
                                        alt="chevron"
                                        className="w-5 h-3"
                                    />
                                </button>
                                {expandedSection === 'disappearanceDetails' && (
                                    <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="description">Descripción física:</label>
                                            <textarea
                                                id="description"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                rows="4"
                                                onChange={() => handleInputChange('disappearanceDetails')}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="lastSight">Detalles del último avistamiento:</label>
                                            <textarea
                                                id="lastSight"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                rows="4"
                                                onChange={() => handleInputChange('disappearanceDetails')}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Carga de documentos */}
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
                                        Carga de documentos
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
                                            <label className="block text-sm font-medium mb-2" htmlFor="photoUpload">Fotos del desaparecido:</label>
                                            <input
                                                type="file"
                                                id="photoUpload"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                multiple
                                                onChange={() => handleInputChange('documentUpload')}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="policeReport">Documento de identidad:</label>
                                            <input
                                                type="file"
                                                id="policeReport"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={() => handleInputChange('documentUpload')}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2" htmlFor="idDocument">Reporte de la policía:</label>
                                            <input
                                                type="file"
                                                id="idDocument"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={() => handleInputChange('documentUpload')}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button className="text-white bg-blueBoton hover:bg-blueOscuro rounded-lg p-2">
                                    Publicar
                                </button>
                            </div>
                        </form>
                    </div>
                </Popup>
            </div>

            <div className="flex-grow relative">
                <MyTable />
            </div>
        </div>
    );
}
