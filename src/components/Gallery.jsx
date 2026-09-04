import React, { useState } from 'react';

export default function Gallery() {
  // Estado para controlar qué imagen está abierta en el modal
  const [selectedImage, setSelectedImage] = useState(null);

  // Lista de imágenes
  const images = [
    'Imagen1.jpg', 
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
    'Imagen12.jpg',
    'Imagen13.jpg',
    'moneda1millon.gif',
    'moneda5millones.gif'
  ];

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-4">
      {/* Contenedor tipo cristal */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-3xl shadow-xl">
        
        {/* Cuadrícula CSS estilo Instagram (3 columnas) */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          {images.map((imgName, index) => (
            <div 
              key={index} 
              // Agregamos el evento onClick para abrir la imagen
              onClick={() => setSelectedImage(imgName)}
              className="aspect-square bg-white/30 overflow-hidden relative group cursor-pointer"
            >
              <img 
                src={`/assets/${imgName}`} 
                alt={`Galería ${index}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300?text=Foto'; }}
              />
              {/* Overlay de cristal al hacer hover */}
              <div className="absolute inset-0 bg-titulo/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE IMAGEN EXPANDIDA */}
      {selectedImage && (
        <div 
          // Fondo oscuro difuminado (opaco) que ocupa toda la pantalla
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8 cursor-pointer"
          onClick={closeModal} // Al hacer clic en este fondo, se cierra
        >
          {/* Botón de cerrar opcional en la esquina superior */}
          <button 
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-titulo transition-colors drop-shadow-lg"
            onClick={closeModal}
          >
            &times;
          </button>

          <img 
            src={`/assets/${selectedImage}`} 
            alt="Imagen Expandida"
            // max-w-full y max-h-full evitan que la imagen se salga de la pantalla
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl cursor-default border border-white/20"
            // IMPORTANTE: Esto evita que el clic en la imagen cierre el modal
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
}