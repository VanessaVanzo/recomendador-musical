
import 'dotenv/config';
import { ChatOpenRouter } from '@langchain/openrouter';

const modelo = new ChatOpenRouter({
    model: 'openrouter/free',
    temperature: 0
});

export async function extrairPreferencias(estado) {

    const prompt = `
        Analise a mensagem do usuário e identifique suas
        preferências musicais.

        É obrigatório utilizar exatamente os nomes das
        propriedades do JSON fornecido.
        Não traduza nem altere os nomes das propriedades.

        Responda em português.

        Retorne somente um JSON válido, sem markdown,
        seguindo este formato:

        {
            "genero": "",
            "artistas": "",
            "estilo": ""
        }

        Se uma informação não estiver presente, retorne
        uma string vazia.

        Mensagem do usuário:
        ${estado.pergunta}
    `;

    const resposta = await modelo.invoke(prompt);

    const preferencias = JSON.parse(resposta.content);

    return {
        preferenciasExtraidas: preferencias
    };
}
