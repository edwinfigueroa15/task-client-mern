import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup} from 'react-transition-group'

import Proyecto from './Proyecto';
import ProyectoContext from '../../contexts/proyectos/ProyectoContext';
import AlertaContext from '../../contexts/alerta/AlertaContext';

const ListarProyectos = () => {

    const proyectoContext = useContext(ProyectoContext)
    const { proyectos, mensaje, obtenerProyectos } = proyectoContext

    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    useEffect(() => {
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        
        obtenerProyectos()
        // eslint-disable-next-line
    }, [mensaje])

    if(proyectos.length === 0) return <p>No hay proyectos</p>

    return (
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categirua}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
                        <Proyecto proyecto={proyecto}></Proyecto>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    )
}

export default ListarProyectos;