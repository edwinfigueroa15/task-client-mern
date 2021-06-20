import React, { Fragment, useContext } from 'react';

import Tarea from './Tarea';
import ProyectoContext from '../../contexts/proyectos/ProyectoContext';
import TareaContext from '../../contexts/tareas/TareaContext';


const ListadoTareas = () => {
    const wrapper = React.createRef();
    console.log(wrapper)

    const proyectoContext = useContext(ProyectoContext)
    const { proyecto, eliminaProyecto } = proyectoContext

    const tareaContext = useContext(TareaContext)
    const { tareasproyecto } = tareaContext

    if(!proyecto) return <h2>Selecciona un proyecto</h2>
    const [proyectoActual] = proyecto

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul>
                {
                    tareasproyecto.length === 0
                    ? <li className="tarea"><p>No hay tareas</p></li>
                    : tareasproyecto.map((tarea, i) => (
                        <Tarea key={i} tarea={tarea}></Tarea>
                    ))

                    
                }
            </ul>

            <button type="button" onClick={() => eliminaProyecto(proyectoActual._id)} className="btn btn-eliminar">Eliminar Proyecto &times;</button>
        </Fragment>
    )
}

export default ListadoTareas;