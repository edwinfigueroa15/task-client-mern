import React from 'react'
import { BrowserRouter as BRouter, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

import ProyectoState from './contexts/proyectos/ProyectoState';
import TareaState from './contexts/tareas/TareaState';
import AlertaState from './contexts/alerta/AlertaState';
import AuthState from './contexts/autenticacion/AuthState';
import tokenAuth from './config/token'
import RutaPrivada from './components/ruta/RutaPrivada'

// REVISAR SI TENEMOS UN TOKEN
const token = localStorage.getItem('token')

if(token) {
    tokenAuth(token)
}

function App() {
    return (
        <ProyectoState>
            <TareaState>
                <AlertaState>
                    <AuthState>
                        <BRouter>
                            <Switch>
                                <Route exact path="/" component={Login} ></Route>
                                <Route exact path="/nueva-cuenta" component={NuevaCuenta} ></Route>
                                <RutaPrivada exact path="/proyectos" component={Proyectos} ></RutaPrivada>
                            </Switch>
                        </BRouter>
                    </AuthState>
                </AlertaState>
            </TareaState>
        </ProyectoState>
    );
}

export default App;