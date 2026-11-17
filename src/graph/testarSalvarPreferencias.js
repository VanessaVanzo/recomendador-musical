
import { salvarPreferencias } from './nodes/salvarPreferencias.js';

const resultado = await salvarPreferencias({
    usuarioId: 'usuario_001',

    preferenciasExtraidas: {
        genero: 'MPB, rock nacional',
        artistas: 'Legião Urbana',
        estilo: ''
    }
});

console.log('Resultado:', resultado);
