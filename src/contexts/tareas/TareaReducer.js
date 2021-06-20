import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA, LIMPIAR_TAREA } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasproyecto : action.payload
            }
            break;

        case AGREGAR_TAREA:
            return {
                ...state,
                tareasproyecto : [...state.tareasproyecto, action.payload],
                errortarea : false,
            }
            break;

        case VALIDAR_TAREA:
            return {
                ...state,
                errortarea : true,
            }
            break;

        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasproyecto : state.tareasproyecto.filter(tarea => tarea._id !== action.payload),
            }
            break;
        
        case ACTUALIZAR_TAREA:
            return {
                ...state,
                tareasproyecto : state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea ),
            }
            break;

        case TAREA_ACTUAL:
            return {
                ...state,
                tareaseleccionada : action.payload
            }
            break;

        case LIMPIAR_TAREA:
            return {
                ...state,
                tareaseleccionada : null
            }
            break;
    
        default:
            return state
            break;
    }
}