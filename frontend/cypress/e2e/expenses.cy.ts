describe("Testing expenses", () => {
  const username = Math.random().toString().substring(2);
  const password = "password";
  const catName = Math.random().toString().substring(2);
  const catValue = (Math.random() + 1).toString();
  const curDate = new Date();

  const expMonth = "January";
  let expValue = (Math.random() + 1).toString();

  before(() => {
    // Create a testing account
    cy.visit("/");
    cy.contains("Sign Up").click();
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("#rptpassword").type(password);
    cy.get("button").click();

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
  });

  it("Enter an expense", () => {
    // Log in
    cy.visit("/");
    cy.contains("Log In").click();
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("button").click();

    // Enter and save an expense
    cy.contains("Expenses").click();
    cy.contains(catName).next().next().clear().type(expValue);
    cy.contains(expMonth).next().click();

    // Navigate away and back to verify it saved
    cy.contains("Home").click();
    cy.contains("Expenses").click();
    cy.contains(catName).next().next().filter("td").children().filter("input").then((elem => {
      expect(parseFloat(elem.val() as string)).to.be.closeTo(parseFloat(expValue), 0.0001);
    }));
  });

  it("Update an expense", () => {
    // Log in
    cy.visit("/");
    cy.contains("Log In").click();
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("button").click();

    // Update the expense
    cy.contains("Expenses").click();
    let newValue = (Math.random() + 1).toString();
    cy.contains(catName).next().next().filter("td").children().filter("input").clear()
      .type(newValue);
    expValue = newValue;
    cy.contains(expMonth).next().click();

    // Verify that the expense saved
    cy.contains("Home").click();
    cy.contains("Expenses").click();
    cy.contains(catName).next().next().filter("td").children().filter("input").then((elem => {
      expect(parseFloat(elem.val() as string)).to.be.closeTo(parseFloat(expValue), 0.0001);
    }));
  });

  it("Change year", () => {
    // Log in
    cy.visit("/");
    cy.contains("Log In").click();
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("button").click();

    // Check that the current year is used
    cy.contains("Expenses").click();
    cy.contains(`Expenses for ${curDate.getFullYear().toString()}`);

    // Navigate back
    cy.contains("Prev").click();
    cy.contains(`Expenses for ${(curDate.getFullYear() - 1).toString()}`);

    // Navigate forward
    cy.contains("Next").click();
    cy.contains(`Expenses for ${curDate.getFullYear().toString()}`);
  });
});
