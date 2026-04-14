import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import names from '../data/names.json'
import { PetNameList } from '../components/PetNameList/PetNameList'

describe('PetNameList', () => {
  it('marks the middle visible item as active when no pet is selected', () => {
    render(
      <PetNameList
        activeGender="Male"
        activeLetter="A"
        activePet={null}
        activeCategories={[]}
        currentPage={1}
        setCurrentPage={() => {}}
        setActivePet={() => {}}
      />,
    )

    const filteredPets = names.data.filter((pet) => {
      return pet.gender.includes('M') && pet.title[0].toLowerCase() === 'a'
    })

    const visiblePets = filteredPets.slice(0, 7)
    const middlePet = visiblePets[Math.floor(visiblePets.length / 2)]

    expect(screen.getByText(middlePet.title)).toHaveClass('active')
  })

  it('moves to the next page when the down chevron is clicked', async () => {
    const user = userEvent.setup()
    const setCurrentPage = vi.fn()

    render(
      <PetNameList
        activeGender="Male"
        activeLetter="A"
        activePet={null}
        activeCategories={[]}
        currentPage={1}
        setCurrentPage={setCurrentPage}
        setActivePet={() => {}}
      />,
    )

    await user.click(screen.getByRole('button', { name: /next page/i }))

    expect(setCurrentPage).toHaveBeenCalledWith(2)
  })
})
