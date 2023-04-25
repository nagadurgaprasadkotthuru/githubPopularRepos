// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageFilterItemDetails, activeId, onButtonClicked} = props
  const {id, language} = languageFilterItemDetails
  const activeClass = id === activeId ? 'active-tab' : ''
  const buttonClicked = () => onButtonClicked(id)
  return (
    <li className="list-element">
      <button
        className={`button ${activeClass}`}
        type="button"
        onClick={buttonClicked}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
