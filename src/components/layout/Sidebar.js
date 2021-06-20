import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto';
import ListarProyectos from '../proyectos/ListarProyectos';

const Sidebar = () => {
    return(
        <aside>
            <h1>MERN<span>Task</span></h1>
            <NuevoProyecto></NuevoProyecto>
            <div className="proyectos">
                <h2>Tus proyectos</h2>
                <ListarProyectos></ListarProyectos>
            </div>
        </aside>
    )
}

export default Sidebar;