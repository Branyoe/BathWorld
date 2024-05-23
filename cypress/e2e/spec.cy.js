describe("BathWorld App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Frontend can be opened", () => {
    cy.contains("Inicia sesión").should("be.visible");
  });

  it("Login form can be used", () => {
    cy.get("form").should("be.visible");
    cy.get("input:first").type("luis@luis.com");
    cy.get("input:last").type("luisluis");
    cy.get("button").click();
  });
});
