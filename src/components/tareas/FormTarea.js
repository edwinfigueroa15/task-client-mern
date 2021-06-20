import React, {useContext, useState, useEffect} from 'react';
import ProyectoContext from '../../contexts/proyectos/ProyectoContext';
import TareaContext from '../../contexts/tareas/TareaContext';

const FormTarea = () => {
    const proyectoContext = useContext(ProyectoContext)
    const { proyecto } = proyectoContext

    const tareaContext = useContext(TareaContext)
    const { tareaseleccionada, errortarea, agregarTarea, obtenerTareas, validarTarea, actualizarTarea, limpiarTarea } = tareaContext

    const [tarea, guardarTarea] = useState({
        nombre : '',
    })

    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre : ''
            })
        }


    }, [tareaseleccionada])

    if(!proyecto) return null
    const [proyectoActual] = proyecto

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(tarea.nombre.trim() === '') {
            validarTarea()
            return
        }

        if(tareaseleccionada === null) {
            tarea.proyecto = proyectoActual._id
            agregarTarea(tarea)

        } else {
            actualizarTarea(tarea)
            limpiarTarea()
        }

        obtenerTareas(proyectoActual._id)
            
        guardarTarea({
            nombre : ''
        })
        
    }

    return (
        <div className="formulario">
            <form onSubmit={handleSubmit}>
                <div className="contenedor-input">
                    <input type="text" className="input-text" placeholder="Nombre tarea" name="nombre" onChange={handleChange} value={tarea.nombre} />
                </div>
                <div className="contenedor-input">
                    <input type="submit" className="btn btn-primario btn-block text-center" value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea' } />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    )
}

export default FormTarea;