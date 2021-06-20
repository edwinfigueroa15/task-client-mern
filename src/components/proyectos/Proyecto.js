import React, {useContext} from 'react';
import ProyectoContext from '../../contexts/proyectos/ProyectoContext';
import TareaContext from '../../contexts/tareas/TareaContext';

const Proyecto = ({proyecto}) => {
    const proyectoContext = useContext(ProyectoContext)
    const { proyectoActual } = proyectoContext

    const tareaContext = useContext(TareaContext)
    const { obtenerTareas } = tareaContext

    const seleccionarProyecto = id => {
        proyectoActual(id)
        obtenerTareas(id)
    }

    return (
        <li>
            <button type="button" onClick={() => seleccionarProyecto(proyecto._id)} className="btn btn-blank">{proyecto.nombre}</button>
        </li>
    )
}

export default Proyecto;