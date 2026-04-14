import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('App', () => {
  it('renders the main heading and filter controls', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /all pets names/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^male$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^female$/i })).toBeInTheDocument()
  })

  it('updates the visible list when the gender filter changes', async () => {
    const user = userEvent.setup()

    render(<App />)

    expect(screen.getByText('Aaron')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^female$/i }))

    expect(screen.getByText('Abby')).toBeInTheDocument()
    expect(screen.queryByText('Aaron')).not.toBeInTheDocument()
  })
})
