
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { grafoRecomendacao } from './graph/grafoRecomendacao.js';
import { HumanMessage } from '@langchain/core/messages';

// Cria a interface para receber perguntas pelo terminal
const terminal = createInterface({
    input: stdin,
    output: stdout
});

// Identifica o usuário e a conversa
const usuarioId = 'usuario_001';
const threadId = 'conversa_musical_001';

// Recebe a pergunta do usuário
const pergunta = await terminal.question('\nO que você gostaria de ouvir hoje? ');

// Executa o grafo
const resultado = await grafoRecomendacao.invoke(
    {
        usuarioId,
        pergunta,
        messages: [
            new HumanMessage(pergunta)
        ]
    },
    {
        configurable: {
            thread_id: threadId
        }
    }
);

// Exibe a recomendação
console.log('\nRecomendação musical:\n');
console.log(resultado.resposta);

// Fecha a interface do terminal
terminal.close();
