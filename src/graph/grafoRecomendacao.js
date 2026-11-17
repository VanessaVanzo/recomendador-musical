
import {
    StateGraph,
    START,
    END
} from '@langchain/langgraph';

import { EstadoRecomendacao } from './EstadoRecomendacao.js';
import { buscarPreferencias } from './nodes/buscarPreferencias.js';
import { MemoryService } from '../services/memory/MemoryService.js';
import { gerarRecomendacao } from './nodes/gerarRecomendacao.js';
import { extrairPreferencias } from './nodes/extrairPreferencias.js';
import { salvarPreferencias } from './nodes/salvarPreferencias.js';


const fluxo = new StateGraph(EstadoRecomendacao)
    .addNode('extrairPreferencias', extrairPreferencias)
    .addNode('salvarPreferencias', salvarPreferencias)
    .addNode('buscarPreferencias', buscarPreferencias)
    .addNode('gerarRecomendacao', gerarRecomendacao)

    .addEdge(START, 'extrairPreferencias')
    .addEdge('extrairPreferencias', 'salvarPreferencias')
    .addEdge('salvarPreferencias', 'buscarPreferencias')
    .addEdge('buscarPreferencias', 'gerarRecomendacao')
    .addEdge('gerarRecomendacao', END);


// Inicializa a persistência no PostgreSQL
const memory = new MemoryService();
await memory.setup();

// Compila o grafo com persistência
export const grafoRecomendacao = fluxo.compile({
    checkpointer: memory.checkpointer
});
