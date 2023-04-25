import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apisConstantsStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    repositoriesList: [],
    activeId: languageFiltersData[0].id,
    apiStatus: apisConstantsStatus.initial,
  }

  componentDidMount() {
    this.getRepositoryItems()
  }

  onButtonClicked = activeTabId =>
    this.setState({activeId: activeTabId}, this.getRepositoryItems)

  getRepositoryItems = async () => {
    this.setState({apiStatus: apisConstantsStatus.inProgress})
    const {activeId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const popularRepos = data.popular_repos
      const formattedData = popularRepos.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        repositoriesList: formattedData,
        apiStatus: apisConstantsStatus.success,
      })
    } else {
      this.setState({apiStatus: apisConstantsStatus.failure})
    }
  }

  getHeader = () => {
    const {activeId} = this.state
    return (
      <>
        <h1 className="main-heading">Popular</h1>
        <ul className="tabs-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              languageFilterItemDetails={eachItem}
              activeId={activeId}
              onButtonClicked={this.onButtonClicked}
              key={eachItem.id}
            />
          ))}
        </ul>
      </>
    )
  }

  renderRepositories = () => {
    const {repositoriesList} = this.state
    return (
      <div className="bg-container">
        {this.getHeader()}
        <ul className="repositories-container">
          {repositoriesList.map(eachRepository => (
            <RepositoryItem
              repositoryItemDetails={eachRepository}
              key={eachRepository.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="bg-container">
      {this.getHeader()}
      <div data-testid="loader" className="loader-container">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    </div>
  )

  renderFailure = () => (
    <div className="bg-container">
      {this.getHeader()}
      <div className="failure-container">
        <img
          className="failure-image"
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        />
      </div>
      <p className="failure">Something Went Wrong</p>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apisConstantsStatus.success:
        return this.renderRepositories()
      case apisConstantsStatus.inProgress:
        return this.renderLoader()
      case apisConstantsStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }
}

export default GithubPopularRepos
