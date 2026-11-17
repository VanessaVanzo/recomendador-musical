
import { Annotation, StateGraph, START, END } from '@langchain/langgraph';
import { MemoryService } from '../services/memory/MemoryService.js';

// 1. Definimos o estado do grafo
const Estado = Annotation.Root({
    mensagem: Annotation()
});

// 2. Criamos um nó que processa a mensagem
async function processarMensagem(estado) {
    console.log('Mensagem recebida:', estado.mensagem);

    return {
        mensagem: estado.mensagem
    };
}

// 3. Criamos o fluxo do grafo
const fluxo = new StateGraph(Estado)
    .addNode('processarMensagem', processarMensagem)
    .addEdge(START, 'processarMensagem')
    .addEdge('processarMensagem', END);

// 4. Inicializamos a memória
const memory = new MemoryService();
await memory.setup();

// 5. Compilamos o grafo com persistência
const grafo = fluxo.compile({
    checkpointer: memory.checkpointer
});

// 6. Executamos com um identificador de conversa
const resultado = await grafo.invoke(
    { mensagem: 'Gosto de MPB, rock nacional e jazz.' },
    {
        configurable: {
            thread_id: 'conversa_001'
        }
    }
);

console.log('Resultado:', resultado);
