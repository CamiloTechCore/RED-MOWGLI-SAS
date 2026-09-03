import React from 'react';

export default function Navbar({ currentTab, setCurrentTab }) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/20 backdrop-blur-md border-b border-white/30 shadow-lg transition-all duration-300">
      <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="font-titulo text-titulo text-lg sm:text-xl tracking-wide drop-shadow-md">
          RED MOWGLI SAS
        </h1>
        <div className="flex space-x-2 sm:space-x-4">
          <button 
            onClick={() => setCurrentTab('inicio')}
            className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${currentTab === 'inicio' ? 'bg-titulo text-white shadow-md' : 'text-textoNormal hover:bg-white/30'}`}
          >
            Inicio 🧠
          </button>
          <button 
            onClick={() => setCurrentTab('blog')}
            className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${currentTab === 'blog' ? 'bg-titulo text-white shadow-md' : 'text-textoNormal hover:bg-white/30'}`}
          >
            Blog 🫀
          </button>
          <button 
            onClick={() => setCurrentTab('galeria')}
            className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${currentTab === 'galeria' ? 'bg-titulo text-white shadow-md' : 'text-textoNormal hover:bg-white/30'}`}
          >
            Galería 🫁
          </button>
        </div>
      </div>
    </nav>
  );
}