import { grafoRecomendacao } from './grafoRecomendacao.js';
import { HumanMessage } from '@langchain/core/messages';

const resultado = await grafoRecomendacao.invoke(
    {
        usuarioId: 'usuario_001',
        pergunta: 'Pode me recomendar mais músicas?',
        messages: [
        new HumanMessage('Pode me recomendar mais músicas?')
        ]
    },
    {
        configurable: {
            thread_id: 'conversa_musical_004'
        }
    }
);

const estadoSalvo = await grafoRecomendacao.getState({
    configurable: {
        thread_id: 'conversa_musical_003'
    }
});

console.log('\nEstado recuperado do PostgreSQL:');
console.log(estadoSalvo.values);

console.log('\nPreferências extraídas:');
console.log(resultado.preferenciasExtraidas);

console.log('\nPreferências recuperadas:');
console.log(resultado.preferencias);

console.log('\nRecomendação gerada:\n');
console.log(resultado.resposta);

console.log('\nHistórico de mensagens:');
console.log(resultado.messages);
