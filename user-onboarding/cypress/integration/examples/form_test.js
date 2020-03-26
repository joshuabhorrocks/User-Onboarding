describe("Test our inputs and submit our form", function() {
    beforeEach(function() {
        cy.visit("http://localhost:3000/");
    })
    it("Add tests to inputs and submits the form", function() {
        cy.get('input[name="name"]')
            .type("Bob")
            .should("have.value", "Bob")
        cy.get('input[name="email"]')
            .type("Bob.Ross@happylittletree.com")
            .should("have.value", "Bob.Ross@happylittletree.com")
        cy.get('input[name="password"]')
            .type("NoMistakes")
            .should("have.value", "NoMistakes")
        cy.get('[type="checkbox"]')
            .check()
            .should("be.checked");
        cy.get("button")
            .click()
    })
    //Test 2  
    it("Testing a secondary person", function() {  
        cy.get('input[name="name"]')
            .type("Mr. Rogers")
            .should("have.value", "Mr. Rogers")
        cy.get('input[name="email"]')
            .type("Mr.Rogers@wonderfulneighborhood.com")
            .should("have.value", "Mr.Rogers@wonderfulneighborhood.com")
        cy.get('input[name="password"]')
            .type("HelloNeighbor")
            .should("have.value", "HelloNeighbor")
        cy.get('[type="checkbox"]')
            .check()
            .should("be.checked");
        cy.get("button")
            .click()
    })
        //Test 3
        it("Testing a trinary person", function() {  
            cy.get('input[name="name"]')
                .type("Bad person")
                .should("have.value", "Bad person")
            cy.get('input[name="email"]')
                .type("bademail@nono.com")
                .should("have.value", "bademail@nono.com")
            cy.get('input[name="password"]')
                .type("")
                .should("have.value", "")
            cy.get('[type="checkbox"]')
                .check()
                .should("be.checked");
            cy.get("button")
                .click()
        })
})
