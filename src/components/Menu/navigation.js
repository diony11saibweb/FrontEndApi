
export const navigation = [  
  
  {
    titulo: "Relatórios",
    icone: "clipboard-list",
    ativo: false,
    identificador: "relatorios",
    itens: [
      {
        titulo: "Financeiro",
        icone: "money-bill-alt",
        path: "",
        identificador: "financeiro",     
        subniveis: [
          {
            titulo: "Contas a Receber",
            icone: "file-invoice-dollar",
            path: "/",
            identificador: "contas-a-receber"
          },
          {
            titulo: "Previsões",
            icone: "chart-line",
            path: "/",
            identificador: "previsoes",
            subniveis: [
              {
                titulo: "Fluxo de Caixa",
                icone: "cash-register",
                path: "/"
              }
            ]
          }
        ]
      },
      {
        titulo: "Vendas",
        icone: "shopping-cart",
        path: "/",
        identificador: "vendas",
        subniveis: []
      },
      {
        titulo: "Contábil",
        icone: "hand-holding-usd",
        path: "/",
        identificador: "contabil",
        subniveis: []
      }
    ]  
  },
  {
    titulo: "Cadastros",
    icone: "clipboard",
    ativo: false,
    identificador: "cadastros",
    itens: [
      {
        titulo: "Cadastro de Clientes",
        icone: "user-plus",
        path: "/clientes",
        identificador: "cadastro-clientes",
        subniveis: []
      }
    ]
  }   
  
];