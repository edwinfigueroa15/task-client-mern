import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../contexts/alerta/AlertaContext';
import AuthContext from '../../contexts/autenticacion/AuthContext';

const NuevaCuenta = (props) => {
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    const authContext = useContext(AuthContext)
    const { autenticado, mensaje, registrarUsuario } = authContext

    useEffect(() => {
        if(autenticado) {
            props.history.push('/proyectos')
        }

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        
        // eslint-disable-next-line
    }, [mensaje, autenticado, props])

    const [usuarionuevo, guardarUsuarioNuevo] = useState({
        nombre : '',
        email : '',
        password : '',
        confirmar : '',
    })

    const { nombre, email, password, confirmar } = usuarionuevo

    const getData = e => {
        guardarUsuarioNuevo({
            ...usuarionuevo,
            [e.target.name] : e.target.value
        })
    }

    const submitData = e => {
        e.preventDefault()
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return
        }

        if(password.length < 6) {
            mostrarAlerta('El password debe ser minimo de 6 caracteres', 'alerta-error')
            return
        }

        if(password !== confirmar) {
            mostrarAlerta('Los passwords no son iguales', 'alerta-error')
            return
        }

        registrarUsuario({nombre, email, password})
    }

    return (
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null }
            <div className="contenedor-form sombre-dark">
                <h1>Registrarse</h1>
                <form>
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" defaultValue={nombre} onChange={getData} />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Correo</label>
                        <input type="email" id="email" name="email" placeholder="Tu correo" defaultValue={email} onChange={getData} />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" placeholder="Tu contraseña" defaultValue={password} onChange={getData} />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Contraseña</label>
                        <input type="password" id="confirmar" name="confirmar" placeholder="Confirmar tu contraseña" defaultValue={confirmar} onChange={getData} />
                    </div>
                    
                    <div className="campo-form">
                        <input type="submiy" className="btn btn-primario btn-block text-center" onClick={submitData} defaultValue="Registrarme" />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">Volver</Link>

            </div>
        </div>
    )
}

export default NuevaCuenta;