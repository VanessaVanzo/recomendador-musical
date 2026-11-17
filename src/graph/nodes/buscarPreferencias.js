
import { PreferencesService } from '../../services/memory/PreferencesService.js';

const preferences = new PreferencesService();

export async function buscarPreferencias(estado) {

    const preferencias = preferences.formatarPreferencias(
        estado.usuarioId
    );

    return {
        preferencias
    };
}
