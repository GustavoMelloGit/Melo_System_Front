import { render, screen } from '@testing-library/react'
import ClientsListView from '../../view/List'

describe('tests clients list render', () => {
  test('render clients table', () => {
    render(<ClientsListView />)
    const clientsTable = screen.getByRole('table')
    expect(clientsTable).toBeInTheDocument()
  })
})
