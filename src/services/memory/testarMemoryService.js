
import { MemoryService } from './MemoryService.js';

// Criamos uma instância do serviço
const memory = new MemoryService();

// Configuramos o serviço
await memory.setup();

// Verificamos o resultado
console.log('\nCheckpointer configurado:');
console.log(memory.checkpointer !== null);

console.log('\nTipo do objeto:');
console.log(memory.checkpointer.constructor.name);
