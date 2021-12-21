import {Component} from 'react'
import {BsFilterLeft} from 'react-icons/bs'
import {IoMdArrowDropup} from 'react-icons/io'
import './index.css'

class RestaurantHeader extends Component {
  state = {showFilter: false}

  onClickShow = () => {
    this.setState(prevState => ({showFilter: !prevState.showFilter}))
  }

  onChangeSortBy = event => {
    const {changeSortby} = this.props
    changeSortby(event.target.value)
  }

  showFilters = () => {
    const {sortByOptions, activeOptionId} = this.props
    return (
      <div className="desktop-filter">
        <select
          size="2"
          value={activeOptionId}
          className="sort-by-select"
          onChange={this.onChangeSortBy}
        >
          {sortByOptions.map(eachOption => (
            <option
              key={eachOption.id}
              value={eachOption.value}
              className="select-options"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    )
  }

  render() {
    const {activeOptionId} = this.props
    const {showFilter} = this.state
    return (
      <div className="menu-container">
        <div className="header-text-container">
          <h1 className="heading">Popular Restaurants</h1>
          <p className="instruction-para">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
        </div>
        <div className="sort-by-container">
          <button
            type="button"
            className="filter-button-container"
            onClick={this.onClickShow}
          >
            <BsFilterLeft size={24} className="sort-by-icon" />
            <p className="sort-by-text">
              Sort by <span className="option-id">{activeOptionId}</span>
              <span>
                <IoMdArrowDropup size={14} className="drop-arrow" />
              </span>
            </p>
          </button>
          {showFilter && this.showFilters()}
        </div>
      </div>
    )
  }
}
export default RestaurantHeader
