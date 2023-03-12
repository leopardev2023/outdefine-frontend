describe("Talent Login Flow", () => {
  beforeEach(() => {
    cy.viewport(1500, 900);
    cy.visit("/");
    cy.get(
      "[data-cy=\"login-container\"] > [data-cy=\"login\"] > form > :nth-child(1) > [data-cy=\"email\"]",
    ).clear("");
    cy.get(
      "[data-cy=\"login-container\"] > [data-cy=\"login\"] > form > :nth-child(1) > [data-cy=\"email\"]",
    ).type("gagan+2@outdefine.com");
    cy.get(
      "[data-cy=\"login-container\"] > [data-cy=\"login\"] > form > :nth-child(2) > [data-cy=\"password\"]",
    ).clear();
    cy.get(
      "[data-cy=\"login-container\"] > [data-cy=\"login\"] > form > :nth-child(2) > [data-cy=\"password\"]",
    ).type("Gagandeep@12345");
    cy.get(
      "[data-cy=\"login-container\"] > [data-cy=\"login\"] > form > [data-cy=\"login-button\"] > [data-cy=\"button\"]",
    ).click();
    cy.intercept("GET", "skill").as("getSkills");
    cy.wait("@getSkills", { timeout: 55000 });
  });

  it("dashboard to be visible", () => {
    cy.get("[data-cy=\"dashboard\"]").should("be.visible");
  });

  const dashboardContainer = (i) => `:nth-child(${i}) > [data-cy=\"profile-container\"] `;
  const targetNavLink = " > :nth-child(2) > [data-cy=\"navlink\"]";
  it("can open profile page", () => {
    cy.get(`${dashboardContainer(1)} ${targetNavLink}`)
      .should("exist")
      .then(() => {
        cy.get(`${dashboardContainer(1)} ${targetNavLink}`).click();
      });
  });

  it("can open view jobs page", () => {
    cy.get(`${dashboardContainer(3)} ${targetNavLink}`)
      .should("exist")
      .then(() => {
        cy.get(`${dashboardContainer(3)} ${targetNavLink}`).click();
        cy.intercept(
          "POST",
          "**/recommended/?skip=0&limit=200&hourly_max_rate=200&hourly_min_rate=0",
        ).as("getJobs");
        cy.wait("@getJobs", { timeout: 55000 });
        cy.get("[data-cy=\"job-button-container\"] > a > [data-cy=\"button\"]").first().click();
      });
  });

  it("assesment sidebar and token sidebar functionality", () => {
    cy.get(":nth-child(3) > [data-cy=\"sidebar-link-assessments\"]").click();
    cy.intercept("GET", "getAssessmentData").as("getData");
    cy.wait("@getData", { timeout: 55000 });
    cy.get(":nth-child(3) > [data-cy=\"category-name\"]")
      .should("have.text", "Business")
      .then(() => {
        cy.get(":nth-child(3) > [data-cy=\"category-name\"]").click();
        cy.get("[data-cy=\"category-item\"] > :nth-child(1) > [data-cy=\"category-name\"]").should(
          "be.visible",
        );
        cy.get("[data-cy=\"category-item\"] > :nth-child(1) > [data-cy=\"category-name\"]").should(
          "be.visible",
        );
        cy.get("[data-cy=\"category-item\"] > :nth-child(1) > [data-cy=\"category-name\"]").click();
      });
    cy.get(":nth-child(4) > [data-cy=\"sidebar-link-tokens\"]").click();
    cy.get("[data-cy=\"tab-navigation-container\"] > :nth-child(3)")
      .should("have.text", "Referrals")
      .then(() => {
        cy.get("[data-cy=\"tab-navigation-container\"] > :nth-child(3)").click();
      });
    cy.get("[data-cy=\"tab-navigation-container\"] > :nth-child(2)")
      .should("have.text", "FAQs & Growth")
      .then(() => {
        cy.get("[data-cy=\"tab-navigation-container\"] > :nth-child(2)").click();
      });
  });
});
