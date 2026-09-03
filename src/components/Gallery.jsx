import React from 'react';

export default function Gallery() {
  // Lista de imágenes. Debes asegurarte de que estos archivos existan en public/assets/
  // Soporta .gif fluidos automáticamente gracias a la etiqueta img
  const images = [
    'Imagen1.jpg', // Ajusta la extensión según tus archivos reales
    'Imagen2.jpg',
    'Imagen3.jpg',
    'Imagen4.jpg',
    'Imagen5.jpg',
    'Imagen6.jpg',
    'Imagen7.jpg',
    'Imagen8.jpg',
    'Imagen9.jpg',
    'Imagen10.jpg',
    'Imagen11.jpg',
    'moneda1millon.gif',
  ];

  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-4">
      {/* Contenedor tipo cristal */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-3xl shadow-xl">
        
        {/* Cuadrícula CSS estilo Instagram (3 columnas) */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          {images.map((imgName, index) => (
            <div 
              key={index} 
              className="aspect-square bg-white/30 overflow-hidden relative group cursor-pointer"
            >
              <img 
                src={`/assets/${imgName}`} 
                alt={`Galería ${index}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                // En caso de que la imagen no exista aún, muestra un color sólido
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300?text=Foto'; }}
              />
              {/* Overlay de cristal al hacer hover (opcional) */}
              <div className="absolute inset-0 bg-titulo/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}