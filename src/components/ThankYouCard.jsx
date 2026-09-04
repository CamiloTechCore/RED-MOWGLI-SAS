import React from 'react';

export default function ThankYouCard() {
  return (
    <section className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-sombreado">
      <h2 className="font-titulo text-titulo text-xl sm:text-2xl mb-4 text-center">
        Dia 10 planos de roma 🏛️
      </h2>
      <div className="space-y-4 text-textoNormal text-sm sm:text-base leading-relaxed">
        <p className="drop-cap">
            Y resulta que, entre tanta penumbra, logramos establecer bases importantes donde esperamos que nazca el monumento de una ciudad, que cada palabra y cada parte de nosotros forja como si de una novela se tratara. Ahora bien, cómo termine el asunto nadie lo sabe; sin embargo, espero ser Maquiavelo en esta historia, porque he encontrado una arquitecta de los sueños que no puedo tener, pero que ella estructura con toda la simetría que las maravillas puedan tener, para con ello lograr pertenecer a nuestro propio lugar.
        </p>
        <p className="drop-cap">
          Todos los caminos conducen a Roma, y quiero que nuestro camino siempre busque su destino en un lugar que nos dé la seguridad que la realidad nos pueda quitar.
        </p>
      </div>
    </section>
  );
}