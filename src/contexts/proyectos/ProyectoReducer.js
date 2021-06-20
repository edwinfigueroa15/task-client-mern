import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PRYECTO_ACTUAL, ELIMINAR_PROYECTO, PROYECTO_ERROR } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario : true
            }
            break;

        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos : action.payload
            }
            break;

        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos : [...state.proyectos, action.payload],
                formulario : false,
                errorformulario : false,
            }
            break;

        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario : true,
            }
            break;

        case PRYECTO_ACTUAL:
            return {
                ...state,
                proyecto : state.proyectos.filter(proyecto => proyecto._id === action.payload)
            }
            break;

        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos : state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto : null,
            }
            break;

        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
            break;
    
        default:
            return state
            break;
    }
}