import {BsFilterLeft} from 'react-icons/bs'

import './index.css'

const RestaurantHeader = props => {
  const {sortByOptions, activeOptionId, changeSortBy} = props

  const onChangeSortBy = event => {
    changeSortBy(event.target.value)
  }

  return (
    <div className="menu-container">
      <div className="header-text-container">
        <h1 className="heading">Popular Restaurants</h1>
        <p className="instruction-para">
          Select Your favorite restaurant special dish and make your day
          happy...
        </p>
      </div>
      <div className="sort-by-container">
        <BsFilterLeft size={24} className="sort-by-icon" />
        <p className="sort-by-text">Sort by</p>
        <select
          value={activeOptionId}
          className="select-options"
          onChange={onChangeSortBy}
        >
          {sortByOptions.map(eachOption => (
            <option
              key={eachOption.id}
              value={eachOption.value}
              className="options"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export default RestaurantHeader
