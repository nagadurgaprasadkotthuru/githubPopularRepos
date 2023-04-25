// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryItemDetails} = props
  const {
    name,
    avatarUrl,
    forksCount,
    issuesCount,
    starsCount,
  } = repositoryItemDetails
  return (
    <li className="list-item">
      <img className="repo-image" alt={name} src={avatarUrl} />
      <h2 className="name">{name}</h2>
      <div className="results-container">
        <p className="results">
          <img
            className="icon-images"
            alt="stars"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          />
          {starsCount} stars
        </p>
        <p className="results">
          <img
            className="icon-images"
            alt="forks"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          />
          {forksCount} forks
        </p>
        <p className="results">
          <img
            className="icon-images"
            alt="open issues"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          />
          {issuesCount} open issues
        </p>
      </div>
    </li>
  )
}

export default RepositoryItem
