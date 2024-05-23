describe("BathWorld Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/sign-in");
  });

  it("El frontend se renderiza", () => {
    cy.contains("Inicia sesión").should("be.visible");
  });

  it("El formulario del login puede ser usado", () => {
    cy.get("form").should("be.visible");
    cy.get("input:first").type("luis@luis.com");
    cy.get("input:last").type("luisluis");
    cy.get("button").click();
  });
});
