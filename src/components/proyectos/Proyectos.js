import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';
import AuthContext from '../../contexts/autenticacion/AuthContext';

const Proyectos = () => {
    const authContext = useContext(AuthContext)
    const { usuarioAutenticado } = authContext

    useEffect(() => {
        usuarioAutenticado()
    }, [])

    return (
        <div className="contenedor-app">
            <Sidebar></Sidebar>

            <div className="seccion-principal">
                <Barra></Barra>
                
                <main>
                    <FormTarea></FormTarea>
                    <div className="contenedor-tareas">
                        <ListadoTareas></ListadoTareas>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Proyectos;