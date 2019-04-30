describe('Testing demo page', function() {

    it('Should display demo', function() {
        cy.visit('http://localhost:8080')
        cy.contains('View demo').click()

        cy.url().should('include', '/#/demo')

        cy.get('#throatDiameter').parent().contains('mm')

        cy.get('input#name').should('have.value', 'Demo')
    })

    it('Should restore demo units', function() {
        cy.contains('Try it !').click()

        cy.url().should('include', '/#/motorDesign')

        cy.contains('IMPERIAL').click()
        cy.get('#throatDiameter').parent().contains('inch')

        cy.visit('http://localhost:8080/#/demo')
        cy.get('#throatDiameter').parent().contains('mm')
    })
})
