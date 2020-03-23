import React from 'react';
import { Switch, Route } from "react-router-dom";

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import ConsultaClientes from './pages/ConsultaClientes';
import FormCliente from './pages/FormCliente';

const Routes = () => {
    return (
        <Switch>          
          <Route path="/" exact={true} component={Home} />
          <Route path="/sobre" component={Sobre} />
          <Route path="/clientes" exact component={ConsultaClientes} />
          <Route path="/clientes/form" component={FormCliente} />
        </Switch>
    );
}

export default Routes;