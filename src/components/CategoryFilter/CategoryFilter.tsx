import { FaChevronDown } from 'react-icons/fa'
import './CategoryFilter.css'

// interface Props {
//   categories: string[]
// }

export function CategoryFilter() {
  return (
    <div className="category-filter-container">
      <p className="filter-text">Filters: </p>
      <div className="category-filters">
        <div className="filter">
          <span>Dog</span>
          <FaChevronDown className="icon" />
        </div>
        <div className="filter">
          <span>Cat</span>
          <FaChevronDown className="icon" />
        </div>
        <div className="filter">
          <span>Other</span>
        </div>
      </div>
    </div>
  )
}
