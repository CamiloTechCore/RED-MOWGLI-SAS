import React, { useState } from 'react';

export default function SurveyForm() {
  const [selectedOption, setSelectedOption] = useState('Honey');
  const [customText, setCustomText] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const scriptURL = 'https://script.google.com/macros/s/AKfycby4Acnk3Ai089QYo8eBLLp-DOgkwCyhm4DXzENJbf8pKX-9y-HK29YgDP25IzzRslzYdw/exec'; 

  const handleSubmit = async (actionType) => {
    setLoading(true);
    setStatus('');

    const finalValue = selectedOption === 'Proponer uno' ? customText : selectedOption;
    const payload = {
      opcionSeleccionada: finalValue,
      tipoBoton: actionType,
      fecha: new Date().toISOString(),
    };

    try {
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setStatus('¡Datos enviados con éxito a la base de datos!');
      setCustomText('');
    } catch (error) {
      console.error('Error al enviar:', error);
      setStatus('Ocurrió un error al enviar los datos, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-sombreado">
      <h2 className="font-titulo text-titulo text-lg sm:text-xl mb-6 text-center">
        Jefe estos son los titulo que considero me dan presencia en tu vida 🫀
      </h2>

      <div className="space-y-4 mb-6">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input type="radio" name="surveyOption" value="Honey" checked={selectedOption === 'Honey'} onChange={(e) => setSelectedOption(e.target.value)} className="accent-titulo w-4 h-4" />
          <span className="text-textoNormal text-sm sm:text-base">Honey 🍯 (No es peligroso y me da cercania a tu alma)</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input type="radio" name="surveyOption" value="Ai" checked={selectedOption === 'Ai'} onChange={(e) => setSelectedOption(e.target.value)} className="accent-titulo w-4 h-4" />
          <span className="text-textoNormal text-sm sm:text-base">Ai 🫂 (El significado en japones puede ser peligroso pero tentador)</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input type="radio" name="surveyOption" value="Cielo" checked={selectedOption === 'Cielo'} onChange={(e) => setSelectedOption(e.target.value)} className="accent-titulo w-4 h-4" />
          <span className="text-textoNormal text-sm sm:text-base">Cielo ✨ (Me da tacto y creo que te encanta cuando lo hago)</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input type="radio" name="surveyOption" value="Proponer uno" checked={selectedOption === 'Proponer uno'} onChange={(e) => setSelectedOption(e.target.value)} className="accent-titulo w-4 h-4" />
          <span className="text-textoNormal text-sm sm:text-base">Proponer uno 🥺</span>
        </label>

        {selectedOption === 'Proponer uno' && (
          <div className="mt-2 pl-7">
            <input type="text" maxLength={20} placeholder="Máximo 20 caracteres" value={customText} onChange={(e) => setCustomText(e.target.value)} className="w-full p-2 border border-sombreado rounded-lg bg-white text-textoNormal text-sm focus:outline-none focus:ring-2 focus:ring-titulo" />
          </div>
        )}
        <br />
        <span className="text-textoNormal text-sm sm:text-base">Espero no te espantes, te quiero mucho</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
        <button onClick={() => handleSubmit('Sí - Opción 1')} disabled={loading} className="w-full sm:w-1/2 bg-titulo text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:opacity-90 transition-all text-center disabled:opacity-50">
          {loading ? 'Enviando...' : 'Sí'}
        </button>
        <button onClick={() => handleSubmit('Sí - Opción 2')} disabled={loading} className="w-full sm:w-1/2 bg-titulo text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:opacity-90 transition-all text-center disabled:opacity-50">
          {loading ? 'Enviando...' : 'Sí'}
        </button>
      </div>

      {status && <p className="mt-4 text-center text-xs sm:text-sm font-semibold text-titulo">{status}</p>}
    </section>
  );
}