import React from 'react';
import { Switch, Route } from "react-router-dom";

import Home from './pages/Home';
import ConsultaClientes from './pages/ConsultaClientes';
import FormCliente from './pages/FormCliente';
import RelatorioClientes from './pages/RelatorioClientes';

const Routes = () => {
    return (
        <Switch>          
          <Route path="/" exact={true} component={Home} />
          <Route path="/clientes" exact component={ConsultaClientes} />
          <Route path="/clientes/form" component={FormCliente} />
          <Route path="/relatorio" component={RelatorioClientes} />
        </Switch>
    );
}

export default Routes;