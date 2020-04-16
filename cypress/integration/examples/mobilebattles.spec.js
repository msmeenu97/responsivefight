/// <reference types="cypress" />

context('COVID19 Mobile Battles', () => {
    beforeEach(() => {
      cy.viewport('iphone-6')
      cy.visit('http://localhost:8080')
    })
  
    it('Office battle', () => {      
      cy.get('#start').click()
      cy.get('#office').click()
      cy.get('#staticBackdrop')
      .should('be.visible')
      cy.get('#start').click()
      cy.get('#staticBackdrop')
      .should('be.hidden')      
      //check all elements are visible on Page
      cy.get('#img_office')
      .should('be.visible')
      cy.get('#myProgress')
      .should('be.visible')      
      cy.get('#office_question_1')
      .should('be.visible')
      cy.get('#office_answer_1')
      .should('be.visible')
      cy.get('#office_answer_2')
      .should('be.visible')
      //End - check all elements are visible on Page
      
      //Test: Select CORRECT answer button should present CORRECT modal to user
      cy.get('#office_answer_1').click()
      cy.get('#staticBackdrop2')
      .should('be.visible')
      cy.get('#close_modal_btn_1').click()
      cy.get('#staticBackdrop2')
      .should('be.hidden')

      //Test: Select CORRECT answer button should present CORRECT modal to user
      cy.get('#office_answer_2').click()
      cy.get('#staticBackdrop3')
      .should('be.visible')
      cy.get('#close_modal_btn_2').click()
      cy.get('#staticBackdrop3')
      .should('be.hidden')
    })

    it('Bus battle', () => {
      cy.get('#start').click()
      cy.get('#bus').click()
      cy.get('#bus_title').contains('Inside the Bus') 
      cy.get('#bus_question_1')
      .should('be.visible')
      cy.get('#bus_answer_1')
      .should('be.visible')
      cy.get('#bus_answer_2')
      .should('be.visible')
      cy.get('#img_bus')
      .should('be.visible')
      
    })

    it('Validate selecting the Start Button on Initial Modal button should close the Modal on Screen', () => {
      cy.get('#bus_timer_start').click()
      cy.get('#bus_intro_modal')
      .should('be.hidden')
    });

    it('Validate CORRECT Bus answer should present CORRECT modal to user', () => {
      cy.get('#bus_answer_1').click()
      cy.get('#bus_correct_modal')
      .should('be.visible')
    });

    it('Validate selecting the Close Modal button should close the Modal on Screen', () => {
      cy.get('#close_correct_modal_btn').click()
      cy.get('#bus_correct_modal')
      .should('be.hidden')
    });

    it('Validate selecting INCORRECT answer button should present INCORRECT modal to user', () => {
      cy.get('#bus_answer_2').click()
      cy.get('#bus_incorrect_modal')
      .should('be.visible')
    });

    it('Validate selecting the Close Modal button should close the Modal on Screen', () => {
      cy.get('#close_correct_modal_btn').click()
      cy.get('#bus_incorrect_modal')
      .should('be.hidden')
    });

    it('Restaurant battle', () => {
      cy.get('#start').click()
      cy.get('#restaurant').click() 
      cy.get('#restaurant_title').contains('At the Restaurant ')             
      cy.get('#restaurant_question_1')
      .should('be.visible')
      cy.get('#office_answer_1')
      .should('be.visible')
      cy.get('#office_answer_2')
      .should('be.visible')
      cy.get('#img_restaurant')
      .should('be.visible')
      })
  })