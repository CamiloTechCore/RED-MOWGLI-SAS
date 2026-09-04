import React, { useState } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import Navbar from './components/Navbar';
import TransitionImage from './components/TransitionImage';
import ThankYouCard from './components/ThankYouCard';
import SurveyForm from './components/SurveyForm';
import Blog from './components/Blog';
import Gallery from './components/Gallery';

export default function App() {
  // Estado para controlar qué sección está visible.
  const [currentTab, setCurrentTab] = useState('inicio');

  return (
    <div className="relative min-h-screen bg-customFondo overflow-x-hidden flex flex-col justify-between">
      <BackgroundCanvas />
      
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* 
        Cambio clave: Cambiamos 'max-w-3xl' por 'max-w-full' y quitamos el 'px-4' global. 
        Esto permite que el contenedor ocupe el 100% de la pantalla para el Kanban.
      */}
      <main className="relative z-10 w-full max-w-full mx-auto py-8 flex-grow">
        
        {/* Vista de Inicio: Mantiene su propio límite (max-w-xl) y centrado (mx-auto) */}
        {currentTab === 'inicio' && (
          <div className="space-y-12 max-w-xl mx-auto px-4">
            <section><TransitionImage /></section>
            <section><ThankYouCard /></section>
            {/*<section><SurveyForm /></section>*/}
          </div>
        )}

        {/* Vista de Blog: Al no tener límites, ocupa toda la pantalla disponible */}
        {currentTab === 'blog' && (
          <section className=" w-full">
            <Blog />
          </section>
        )}

        {/* Vista de Galería: Mantiene su relleno lateral (px-4) para no pegar las fotos al borde */}
        {currentTab === 'galeria' && (
          <section className=" w-full">
            <Gallery />
          </section>
        )}
      </main>

      <footer className="relative z-10 py-6 text-center text-xs text-textoNormal/70">
        © 2026 - Todos los derechos reservados solo para nosotros dos.
      </footer>
    </div>
  );
}