"use client";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import MyTable from "../components/tablePublicaciones";
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa'; // Import icons for edit, check, and cancel

export default function Publicaciones() {
    const [expandedSection, setExpandedSection] = useState(null);
    const [formFilled, setFormFilled] = useState({
        personalInfo: false,
        disappearanceDetails: false,
        documentUpload: false,
    });

    const [selectedPerson, setSelectedPerson] = useState(null); // State to hold the selected person info
    const [isEditing, setIsEditing] = useState({}); // To track editable state for each field

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const handleInputChange = (section) => {
        setFormFilled((prevState) => ({
            ...prevState,
            [section]: true,
        }));
    };

    const handleRowClick = (personData) => {
        setSelectedPerson(personData); // Set the clicked person's data
    };

    const closePopup = () => {
        setSelectedPerson(null); // Clear the popup when closed
    };

    const handleEditToggle = (field) => {
        setIsEditing((prevState) => ({
            ...prevState,
            [field]: !prevState[field], // Toggle the edit mode for the field
        }));
    };

    const handleFieldChange = (field, value) => {
        setSelectedPerson((prevState) => ({
            ...prevState,
            [field]: value, // Update the selected person's data
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
                        borderRadius: '12px',
                        maxWidth: '700px', // Wider and more modern look
                        width: '90%', // Responsive
                        backgroundColor: '#fff',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)', // Stronger shadow for elevation
                    }}
                >
                    <div className="p-6 bg-white rounded-md">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Crear publicación de persona desaparecida</h2>

                        <form className="space-y-8">
                            {/* Información Personal */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-700">Información personal</h3>
                                    <FaEdit className="text-gray-500 cursor-pointer hover:text-blue-500 transition-colors duration-200" />
                                </div>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-200"
                                    placeholder="Nombre completo"
                                />
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-200"
                                    placeholder="Documento de identidad"
                                />
                                <input
                                    type="date"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-200"
                                    placeholder="Fecha de nacimiento"
                                />
                            </div>

                            {/* Detalles de la desaparición */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-700">Detalles de la desaparición</h3>
                                    <FaEdit className="text-gray-500 cursor-pointer hover:text-blue-500 transition-colors duration-200" />
                                </div>
                                <textarea
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-200"
                                    rows="4"
                                    placeholder="Descripción física"
                                ></textarea>
                                <textarea
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-200"
                                    rows="2"
                                    placeholder="Último avistamiento"
                                ></textarea>
                            </div>

                            {/* Carga de documentos */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-700">Carga de documentos</h3>
                                    <FaEdit className="text-gray-500 cursor-pointer hover:text-blue-500 transition-colors duration-200" />
                                </div>
                                <input
                                    type="file"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-200"
                                />
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    type="button"
                                    className="text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 font-medium transition-colors duration-200"
                                >
                                    Publicar
                                </button>
                            </div>
                        </form>
                    </div>
                </Popup>
            </div>

            <div className="flex-grow relative">
                {/* Pass the handleRowClick to MyTable to trigger the popup */}
                <MyTable onRowClick={handleRowClick} />
            </div>

            {/* Popup to show when a row is clicked */}
            {selectedPerson && (
                <Popup
                    open={true}
                    closeOnDocumentClick
                    onClose={closePopup}
                    contentStyle={{
                        padding: '20px',
                        borderRadius: '12px',
                        width: '700px', // Wider for improved UI
                        maxWidth: '95%',
                        backgroundColor: '#f9f9f9',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)', // Enhanced shadow for depth
                    }}
                >
                    <div className="popup-content space-y-6">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Información de la persona</h2>
                            <button onClick={closePopup} className="text-gray-500 hover:text-red-500 transition-colors duration-200">
                                <FaTimes />
                            </button>
                        </div>

                        <img
                            src={selectedPerson.image || "/assets/persona-desaparecida.jpeg"} // Use the local fallback image
                            alt="Desaparecido"
                            className="w-full h-auto mb-4 rounded-lg shadow-sm"
                        />

                        {/* Editable Fields */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <strong className="text-gray-700">Nombre completo:</strong> 
                                    {isEditing.nombre ? (
                                        <input
                                            type="text"
                                            value={selectedPerson.nombre}
                                            onChange={(e) => handleFieldChange('nombre', e.target.value)}
                                            className="ml-4 border-b border-gray-400 focus:border-blue-500 transition-all duration-200"
                                        />
                                    ) : (
                                        <span className="ml-4">{selectedPerson.nombre}</span>
                                    )}
                                </div>
                                <FaEdit
                                    className="text-gray-500 cursor-pointer hover:text-blue-500 transition-colors duration-200"
                                    onClick={() => handleEditToggle('nombre')}
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <strong className="text-gray-700">Fecha de desaparición:</strong> 
                                    {isEditing.fechaDesaparicion ? (
                                        <input
                                            type="text"
                                            value={selectedPerson.fechaDesaparicion}
                                            onChange={(e) => handleFieldChange('fechaDesaparicion', e.target.value)}
                                            className="ml-4 border-b border-gray-400 focus:border-blue-500 transition-all duration-200"
                                        />
                                    ) : (
                                        <span className="ml-4">{selectedPerson.fechaDesaparicion}</span>
                                    )}
                                </div>
                                <FaEdit
                                    className="text-gray-500 cursor-pointer hover:text-blue-500 transition-colors duration-200"
                                    onClick={() => handleEditToggle('fechaDesaparicion')}
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <strong className="text-gray-700">Último avistamiento:</strong> 
                                    {isEditing.ultimoAvistamiento ? (
                                        <input
                                            type="text"
                                            value={selectedPerson.ultimoAvistamiento || ''}
                                            onChange={(e) => handleFieldChange('ultimoAvistamiento', e.target.value)}
                                            className="ml-4 border-b border-gray-400 focus:border-blue-500 transition-all duration-200"
                                        />
                                    ) : (
                                        <span className="ml-4">{selectedPerson.ultimoAvistamiento || 'N/A'}</span>
                                    )}
                                </div>
                                <FaEdit
                                    className="text-gray-500 cursor-pointer hover:text-blue-500 transition-colors duration-200"
                                    onClick={() => handleEditToggle('ultimoAvistamiento')}
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <strong className="text-gray-700">Aspeto físico:</strong> 
                                    {isEditing.aspectoFisico ? (
                                        <input
                                            type="text"
                                            value={selectedPerson.aspectoFisico || ''}
                                            onChange={(e) => handleFieldChange('aspectoFisico', e.target.value)}
                                            className="ml-4 border-b border-gray-400 focus:border-blue-500 transition-all duration-200"
                                        />
                                    ) : (
                                        <span className="ml-4">{selectedPerson.aspectoFisico || 'N/A'}</span>
                                    )}
                                </div>
                                <FaEdit
                                    className="text-gray-500 cursor-pointer hover:text-blue-500 transition-colors duration-200"
                                    onClick={() => handleEditToggle('aspectoFisico')}
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <strong className="text-gray-700">Parentesco:</strong> 
                                    {isEditing.parentesco ? (
                                        <input
                                            type="text"
                                            value={selectedPerson.parentesco || ''}
                                            onChange={(e) => handleFieldChange('parentesco', e.target.value)}
                                            className="ml-4 border-b border-gray-400 focus:border-blue-500 transition-all duration-200"
                                        />
                                    ) : (
                                        <span className="ml-4">{selectedPerson.parentesco || 'N/A'}</span>
                                    )}
                                </div>
                                <FaEdit
                                    className="text-gray-500 cursor-pointer hover:text-blue-500 transition-colors duration-200"
                                    onClick={() => handleEditToggle('parentesco')}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closePopup}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md shadow-sm font-medium transition-colors duration-200"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </Popup>
            )}
        </div>
    );
}
