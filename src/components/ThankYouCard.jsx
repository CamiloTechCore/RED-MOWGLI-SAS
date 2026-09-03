import React from 'react';

export default function ThankYouCard() {
  return (
    <section className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-sombreado">
      <h2 className="font-titulo text-titulo text-xl sm:text-2xl mb-4 text-center">
        Dia 9 en tu vida
      </h2>
      <div className="space-y-4 text-textoNormal text-sm sm:text-base leading-relaxed">
        <p className="drop-cap">
          Nueve días han pasado desde que comencé a pensar un montón de cosas contigo, sobre mí. Y al final dije: "¿por qué no?, ¿por qué no decirle todo y ya?". Pero, realmente, no quiero que te alejes de mí. A decir verdad, siento que he disfrutado estos días de una compañía que de verdad quiere estar aquí, que hemos construido de la nada, literalmente. Por ello te agradezco por todo.  
        </p>
        <p className="drop-cap">
          Jefa, eres la mejor. Créeme que me encantas y me encantaría que te quedaras para siempre, pero los humanos no somos eternos y todo acaba. Sin embargo, al menos por esta vida, agradezco a Dios tu presencia. 
        </p>
      </div>
    </section>
  );
}