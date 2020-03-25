
export const navigation = [
  {
    modulo: {
      titulo: "Home",
      icone: "pi pi-home",
      ativo: false,
      paginas: [
        {
          titulo: "Início",
          path: "/"
        }
      ]
    }        
  },
  {
    modulo: {
      titulo: "Cadastros",
      icone: "pi pi-pencil",
      ativo: true,
      paginas: [
        {
          titulo: "Cadastro de Clientes",
          path: "/clientes"
        }
      ]  
    }      
  }
];