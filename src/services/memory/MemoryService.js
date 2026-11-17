
import 'dotenv/config';
import { PostgresSaver } from '@langchain/langgraph-checkpoint-postgres';

export class MemoryService {

    constructor() {
        this.checkpointer = null;
    }

    async setup() {
        const connectionString = process.env.DATABASE_URL;

        this.checkpointer = PostgresSaver.fromConnString(
            connectionString
        );

        await this.checkpointer.setup();

        console.log('MemoryService configurado com sucesso!');
    }
}
