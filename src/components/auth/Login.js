import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../contexts/alerta/AlertaContext';
import AuthContext from '../../contexts/autenticacion/AuthContext';

const Login = (props) => {
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    const authContext = useContext(AuthContext)
    const { autenticado, mensaje, iniciarSesion } = authContext

    useEffect(() => {
        if(autenticado) {
            props.history.push('/proyectos')
        }

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        // eslint-disable-next-line
    }, [mensaje, autenticado, props])

    const [usuario, guardarUsuario] = useState({
        email : '',
        password : '',
    })

    const { email, password } = usuario

    const getData = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const submitData = e => {
        e.preventDefault()
        if(email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return null
        }

        iniciarSesion({ email, password })
    }

    return (
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null }
            <div className="contenedor-form sombre-dark">
                <h1>Iniciar Sesion</h1>
                <form onSubmit={submitData}>
                    <div className="campo-form">
                        <label htmlFor="email">Correo</label>
                        <input type="email" id="email" name="email" placeholder="Tu correo" value={email} onChange={getData} />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" placeholder="Tu contraseña" value={password} onChange={getData} />
                    </div>
                    
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block text-center" value="Iniciar Sesión" />
                    </div>
                </form>

                <Link to={'/nueva-cuenta'} className="enlace-cuenta">Registrar nueva cuenta</Link>

            </div>
        </div>
    )
}

export default Login;