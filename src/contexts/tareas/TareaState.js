import React, { useReducer, useState } from 'react';
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';
import clienteAxios from '../../config/axios'
import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA, LIMPIAR_TAREA } from '../../types';

const TareaState = props => {

    const initialState = {
        tareasproyecto : [],
        errortarea : false,
        tareaseleccionada : null,
    }

    const [state, dispatch] = useReducer(TareaReducer, initialState)

    const obtenerTareas = async proyecto => {
        try {
            const response = await clienteAxios.get('/api/tareas', { params: {proyecto} })
            dispatch({
                type : TAREAS_PROYECTO,
                payload : response.data.tareas
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const agregarTarea = async tarea => {
        try {
            const response = await clienteAxios.post('/api/tareas', tarea)
            dispatch({
                type : AGREGAR_TAREA,
                payload : tarea,
            })

        } catch (error) {
            console.log(error)
        }
    }

    const validarTarea = () => {
        dispatch({
            type : VALIDAR_TAREA,
        })
    }

    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } })
            dispatch({
                type : ELIMINAR_TAREA,
                payload : id,
            })
        } catch (error) {
            console.log(error)
        }
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type : TAREA_ACTUAL,
            payload : tarea,
        })
    }

    const actualizarTarea = async tarea => {
        try {
            const response = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            dispatch({
                type : ACTUALIZAR_TAREA,
                payload : response.data.tarea,
            })

        } catch (error) {
            console.log(error)
        }
    }

    const limpiarTarea = () => {
        dispatch({
            type : LIMPIAR_TAREA,
        })
    }

    return (
        <TareaContext.Provider value={{ tareasproyecto : state.tareasproyecto, errortarea : state.errortarea, tareaseleccionada : state.tareaseleccionada, obtenerTareas, agregarTarea, validarTarea, eliminarTarea, guardarTareaActual, actualizarTarea, limpiarTarea }}>
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;