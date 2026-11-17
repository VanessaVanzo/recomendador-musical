import { Annotation, MessagesAnnotation } from '@langchain/langgraph';

export const EstadoRecomendacao = Annotation.Root({

    usuarioId: Annotation(),

    pergunta: Annotation(),

    preferencias: Annotation(),

    preferenciasExtraidas: Annotation(),

    resposta: Annotation(),

    ...MessagesAnnotation.spec,

});