import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import categories from '../../data/categories.json'
import './CategoryFilter.css'

interface Props {
  addFilter: (categoryId: string) => void
  removeFilter: (categoryId: string) => void
}

export function CategoryFilter({ addFilter, removeFilter }: Props) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

  const filterGroups = categories.filterGroups

  const findSubcategories = (groupId: string) => {
    return categories.data.find((g) => g.id === groupId)
  }

  const handleClick = (groupId: string) => {
    setActiveGroup(activeGroup === groupId ? null : groupId)
  }

  const handleCheckboxClick = (categoryId: string, checked: boolean) => {
    if (checked) {
      addFilter(categoryId)
    } else {
      removeFilter(categoryId)
    }
  }

  return (
    <>
      <div className="category-filter-container">
        <p className="filter-text">Filters: </p>
        <div className="category-filters">
          {filterGroups.map((group) => (
            <div
              key={group.id}
              className={activeGroup === group.id ? 'filter active' : 'filter'}
              onClick={() => handleClick(group.id)}
            >
              <span>{group.label}</span>
              {activeGroup === group.id ? (
                <FaChevronUp className="icon" />
              ) : (
                <FaChevronDown className="icon" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="subcategory-filter-container">
        {filterGroups.map((group) => {
          return (
            <div
              className={
                activeGroup === group.id ? 'subcategory-filter active' : 'subcategory-filter'
              }
            >
              {group.categoryIds.map((catId) => {
                const subcategories = findSubcategories(catId)
                return (
                  <div className="filter">
                    <input
                      type="checkbox"
                      id={`cat-${catId}`}
                      name={`cat-${catId}`}
                      className="checkbox"
                      onClick={(e) =>
                        handleCheckboxClick(catId, (e.target as HTMLInputElement).checked)
                      }
                    />
                    <label htmlFor={`cat-${catId}`}>{subcategories?.name}</label>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}
