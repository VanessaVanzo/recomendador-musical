
import { PreferencesService } from '../../services/memory/PreferencesService.js';

const preferences = new PreferencesService();

export async function salvarPreferencias(estado) {

    const preferencias = estado.preferenciasExtraidas;

    for (const [categoria, valor] of Object.entries(preferencias)) {

        if (valor.trim() !== '') {

            preferences.salvarPreferencia(
                estado.usuarioId,
                categoria,
                valor
            );

        }
    }

    console.log('Preferências salvas com sucesso!');

    return {};
}
