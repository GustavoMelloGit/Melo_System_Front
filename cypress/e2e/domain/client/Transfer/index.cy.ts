import { Routes } from '../../../../../src/lib/routes'

describe('Client Domain - Transfer between clients', () => {
  beforeEach(() => {
    cy.login()
    cy.visit(Routes.transfer)
  })

  it('should render page', () => {
    cy.dataCy('client-transfer-page').should('exist')
  })

  it('should not allow submit before filling form', () => {
    cy.dataCy('submit-button').click()
    cy.get('.toaster-success').should('not.exist')
  })

  it('should be able to select both clients', () => {
    cy.dataCy('from-name-input').focus()
    cy.dataCy('autocomplete-options').children().first().click()
    cy.dataCy('to-name-input').focus()
    cy.dataCy('autocomplete-options').children().eq(4).click()
  })

  it('should mirror currency transfer form values', () => {
    const valueInCents = 10000
    cy.dataCy('from-transferType-input').select('currency')
    cy.dataCy('from-currency-input').type(valueInCents.toString())
    cy.dataCy('to-transferType-input').should('have.value', 'currency')
    cy.dataCy('to-currency-input')
      .invoke('val')
      .then((value: string) => {
        const valueInNumber = value.match(/\d+/g).join('')
        expect(Number(valueInNumber)).to.eq(valueInCents)
      })
  })
  it('should mirror coffee transfer form values', () => {
    cy.dataCy('from-transferType-input').select('coffee')
    cy.dataCy('from-coffeeType-input').select('conilon')
    cy.dataCy('to-coffeeType-input')
      .invoke('val')
      .then((value: string) => {
        expect(value).to.eq('conilon')
      })
    cy.dataCy('from-bebida-input').select('riado_rio')
    cy.dataCy('to-bebida-input')
      .invoke('val')
      .then((value: string) => {
        expect(value).to.eq('riado_rio')
      })
    cy.dataCy('from-bags-input').clear().type('20')
    cy.dataCy('to-bags-input')
      .invoke('val')
      .then((value: string) => {
        expect(value).to.eq('20')
      })
    cy.dataCy('from-weight-input').clear().type('10')
    cy.dataCy('to-weight-input')
      .invoke('val')
      .then((value: string) => {
        expect(value).to.eq('10')
      })
  })

  it('should mirror escolha transfer form values', () => {
    cy.dataCy('from-transferType-input').select('escolha')
    cy.dataCy('from-bags-input').clear().type('20')
    cy.dataCy('to-bags-input')
      .invoke('val')
      .then((value: string) => {
        expect(value).to.eq('20')
      })
    cy.dataCy('from-weight-input').clear().type('10')
    cy.dataCy('to-weight-input')
      .invoke('val')
      .then((value: string) => {
        expect(value).to.eq('10')
      })
  })

  it('should be able to change receiver transfer type without mirroring', () => {
    const selectedOption = 'coffee'
    cy.dataCy('to-transferType-input').select(selectedOption)
    cy.dataCy('from-transferType-input').should('not.have.value', selectedOption)
  })

  it('should display coffee related entries in selected receiver coffee transfer type', () => {
    cy.dataCy('to-transferType-input').select('coffee')
    cy.dataCy('to-coffeeType-input').should('exist')
    cy.dataCy('to-bebida-input').should('exist')
    cy.dataCy('to-bags-input').should('exist')
    cy.dataCy('to-weight-input').should('exist')
  })

  it('should display escolha related fields on receiver transfer', () => {
    cy.dataCy('to-transferType-input').select('escolha')
    cy.dataCy('to-bags-input').should('exist')
    cy.dataCy('to-weight-input').should('exist')
  })

  it('should be able to successfully transfer currency between clients by mirroring', () => {
    // Choose clients
    cy.dataCy('from-name-input').focus()
    cy.dataCy('autocomplete-options').children().first().click()
    cy.dataCy('to-name-input').focus()
    cy.dataCy('autocomplete-options').children().eq(4).click()

    // Fill currency form values
    cy.dataCy('from-transferType-input').select('currency')
    cy.dataCy('from-currency-input').type('10000')

    // Submit data
    cy.dataCy('submit-button').click()
    cy.get('.toaster-success').should('exist')
  })

  it('should be able to successfully transfer coffee between clients by mirroring', () => {
    // Choose clients
    cy.dataCy('from-name-input').focus()
    cy.dataCy('autocomplete-options').children().first().click()
    cy.dataCy('to-name-input').focus()
    cy.dataCy('autocomplete-options').children().eq(4).click()

    // Fill currency form values
    cy.dataCy('from-transferType-input').select('coffee')
    cy.dataCy('from-coffeeType-input').select('conilon')
    cy.dataCy('from-bebida-input').select('riado_rio')
    cy.dataCy('from-bags-input').clear().type('20')
    cy.dataCy('from-weight-input').clear().type('10')

    // Submit data
    cy.dataCy('client-transfer-form').submit()
    cy.get('.toaster-success').should('exist')
  })
})
