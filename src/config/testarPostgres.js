
import { pool } from './database.js';

try {
    const resultado = await pool.query(
        'SELECT current_database(), current_user'
    );

    console.log('Conexão realizada com sucesso!');
    console.log(resultado.rows[0]);

} catch (erro) {
    console.error('Erro ao conectar ao PostgreSQL:', erro.message);

} finally {
    await pool.end();
}
