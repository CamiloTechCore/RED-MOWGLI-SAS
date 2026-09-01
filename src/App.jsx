import React from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import TransitionImage from './components/TransitionImage';
import ThankYouCard from './components/ThankYouCard';
import SurveyForm from './components/SurveyForm';

export default function App() {
  return (
    <div className="relative min-h-screen bg-customFondo overflow-x-hidden flex flex-col justify-between">
      <BackgroundCanvas />
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-md border-b border-sombreado py-4 px-6 text-center shadow-sm">
        <h1 className="font-titulo text-titulo text-lg sm:text-2xl tracking-wide">
          RED MOWGLI SAS
        </h1>
      </header>
      <main className="relative z-10 max-w-xl mx-auto px-4 py-8 space-y-12 w-full">
        <section><TransitionImage /></section>
        <section><ThankYouCard /></section>
        <section><SurveyForm /></section>
      </main>
      <footer className="relative z-10 py-6 text-center text-xs text-textoNormal/70">
        © 2026 - Todos los derechos reservados solo para nosotros dos.
      </footer>
    </div>
  );
}