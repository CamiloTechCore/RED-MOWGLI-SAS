import React from 'react';

export default function ThankYouCard() {
  return (
    <section className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-sombreado">
      <h2 className="font-titulo text-titulo text-xl sm:text-2xl mb-4 text-center">
        Dia 16 navio
      </h2>
      <div className="space-y-4 text-textoNormal text-sm sm:text-base leading-relaxed">
        <p className="drop-cap">
           Resulta bastante curioso cómo las cosas pueden llegar a evolucionar a tal punto que termines a punto de tomar un barco que quizá no dé marcha atrás. Y mientras estás viendo su majestuosidad en el muelle y olvidando a la persona en medio del camino, al vendedor de la calle, al perro perdido, al tipo que prepara el pescado y se cree galán, al borracho en el andén y el olor a gasolina en el aire, solo puedes pensar en qué es todo lo que puede salir mal en medio del viaje. Titanic nos dejó traumados a todos, pero creo que el miedo más grande es llegar a enamorarse en un lugar del cual no puedes escapar y donde, si las cosas salen mal, posiblemente todos puedan llegar a morir.


        </p>
        <p className="drop-cap">
          Nunca me consideré un marino experto; le tengo miedo a la inmensidad de algo que no puedo percibir, ni ver su profundidad, ya que mi mente inferente busca estar atenta a todo y no para. Sin embargo, al ver el barco y al verte a ti... apago mi cabeza y enciendo el corazón.
        </p>
      </div>
    </section>
  );
}