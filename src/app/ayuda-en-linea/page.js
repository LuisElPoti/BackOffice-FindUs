"use client"

import React from 'react'
import { useState } from "react";

export default function Page() {

  const faqs = [
    {
      question: "¿Qué es FindUs?",
      answer:
        "FindUs es una aplicación móvil diseñada para ayudar en la búsqueda y localización de personas desaparecidas mediante reportes, alertas y coordinación con sistemas de emergencia.",
    },
    {
      question: "¿Cómo puedo descargar la aplicación?",
      answer:
        "Puedes descargar FindUs desde la App Store para dispositivos iOS o desde Google Play para dispositivos Android.",
    },
    {
      question: "¿La aplicación tiene algún costo?",
      answer: "No, FindUs es completamente gratuita para todos los usuarios.",
    },
    {
      question: "¿Cómo puedo registrarme en la aplicación?",
      answer:
        "Para registrarte, abre la aplicación, selecciona 'Crear cuenta' y completa el formulario con tu correo electrónico, nombre y una contraseña segura.",
    },
    {
      question: "¿Qué hago si olvido mi contraseña?",
      answer:
        "Selecciona 'Olvidé mi contraseña' en la pantalla de inicio de sesión y sigue las instrucciones para restablecerla mediante tu correo electrónico registrado.",
    },
    {
      question: "¿Cómo reporto la desaparición de una persona?",
      answer:
        "En el menú principal, selecciona 'Reportar desaparición', completa los campos requeridos (nombre, descripción física, última ubicación conocida, etc.) y adjunta una fotografía reciente.",
    },
    {
      question: "¿Puedo reportar un avistamiento sin registrarme?",
      answer:
        "No, para garantizar la autenticidad de los reportes, es necesario estar registrado en la aplicación.",
    },
    {
      question: "¿Cómo recibo notificaciones sobre nuevos casos o avistamientos?",
      answer:
        "Activa las notificaciones en tu dispositivo y configura tus preferencias en la sección de 'Ajustes' de la aplicación.",
    },
    {
      question: "¿La aplicación utiliza mi ubicación en tiempo real?",
      answer:
        "Sí, FindUs utiliza tu ubicación para enviar alertas relacionadas con casos cercanos a tu área, pero siempre respetando tu privacidad.",
    },
    {
      question: "¿Qué hago si encuentro un error en la aplicación?",
      answer:
        "Puedes escribirnos a nuestro correo “findus-support@findus-online.com”.",
    },
    {
      question: "¿Qué tipos de roles existen en la aplicación?",
      answer:
        "Los roles principales son:\n• Usuario: Reporta desapariciones y avistamientos.\n• Moderador: Modera las interacciones y todo lo que pasa en la aplicación.\n• Administrador: Gestiona los usuarios de la aplicación y todo lo relacionado con la plataforma.\n• Servicios de Emergencia: Responsables de visualizar los casos y darles seguimiento en las instituciones correspondientes.",
    },
    {
      question: "¿Puedo modificar mi perfil después de registrarme?",
      answer:
        "Sí, en el menú principal selecciona 'Perfil' para actualizar tu información personal.",
    },
    {
      question: "¿Es posible eliminar un reporte de desaparición?",
      answer:
        "Puedes cerrar los reportes de emergencia para que no aparezcan a los usuarios.",
    },
    {
      question: "¿Cómo se garantiza la seguridad de mis datos personales?",
      answer:
        "FindUs utiliza encriptación de extremo a extremo para proteger tus datos y cumple con todas las regulaciones de privacidad aplicables.",
    },
    {
      question: "¿Puedo usar la aplicación sin conexión a internet?",
      answer:
        "No, es necesario contar con una conexión a internet para acceder a todas las funcionalidades de FindUs.",
    },
    {
      question: "¿Qué sucede si reporto información falsa?",
      answer:
        "El reporte de información falsa puede conllevar a la suspensión de tu cuenta, según nuestras políticas de uso. Nuestros moderadores trabajan para verificar las informaciones de los casos, así que recomendamos evitar informaciones falsas, ya que estaría quitando espacio a otros reportes que podrían salvar vidas.",
    },
    {
      question: "¿Cómo puedo contactar al soporte técnico?",
      answer:
        "Puedes contactar al soporte técnico mediante el correo electrónico findus-support@findus-online.com o a través de la sección de 'Soporte' en la aplicación.",
    },
    {
      question: "¿La aplicación tiene tutoriales para nuevos usuarios?",
      answer:
        "Sí, FindUs incluye tutoriales interactivos disponibles en la sección de 'Ayuda' del menú principal.",
    },
    {
      question: "¿Cómo puedo reportar un caso cerrado?",
      answer:
        "En la sección del caso, selecciona 'Marcar como cerrado' y proporciona detalles sobre la resolución del caso.",
    },
    {
      question: "¿La aplicación funciona en tablets o solo en teléfonos móviles?",
      answer: "FindUs es compatible con tablets y teléfonos móviles.",
    },
    {
      question: "¿Cuántos usuarios pueden usar la aplicación al mismo tiempo?",
      answer:
        "El sistema está diseñado para soportar hasta 100,000 usuarios simultáneos.",
    },
    {
      question: "¿Qué medidas se toman contra el mal uso de la aplicación?",
      answer:
        "Los usuarios que violen nuestras políticas serán suspendidos o bloqueados tras una revisión detallada.",
    },
    {
      question: "¿La aplicación incluye contenido educativo?",
      answer:
        "Sí, FindUs ofrece videos educativos sobre cómo manejar casos de desaparición y organizar búsquedas efectivas.",
    },
    {
      question: "¿Cuál es el correo de soporte en línea?",
      answer: "El correo de ayuda en línea es: findus-support@findus-online.com.",
    },
  ];
  

  return (
    <div className="flex flex-col h-screen bg-colorResumen overflow-auto">
      <div className="h-[55%] bg-greenBackground items-center relative">
        <div className="flex items-center ml-8 mt-[2vh]">
            <img
                src="/assets/Logo.svg"
                className="w-16 align-middle"
                alt="Logo FindUs"
            />
            <h2 className="text-3xl text-letterColor font-bold ml-7 my-auto">Ayuda en Línea</h2>
        </div>
        <h3 className="text-xl text-letterColor font-bold ml-12 text-center mt-[calc(1.5vh)]">En esta página encontrarás toda la ayuda necesaria de nuestra aplicación</h3>
        <div className="flex flex-row items-center justify-center align-middle space-x-[6vw] mb-3 mt-3 my-auto">
          <img
              src="/assets/FAQS.webp"
              className="w-[30%] my-auto rounded-md"
              alt="Ilustración de Ayuda"
          />
          <img
              src="/assets/preguntasfrecuentes2.jpeg"
              className="w-[calc(30%)] my-auto rounded-md"
              
              alt="Ilustración de Ayuda"
          />
        </div>
        </div>
        <div className="bg-white px-32 py-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Preguntas Frecuentes</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} numero_pregunta={index+1} />
            ))}
          </div>
        </div>
      </div>
  )
}


const FAQItem = ({ question, answer, numero_pregunta }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`bg-gray-100 rounded-lg shadow-sm transition-all duration-300 ${
        isOpen ? "shadow-lg" : ""
      }`}
    >
      <button
        className="w-full flex justify-between items-center p-4 text-lg font-semibold text-green-900 bg-gray-200 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {numero_pregunta}. {question}
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="p-4 mt-2 bg-white rounded-lg shadow-md text-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
};