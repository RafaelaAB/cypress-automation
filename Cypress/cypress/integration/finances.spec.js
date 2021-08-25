/// <reference types="cypress" />


// cy.viewport
// arquivos de config
// configs por linha de comando

         //- entender o fluxo manualmente
        //- mapear os elementos que vamos interagir
        //- descrever as interações com o cypress 
       //- adicionar as asserções que a gente precisa 

context('Dev Finances Agilizei', () => {
    //HOOKS
        //trechos que executam antes e depois do teste
        //before-> antes de todos os testes
        //beforeEach-> antes de cada teste
        //after-> depois de todos os testes
        //afterEach-> depois de cada teste
    beforeEach(() => {
        //abrir site
         cy.visit('https://devfinance-agilizei.netlify.app')
        //validar tamanho da tabela antes da inserção
         cy.get('#data-table tbody tr').should('have.length', 0)
    });

    it('Cadastrar entradas', () => {
      //Mapeando elementos
       cy.get('#transaction .button').click() // id + classe
       cy.get('#description ').type('Salario') // somente id
       cy.get('[name=amount]').type('12.000') // atributos
       cy.get('[type=date]').type('2021-08-25') // atributos
       cy.get('button').contains('Salvar').click() //tipo e valor
    });

    it('Cadastrar saídas', () => {
     //Mapeando elementos
      cy.get('#transaction .button').click() // id + classe
      cy.get('#description ').type('Salario') // somente id
      cy.get('[name=amount]').type('-10.00') // atributos
      cy.get('[type=date]').type('2021-08-25') // atributos
      cy.get('button').contains('Salvar').click() //tipo e valor
   });

   //after(() => {
    //validar tamanho da tabela após da inserção
   // cy.get('#data-table tbody tr').should('have.length', 1)
   //});

    //remover entradas e saídas
    it('Remover Entradas e saídas', () => {
        const entrada = 'Salário'
        const saida = 'Internet'

        cy.get('#transaction .button').click() // id + classe
        cy.get('#description ').type(entrada) // somente id
        cy.get('[name=amount]').type('100') // atributos
        cy.get('[type=date]').type('2021-08-25') // atributos
        cy.get('button').contains('Salvar').click() //tipo e valor

        cy.get('#transaction .button').click() // id + classe
        cy.get('#description ').type(saida) // somente id
        cy.get('[name=amount]').type('-10.00') // atributos
        cy.get('[type=date]').type('2021-08-25') // atributos
        cy.get('button').contains('Salvar').click() //tipo e valor

        //estratégia 1 para identificar voltar para elemento PAI e avançar para um td img atributo
        cy.get('td.description')
            .contains(entrada)
            .parent()
            .find('img[onclick*=remove]')
            .click()

        //estratégia 2 buscar todos os irmãos e buscar o que tem img + atributo
        cy.get('td.description')
            .contains(saida)
            .siblings()
            .children('img[onclick*=remove]')
            .click()
    });
});