import React, { useState, useEffect } from 'react';

export default function TransitionImage() {
  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl bg-sombreado/30 backdrop-blur-sm border border-sombreado">
      <img
        src="/assets/Imagen1.jpg"
        alt="Transición 1"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
          showFirst ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <img
        src="/assets/Imagen2.jpg"
        alt="Transición 2"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
          !showFirst ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}