import React, { Fragment, useContext } from 'react';
import ProyectoContext from '../../contexts/proyectos/ProyectoContext';
import TareaContext from '../../contexts/tareas/TareaContext';

const Tarea = ({tarea}) => {

    const proyectoContext = useContext(ProyectoContext)
    const { proyecto } = proyectoContext

    const tareaContext = useContext(TareaContext)
    const { obtenerTareas, eliminarTarea, actualizarTarea, guardarTareaActual } = tareaContext

    const [proyectoActual] = proyecto

    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual)
        obtenerTareas(proyectoActual._id)
    }

    const cambiarEstado = tarea => {
        if(tarea.estado) {tarea.estado = false}
        else {tarea.estado = true}
        actualizarTarea(tarea)
    }

    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea)
    }

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado ? (<button type="button" className="completo" onClick={() => cambiarEstado(tarea)} >Completo</button>) : (<button type="button" className="incompleto" onClick={() => cambiarEstado(tarea)} >Incompleto</button>)}
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-primario" onClick={() => seleccionarTarea(tarea)} >Editar</button>
                <button type="button" onClick={() => tareaEliminar(tarea._id)} className="btn btn-secundario">Eliminar</button>
            </div>
        </li>
    )
}

export default Tarea;