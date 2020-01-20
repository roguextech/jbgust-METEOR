describe('Run Finocyl in SI units', function() {
    it('Should submit form', function() {
        cy.visit('/#/motorDesign')

        cy.setMotorSimAdvancedConfig()

        const formDatas = {
            throatDiameter: 10,
            chamberInnerDiameter: 40,
            chamberLength: 150,
            propellantType: 'KNSU',
            segmentLength: 70,
            numberOfSegment: 2,
            outerDiameter: 30,
            innerDiameter: 10,
            finWidth: 2.0,
            finDiameter: 20.0,
            finCount: 5,
            endsSurface: 'Exposed'
        }

        // Flag cypress test in production
        localStorage.setItem('computationHash', 'cypress')
        cy.fillFinocylForm(formDatas, 'METRIC')

        // Check presence of computationHash
        expect(localStorage.getItem('computationHash')).not.to.be.null

        // Le calcul peut mettre plus de temps que le timeout sur la CI.
        cy.wait(5000)
    })

    it('Should check result', () => {
        const expectedResults = {
            motorClasss: 'H215',
            thrustTime: '0.85',
            maxThrust: '393.83',
            totalImpulse: '181.61',
            isp: '126.17',
            maxPressure: '36.01',
            averagePressure: '23.71',
            nozzleExitSpeed: '2.96'
        }

        cy.checkPerformanceResults(expectedResults, 'METRIC')
    })
})
