
import { ChatOpenRouter } from '@langchain/openrouter';
import { AIMessage, SystemMessage } from '@langchain/core/messages';

const modelo = new ChatOpenRouter({
    model: 'openrouter/free',
    temperature: 0.7
});

export async function gerarRecomendacao(estado) {

    const historicoRecente = (estado.messages ?? []).slice(-6);

    console.log('Total de mensagens no histórico:', estado.messages?.length ?? 0);

    console.log('Mensagens enviadas para a LLM:', historicoRecente.length);

   const mensagens = [
    new SystemMessage(`
        Você é um assistente especializado em recomendações musicais.

        Preferências do usuário:
        ${JSON.stringify(estado.preferencias)}

        Considere as mensagens recentes da conversa para entender
        o gosto musical do usuário.

        Quando ele pedir novas recomendações, evite repetir
        músicas que já foram recomendadas.

        Recomende músicas e explique brevemente por que
        cada uma combina com ele.

        Responda em português.
    `),
    ...historicoRecente
    ];

    const resposta = await modelo.invoke(mensagens);

    return {
            resposta: resposta.content,
            messages: [new AIMessage(resposta.content)]
    };
}
