import React from 'react';

export default function ThankYouCard() {
  return (
    <section className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-sombreado">
      <h2 className="font-titulo text-titulo text-xl sm:text-2xl mb-4 text-center">
        Carta para la mejor Jefe 🫀
      </h2>
      <div className="space-y-4 text-textoNormal text-sm sm:text-base leading-relaxed">
        <p className="drop-cap">
          Mira que tu eres una persona que no cree en la relatividad del tiempo y en lo que los desconocidos pueden llegar a aportar en tu vida, no te conozco del todo pero quiero estar , espero poder estar en tu vida, para pagarte con amor y locura jajaja quiza sea bueno para ti. 
        </p>
        <p className="drop-cap">
          Reconozco que soy una persona sentimental , dulce en su forma de querer y que te coquetea todo el tiempo y siento que eso te hace mucho bien que loco no , en fin busco estar presente en tu vida , no venderte humo y poder hacer parte de esta empresa que espero no se muera y que pueda crecer y que tu seas la mejor jefa del mundo y que yo pueda estar a tu lado para apoyarte en todo lo que necesites.
        </p>
      </div>
    </section>
  );
}