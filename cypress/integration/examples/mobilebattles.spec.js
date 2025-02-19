/// <reference types="cypress" />

context("COVID19 Mobile Battles", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.visit("http://localhost:8080");

    let uname = Math.random().toString(20).substr(2, 6);
    cy.get("#login").click();
    // Create Warrior
    cy.get("#worrior_username").type(uname);
    cy.wait(1000); // this wait is needed to synch the page
    cy.get("#warrior").click();
    cy.wait(1000); // this wait is needed to synch the page
    cy.contains(uname).click();
  });

  it("User can choose from different battlefields", () => {
    //check all elements are visible on Page
    cy.get("#office_img").should("be.visible");
    cy.get("#office").should("have.attr", "href", "office");
    cy.get("#bus_img").should("be.visible");
    cy.get("#bus").should("have.attr", "href", "bus");
    cy.get("#restaurant_img").should("be.visible");
    cy.get("#restaurant").should("have.attr", "href", "restaurant");
  });

  /// Due to new logic, we no longer record the correct answer.
  /// TODO: Need to upgrade to New cypress to better
  it("Bus battle Correct Answer", () => {
    cy.intercept("GET", "/api/fetchquestion?*", {
      fixture: "mockquestion.json",
    });
    cy.intercept("POST", "/api/checkanswer", { fixture: "mockcorrect.json" });

    cy.get("#bus").click();
    cy.get("#bus_intro_modal").should("be.visible");
    cy.get("#bus_timer_start").click();
    cy.get("#bus_intro_modal").should("be.hidden");
    //check all elements are visible on Page
    cy.get("#img_bus").should("be.visible");
    cy.get("#bus_progress").should("be.visible");
    cy.get("#bus_question_1").should("be.visible").contains("?");
    cy.get("#bus_answer_1").should("be.visible");
    cy.get("#bus_answer_2").should("be.visible");
    //End - check all elements are visible on Page

    //TEST the incorrect Modal is not present
    cy.get("#bus_incorrect_modal").should("not.be.visible");
    //E2E TEST: Selecting the correct answer will present the success modal
    cy.contains("yes").click();
    cy.get("#bus_correct_modal").should("be.visible");
    cy.get("#close_correct_modal_btn").click();
  });

  it("Bus battle Inorrect Answer", () => {
    cy.intercept("GET", "/api/fetchquestion?*", {
      fixture: "mockquestion.json",
    });
    cy.intercept("POST", "/api/checkanswer", { fixture: "mockincorrect.json" });

    cy.get("#bus").click();
    cy.get("#bus_intro_modal").should("be.visible");
    cy.get("#bus_timer_start").click();
    cy.get("#bus_intro_modal").should("be.hidden");
    //check all elements are visible on Page
    cy.get("#img_bus").should("be.visible");
    cy.get("#bus_progress").should("be.visible");
    cy.get("#bus_question_1").should("be.visible").contains("?");
    cy.get("#bus_answer_1").should("be.visible");
    cy.get("#bus_answer_2").should("be.visible");
    //End - check all elements are visible on Page

    //TEST the incorrect Modal is not present
    cy.get("#bus_incorrect_modal").should("not.be.visible");
    //MOCK: Selecting the incorrect answer will present the incorrect modal
    cy.contains("no").click();
    cy.get("#bus_incorrect_modal").should("be.visible");
    cy.contains("Try again").click();
  });

  it("Bus battle Timeout", () => {
    cy.get("#bus").click();
    cy.get("#bus_intro_modal").should("be.visible");
    cy.get("#bus_timer_start").click();
    cy.get("#bus_intro_modal").should("be.hidden");
    //check all elements are visible on Page
    cy.get("#img_bus").should("be.visible");
    cy.get("#bus_progress").should("be.visible");
    cy.get("#bus_question_1").should("be.visible").contains("?");
    cy.get("#bus_answer_1").should("be.visible");
    cy.get("#bus_answer_2").should("be.visible");
    //End - check all elements are visible on Page

    //MOCK: Selecting the incorrect answer will present the incorrect modal go home
    cy.wait(22001);
    cy.get("#bus_out_of_time_modal").should("be.visible");
    cy.get("#retry").click({ force: true });

    cy.wait(22001);
    cy.get("#bus_out_of_time_modal").should("be.visible");
    cy.contains("Return Home").click();
    cy.url().should("include", "/covid"); // => true
  });

  it("Single page battle Correct Answer", () => {
    cy.intercept("GET", "/api/fetchquestion*", {
      fixture: "mockquestion.json",
    });
    cy.intercept("POST", "/api/checkanswer", { fixture: "mockcorrect.json" });

    cy.get("#news").click();
    cy.get("#introModal").should("be.visible");
    cy.contains("Start").click();
    cy.get("#introModal").should("be.hidden");
    //check all elements are visible on Page
    cy.get("#question").should("be.visible").contains("?");
    cy.get("#answer_1").should("be.visible");
    cy.get("#answer_2").should("be.visible");
    //End - check all elements are visible on Page

    //TEST the incorrect Modal is not present
    cy.get("#incorrectModal").should("not.be.visible");
    //E2E TEST: Selecting the correct answer will present the success modal
    cy.contains("yes").click();
    cy.get("#correctModal").should("be.visible");
    cy.contains("Continue").click();
    cy.get("#correctModal").should("not.be.visible");

  });
});
