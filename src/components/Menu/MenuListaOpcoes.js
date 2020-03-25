import React, { useEffect } from 'react';

import MenuOpcaoItem from './MenuOpcaoItem';

import { ModuleOptionsContainer } from './styles';

export default function MenuListaOpcoes({ opcoes, exibirOpcoes }) {

  useEffect(() => {
    console.log('MenuListaOpcoes', exibirOpcoes);
  }, [opcoes, exibirOpcoes]);

  return (
    <ModuleOptionsContainer exibir={exibirOpcoes}>

        {
            opcoes.map(op => (
                <MenuOpcaoItem opcao={op} />
            ))
        }

    </ModuleOptionsContainer>
  );
}
