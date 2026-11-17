
import { extrairPreferencias } from './nodes/extrairPreferencias.js';

const resultado = await extrairPreferencias({
    pergunta: 'Gosto muito de MPB, rock nacional e Legião Urbana.'
});

console.log('Preferências identificadas:');
console.log(resultado.preferenciasExtraidas);
