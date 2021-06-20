import React, {Fragment, useContext, useState} from 'react';
import ProyectoContext from '../../contexts/proyectos/ProyectoContext';

const NuevoProyecto = () => {

    const proyectoContext = useContext(ProyectoContext)
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectoContext

    const [proyecto, guardarProyecto] = useState({
        nombre : ''
    })

    const onChageProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitProyecto = e => {
        e.preventDefault()
        if(proyecto.nombre.trim() === '') {
            mostrarError()
            return
        }

        agregarProyecto(proyecto)
        guardarProyecto({
            nombre : ''
        })
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-block btn-primario" onClick={() => mostrarFormulario()}>Nuevo proyecto</button>
            {formulario ? (
            <form onSubmit={onSubmitProyecto} className="formulario-nuevo-proyecto">
                <input type="text" className="input-text" placeholder="Nombre del proyecto" name="nombre" value={proyecto.nombre} onChange={onChageProyecto} />
                <input type="submit" className="btn btn-primario btn-block" value="Agregar el proyecto" />
            </form>)
            : null}

            { errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
        </Fragment>  
    )
}

export default NuevoProyecto;