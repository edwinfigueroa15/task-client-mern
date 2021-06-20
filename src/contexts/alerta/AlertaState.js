import React, { useReducer, useState } from 'react';
import AlertaContext from './AlertaContext';
import AlertaReducer from './AlertaReducer';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';

const AlertaState = props => {
    const initialState = {
        alerta : null
    }

    const [state, dispath] = useReducer(AlertaReducer, initialState)

    const mostrarAlerta = (msg, categoria) => {
        dispath({
            type : MOSTRAR_ALERTA,
            payload : {
                msg,
                categoria
            }
        })

        setTimeout(() => {
            dispath({
                type : OCULTAR_ALERTA
            })
        }, 4000)
    }

    return (
        <AlertaContext.Provider value={{ alerta : state.alerta, mostrarAlerta }}>
            {props.children}
        </AlertaContext.Provider>
    )
}

export default AlertaState;