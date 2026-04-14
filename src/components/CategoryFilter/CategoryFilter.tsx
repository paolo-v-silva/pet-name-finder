import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import categories from '../../data/categories.json'
import './CategoryFilter.css'

export function CategoryFilter() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

  const filterGroups = categories.filterGroups

  const findSubcategories = (groupId: string) => {
    return categories.data.find((g) => g.id === groupId)
  }

  const handleClick = (groupId: string) => {
    setActiveGroup(activeGroup === groupId ? null : groupId)
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
                    <input type="checkbox" name={`cat-${catId}`} className="checkbox" />
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
