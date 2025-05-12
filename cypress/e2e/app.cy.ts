import { LOCALES, LOCALES_MODAL } from "../../src/locales/en";

describe("Recipe Finder Application", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-testid="recipe-list"]').should("exist");
  });

  it("completes a full user journey", () => {
    cy.get("h1").should("have.text", LOCALES.titles.main);
    cy.get('[data-testid="recipe-card"]').should("have.length.gt", 0);

    cy.get(`input[placeholder="${LOCALES.placeholders.search}"]`).type(
      "chicken"
    );
    cy.get("button").contains(LOCALES.buttons.search).click();
    cy.get('[data-testid="recipe-card"]');

    cy.get('[data-testid="recipe-card"]').first().click();
    cy.get('[data-testid="modal"]').should("be.visible");

    cy.contains(LOCALES_MODAL.buttons.close).click();
    cy.get('[data-testid="modal"]').should("not.exist");

    cy.get('[data-testid="recipe-card"]')
      .first()
      .within(() => {
        cy.get('[data-testid="favorite-icon"]').click();
      });

    cy.contains(LOCALES.buttons.favorites).click();
    cy.get('[data-testid="recipe-card"]').should("have.length", 1);

    cy.contains(LOCALES.buttons.showAll).click();

    cy.get('[data-testid="alphabet-button"]').contains("B").click();
    cy.get('[data-testid="recipe-card"]').should("have.length.gt", 0);
  });

  describe("Error handling", () => {
    it("handles no search results gracefully", () => {
      cy.get(`input[placeholder="${LOCALES.placeholders.search}"]`).type(
        "xyznonexistentrecipe"
      );
      cy.get("button").contains(LOCALES.buttons.search).click();
      cy.get('[data-testid="recipe-card"]').should("have.length", 0);
    });

    it("disables search button with empty input", () => {
      cy.get("button").contains(LOCALES.buttons.search).should("be.disabled");
      cy.get(`input[placeholder="${LOCALES.placeholders.search}"]`).type("a");
      cy.get("button").contains(LOCALES.buttons.search).should("be.enabled");
    });
  });
});
