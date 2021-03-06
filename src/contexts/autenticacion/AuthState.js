import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token' 
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { REGISTRO_EXITOSO, REGISTRO_ERROR, OBTENER_USUARIO, LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION } from '../../types';

const AuthState = props => {

    const initialState = {
        token : localStorage.getItem('token'),
        autenticado : null,
        usuario : null,
        mensaje : null,
        cargando : true
    }

    const [state, dispath] = useReducer(AuthReducer, initialState)

    const registrarUsuario = async datos => {
        try {
            const response = await clienteAxios.post('/api/usuarios', datos)
            dispath({
                type : REGISTRO_EXITOSO,
                payload : response.data
            })

            usuarioAutenticado()
            
        } catch (error) {
            const alerta = {
                msg : error.response.data.msg,
                categoria : 'alerta-error'
            }

            dispath({
                type : REGISTRO_ERROR,
                payload : alerta
            })
        }
    }

    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token')
        if(token) {
            tokenAuth(token)
        }

        try {
            const response = await clienteAxios.get('/api/auth')
            dispath({
                type : OBTENER_USUARIO,
                payload : response.data.usuario
            })
            
        } catch (error) {
            dispath({
                type : LOGIN_ERROR
            })
        }
    }

    const iniciarSesion = async datos => {
        try {
            const response = await clienteAxios.post('/api/auth', datos)
            dispath({
                type : LOGIN_EXITOSO,
                payload : response.data
            })

            usuarioAutenticado()

        } catch (error) {
            console.log(error)
            const alerta = {
                msg : error.response.data.msg ? error.response.data.msg : error.response.data.errores[0].msg,
                categoria : 'alerta-error'
            }

            dispath({
                type : LOGIN_ERROR,
                payload : alerta
            })
        }
    }

    const cerrrSesion = () => {
        dispath({
            type : CERRAR_SESION            
        })
    }

    return (
        <AuthContext.Provider value={{ token : state.token, autenticado : state.autenticado, usuario : state.usuario, mensaje : state.mensaje, cargando : state.cargando, registrarUsuario, iniciarSesion, usuarioAutenticado, cerrrSesion }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;