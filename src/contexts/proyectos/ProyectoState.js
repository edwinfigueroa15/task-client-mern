import React, { useReducer } from 'react'
import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import clienteAxios from '../../config/axios'
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PRYECTO_ACTUAL, ELIMINAR_PROYECTO, PROYECTO_ERROR } from '../../types';

const ProyectoState = props => {
    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto : null,
        mensaje: null
    }

    const [state, dispatch] = useReducer(ProyectoReducer, initialState)

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = async () => {
        try {
            const response = await clienteAxios.get('/api/proyectos')
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: response.data
            })
        } catch (error) {
            const alerta = {
                msg : 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload : alerta
            })
        }
    }

    const agregarProyecto = async proyecto => {
        try {
            const response = await clienteAxios.post('/api/proyectos', proyecto)
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: response.data
            })

        } catch (error) {
            const alerta = {
                msg : 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload : alerta
            })
        }
    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    const proyectoActual = proyectoId => {
        dispatch({
            type: PRYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    const eliminaProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })

        } catch (error) {
            const alerta = {
                msg : 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload : alerta
            })
        }
    }

    return (
        <ProyectoContext.Provider value={{ proyectos: state.proyectos, formulario: state.formulario, errorformulario: state.errorformulario, proyecto : state.proyecto, mensaje : state.mensaje, mostrarFormulario, obtenerProyectos, agregarProyecto, mostrarError, proyectoActual, eliminaProyecto }}>
            {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;