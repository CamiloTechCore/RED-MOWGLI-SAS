import React, { useState } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import Navbar from './components/Navbar';
import TransitionImage from './components/TransitionImage';
import ThankYouCard from './components/ThankYouCard';
import SurveyForm from './components/SurveyForm';
import Blog from './components/Blog';
import Gallery from './components/Gallery';

export default function App() {
  // Estado para controlar qué sección está visible. Inicia en 'inicio'.
  const [currentTab, setCurrentTab] = useState('inicio');

  return (
    <div className="relative min-h-screen bg-customFondo overflow-x-hidden flex flex-col justify-between">
      <BackgroundCanvas />
      
      {/* Barra de navegación de cristal que reemplaza al <header> estático */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="relative z-10 w-full max-w-3xl mx-auto px-4 py-8 flex-grow">
        
        {/* Renderiza el Inicio */}
        {currentTab === 'inicio' && (
          <div className="space-y-12 max-w-xl mx-auto">
            <section><TransitionImage /></section>
            <section><ThankYouCard /></section>
        {/*<section><SurveyForm /></section>*/}
          </div>
        )}

        {/* Renderiza el Blog */}
        {currentTab === 'blog' && (
          <section>
            <Blog />
          </section>
        )}

        {/* Renderiza la Galería */}
        {currentTab === 'galeria' && (
          <section>
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