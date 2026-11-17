
import Database from 'better-sqlite3';
import path from 'node:path';

const caminhoBanco = path.resolve('storage', 'preferences.db');

const db = new Database(caminhoBanco);


db.exec(`
    CREATE TABLE IF NOT EXISTS preferencias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id TEXT NOT NULL,
        categoria TEXT NOT NULL,
        valor TEXT NOT NULL,
        atualizado_em TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_preferencias_usuario_categoria
    ON preferencias (usuario_id, categoria)
`);


export class PreferencesService {

    constructor() {
        this.db = db;
    }





    salvarPreferencia(usuarioId, categoria, valor) {

        const comando = this.db.prepare(`
        INSERT INTO preferencias (usuario_id, categoria, valor)
        VALUES (?, ?, ?)
        ON CONFLICT(usuario_id, categoria)
        DO UPDATE SET
            valor = excluded.valor,
            atualizado_em = CURRENT_TIMESTAMP
    `);

        comando.run(usuarioId, categoria, valor);
    }



    buscarPreferencias(usuarioId) {

        const comando = this.db.prepare(`
        SELECT categoria, valor
        FROM preferencias
        WHERE usuario_id = ?
    `);

        return comando.all(usuarioId);
    }

    formatarPreferencias(usuarioId) {

        const preferencias = this.buscarPreferencias(usuarioId);

        if (preferencias.length === 0) {
            return 'Nenhuma preferência cadastrada.';
        }

        return preferencias
            .map(({ categoria, valor }) => `- ${categoria}: ${valor}`)
            .join('\n');
    }

}


