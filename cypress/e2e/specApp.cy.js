describe("BathWorld App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("El usuario puede buscar un baño en la barra de búsqueda", () => {
    // Saltar bienvenida
    for (let i = 0; i < 6; i++) {
      cy.get("button[title='Siguiente']").should("be.visible").click();
    }

    // Verificar que el botón "Finalizar" esté visible y haga clic en él si lo está
    cy.get("button[title='Finalizar']")
      .should("be.visible")
      .then(($buttonFinalizar) => {
        if ($buttonFinalizar.length > 0) {
          cy.wrap($buttonFinalizar).click();
        }
      });

    // Barras de búsqueda
    cy.get("button[aria-label='directions']").should("be.visible").click();
    cy.get("input[placeholder='Busca un baño']")
      .should("be.visible")
      .type("Piedra lisa");
    cy.get("span").contains("Baño Piedra Lisa").should("be.visible").click();
  });
});
