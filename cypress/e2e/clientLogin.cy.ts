describe("Client Login Flow", () => {
  beforeEach(() => {
    cy.viewport(1500, 900);
    cy.visit("/");
    cy.get(
      "[data-cy=\"login-container\"] > [data-cy=\"login\"] > form > :nth-child(1) > [data-cy=\"email\"]",
    ).clear("");
    cy.get(
      "[data-cy=\"login-container\"] > [data-cy=\"login\"] > form > :nth-child(1) > [data-cy=\"email\"]",
    ).type("gagan+4@outdefine.com");
    cy.get(
      "[data-cy=\"login-container\"] > [data-cy=\"login\"] > form > :nth-child(2) > [data-cy=\"password\"]",
    ).clear();
    cy.get(
      "[data-cy=\"login-container\"] > [data-cy=\"login\"] > form > :nth-child(2) > [data-cy=\"password\"]",
    ).type("Gagandeep@12345");
    cy.get(
      "[data-cy=\"login-container\"] > [data-cy=\"login\"] > form > [data-cy=\"login-button\"] > [data-cy=\"button\"]",
    ).click();
    cy.intercept("POST", "getTeamMembers").as("getTeamMembers");
    cy.wait("@getTeamMembers", { timeout: 55000 });
  });

  it("client dashboard to be visible", () => {
    cy.get("[data-cy=\"client-dashboard\"]").should("be.visible");
  });

  const dashboardContainer = (i) => `:nth-child(${i}) > [data-cy=\"profile-container\"] `;
  const targetNavLink = " > :nth-child(2) > [data-cy=\"navlink\"]";
  it("can view client profile page", () => {
    cy.get(`${dashboardContainer(1)} ${targetNavLink}`)
      .should("exist")
      .then(() => {
        cy.get(`${dashboardContainer(1)} ${targetNavLink}`).click();
        cy.get("[data-cy=\"tab-container\"]> :nth-child(2)").click();
        cy.get("[data-cy=\"client-job-label\"]").should("exist");
      });
  });

  it("can open talent profile", () => {
    cy.get(`${dashboardContainer(3)} ${targetNavLink}`)
      .should("exist")
      .then(() => {
        cy.get(`${dashboardContainer(3)} ${targetNavLink}`).click();
        cy.get("[data-cy=\"card-label\"]")
          .should("exist")
          .then(() => {
            cy.intercept("GET", "vetted").as("vettedTalent");
            cy.wait("@vettedTalent", { timeout: 55000 });
            cy.get(":nth-child(1) > [data-cy=\"card-talent\"] > .bg-white").should("exist").click();
          });
      });
  });
});
