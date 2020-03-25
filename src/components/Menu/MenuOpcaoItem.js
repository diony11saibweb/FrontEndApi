import React from 'react';

import { SideMenuLink } from './styles';

export default function MenuOpcaoItem({ opcao }) {
  return (
    <SideMenuLink to={opcao.path} exact>{opcao.titulo}</SideMenuLink>
  );
}
