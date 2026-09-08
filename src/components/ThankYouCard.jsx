import React from 'react';

export default function ThankYouCard() {
  return (
    <section className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-sombreado">
      <h2 className="font-titulo text-titulo text-xl sm:text-2xl mb-4 text-center">
        Dia 14 un aire de nostalgia
      </h2>
      <div className="space-y-4 text-textoNormal text-sm sm:text-base leading-relaxed">
        <p className="drop-cap">
            A medida que se da la permanencia, se van segmentando las agendas de dos almas prometidas por lo que sus ilusiones buscan. Sin embargo, a la realidad le hace sentido que la permanencia requiera de algo físico; aun así, esta alma no ha dejado de estar presente desde ese 25 de agosto, cuando se dio la primera vista a un lugar que promete ser más que solo un lugar.
        </p>
        <p className="drop-cap">
          La vida funciona de esta manera, donde sientes que todo se va apagando. Sin embargo, es diferente cuando te das cuenta de que hay algo en tu vida que está encendido permanentemente, que está en ti y no ha dejado de estarlo. Creo que eso es a lo que se refería Homero cuando decía que estar enamorado era la forma más fácil de iniciar una guerra, y se necesita de algo tan simple que tenemos todos: la necesidad de estar amando permanentemente.
        </p>
      </div>
    </section>
  );
}