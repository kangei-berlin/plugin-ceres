// / <reference types="cypress" />
context("Single Item", () =>
{
    beforeEach(() =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
    });

    it("should display order properties", () =>
    {
        cy.getByTestingAttr("order-property-previous-slide").should("be.visible");
        cy.getByTestingAttr("order-property-next-slide").should("be.visible");
        cy.getByTestingAttr("order-property-input-radio").should("be.visible");
    });

    it("should go to next order property page", () =>
    {
        cy.getByTestingAttr("order-property-next-slide").click();
        cy.getByTestingAttr("order-property-input-checkbox").should("be.visible").should("have.attr", "value").and("include", "8");

        cy.getByTestingAttr("order-property-next-slide").click();
        cy.getByTestingAttr("order-property-input-checkbox").eq(3).should("be.visible").should("have.attr", "value").and("include", "4");

        cy.getByTestingAttr("order-property-next-slide").click();
        cy.get(".input-unit.file-input.order-property-input").eq(0).should("be.visible");
        cy.getByTestingAttr("order-property-selection").eq(0).should("be.visible");
        cy.getByTestingAttr("order-property-selection-option").eq(0).should("be.visible");
        cy.getByTestingAttr("order-property-input-text").eq(0).should("be.visible");
        cy.getByTestingAttr("order-property-input-int").eq(0).should("be.visible");

        cy.getByTestingAttr("order-property-next-slide").click();
        cy.get(".input-unit.file-input.order-property-input").eq(1).should("be.visible");
        cy.getByTestingAttr("order-property-selection").eq(1).should("be.visible");
        cy.getByTestingAttr("order-property-selection-option").eq(1).should("be.visible");
        cy.getByTestingAttr("order-property-input-text").eq(1).should("be.visible");
        cy.getByTestingAttr("order-property-input-int").eq(1).should("be.visible");
    });

    it("should go to previous order property page", () =>
    {
        cy.getByTestingAttr("order-property-next-slide").click().click();
        cy.getByTestingAttr("order-property-previous-slide").click();
        cy.getByTestingAttr("order-property-input-checkbox").should("be.visible").should("have.attr", "value").and("include", "8");
    });

    it("should select single choice", () =>
    {
        cy.getByTestingAttr("order-property-input-radio").first().click();

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Einfachauswahl +0€");
        checkPrices(0);
    });

    it("should select multiple choice", () =>
    {
        // TODO implement more reliable way to navigate?
        cy.getByTestingAttr("order-property-next-slide").click();
        cy.getByTestingAttr("order-property-input-checkbox").first().click();

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Mehrfachauswahl +0€");
    });

    it("should select label", () =>
    {
        cy.getByTestingAttr("order-property-next-slide").click().click();
        cy.getByTestingAttr("order-property-input-checkbox").click();

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Label ohne Aufpreis");
    });

    it("should fill file upload input", () =>
    {
        // TODO
    });

    it("should fill selection input", () =>
    {
        cy.getByTestingAttr("order-property-next-slide").click().click().click();
        cy.getByTestingAttr("order-property-selection").click();
        cy.getByTestingAttr("order-property-selection-option").click();

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Auswahl");
        cy.get("#add-item-to-basket-overlay").should("contain", "Option 1");
    });

    it("should fill text input", () =>
    {
        const value = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

        cy.getByTestingAttr("order-property-next-slide").click().click().click();
        cy.getByTestingAttr("order-property-input-text").type(value);

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Text");
        cy.get("#add-item-to-basket-overlay").should("contain", value);
    });

    it("should fill float number input", () =>
    {
        const value = 1.23;

        cy.getByTestingAttr("order-property-next-slide").click().click().click();
        cy.getByTestingAttr("order-property-input-float").type(value);

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Kommazahl");
        cy.get("#add-item-to-basket-overlay").should("contain", value);
    });

    it("should fill int input", () =>
    {
        const value = 123;

        cy.getByTestingAttr("order-property-next-slide").click().click().click();
        cy.getByTestingAttr("order-property-input-int").type(value);

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Ganze Zahl");
        cy.get("#add-item-to-basket-overlay").should("contain", value);
    });

    it("should fill file upload input with extra costs", () =>
    {
        // TODO
    });

    it("should fill selection input with extra costs", () =>
    {
        cy.getByTestingAttr("order-property-next-slide").click().click().click().click();
        cy.getByTestingAttr("order-property-selection").click();
        cy.getByTestingAttr("order-property-selection-option").click();

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Auswahl +5€ (inkl. 5,00 EUR)");
        cy.get("#add-item-to-basket-overlay").should("contain", "Option 1");
    });

    it("should fill text input with extra costs", () =>
    {
        const value = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

        cy.getByTestingAttr("order-property-next-slide").click().click().click().click();
        cy.getByTestingAttr("order-property-input-text").type(value);

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Text +5€ (inkl. 5,00 EUR)");
        cy.get("#add-item-to-basket-overlay").should("contain", value);
    });

    it("should fill float number input with extra costs", () =>
    {
        const value = 1.23;

        cy.getByTestingAttr("order-property-next-slide").click().click().click().click();
        cy.getByTestingAttr("order-property-input-float").type(value);

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Kommazahl +5€ (inkl. 5,00 EUR)");
        cy.get("#add-item-to-basket-overlay").should("contain", value);
    });

    it("should fill int input with extra costs", () =>
    {
        const value = 123;

        cy.getByTestingAttr("order-property-next-slide").click().click().click().click();
        cy.getByTestingAttr("order-property-input-int").type(value);

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Ganze Zahl +5€");
        cy.get("#add-item-to-basket-overlay").should("contain", value);
    });

    // should i18n

    function checkPrices(surcharge)
    {
        // TODO implement price check on single item and in basket
    }
});
