describe("Testing categories", () => {
  const username = Math.random().toString().substring(2);
  const password = "password";
  const catName = Math.random().toString().substring(2);
  let catValue = (Math.random() + 1).toString();

  // Create a testing account
  it("Sign up", () => {
    cy.visit("/");
    cy.contains("Sign Up").click();
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("#rptpassword").type(password);
    cy.get("button").click();

    // Redirect to login page
    cy.contains("Log In to Personal Budget");
  });

  // Log in to the testing account
  it("Log in", () => {
    cy.visit("/");
    cy.contains("Log In").click();
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("button").click();

    // Redirect to home page
    cy.contains("Dashboard");
  });

  it("Create a category", () => {
    // Log in
    cy.visit("/login");
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("button").click();

    // Create the category
    cy.contains("Configure").click();
    cy.get("#newName").type(catName);
    cy.get("#newValue").clear().type(catValue);
    cy.contains("Create").click();

    // Verify it was created
    cy.contains(catName);
    cy.get("input").then((elem) => {
      expect(parseFloat(elem.val() as string)).to.be.closeTo(parseFloat(catValue), 0.0001);
    });
  });

  it("Update category", () => {
    // Log in
    cy.visit("/login");
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("button").click();

    // Enter and save a new value
    cy.contains("Configure").click();
    let newValue = (Math.random() + 1).toString();
    cy.get("tr:nth-child(2) input").clear().type(newValue);
    catValue = newValue;
    cy.contains("Update").click();
    cy.contains("Successfully updated the budget.");

    // Navigate away and back to verify the value was actually updated
    cy.contains("Home").click();
    cy.contains("Configure").click();
    cy.get("tr:nth-child(2) input").then((elem) => {
      expect(parseFloat(elem.val() as string)).to.be.closeTo(parseFloat(catValue), 0.0001);
    });
  });

  it("Delete category", () => {
    // Log in
    cy.visit("/login");
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("button").click();

    // Delete the expense
    cy.contains("Configure").click();
    cy.contains("Delete").click();

    // Check if the category no longer exists
    cy.contains(catName).should("not.exist");
  });
});
