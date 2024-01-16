import {Component} from 'react'
import {v4} from 'uuid'

import './App.css'

class App extends Component {
  state = {
    passwordsList: [],
    inputWebsite: '',
    inputUsername: '',
    inputPassword: '',
    searchInput: '',
    showPasswords: false,
  }

  addNewPassword = event => {
    event.preventDefault()
    const {inputWebsite, inputUsername, inputPassword} = this.state

    const newPassword = {
      id: v4(),
      inputWebsite,
      inputUsername,
      inputPassword,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      inputWebsite: '',
      inputUsername: '',
      inputPassword: '',
    }))
  }

  onChangeWebsiteInput = event => {
    this.setState({inputWebsite: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({inputUsername: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({inputPassword: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  toggleShowPasswords = () => {
    this.setState(prevState => ({
      showPasswords: !prevState.showPasswords,
    }))
  }

  deletePassword = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        password => password.id !== id,
      ),
    }))
  }

  render() {
    const {
      passwordsList,
      inputWebsite,
      inputUsername,
      inputPassword,
      searchInput,
      showPasswords,
    } = this.state

    const filteredPasswords = passwordsList.filter(password =>
      password.inputWebsite.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="password-manager-bg-container">
        <img
          className="password-manager-image"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="top-card">
          <div className="add-new-password-card">
            <h1 className="add-new-password-text">Add New Password</h1>
            <form className="new-password-form" onSubmit={this.addNewPassword}>
              <div className="search-input-container">
                <img
                  alt="website"
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsiteInput}
                  value={inputWebsite}
                />
              </div>

              <div className="search-input-container">
                <img
                  alt="username"
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsernameInput}
                  value={inputUsername}
                />
              </div>

              <div className="search-input-container">
                <img
                  alt="password"
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                />
                <input
                  type="password"
                  className="search-input"
                  placeholder="Enter Password"
                  onChange={this.onChangePasswordInput}
                  value={inputPassword}
                />
              </div>
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
          </div>
          <img
            className="container-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
        </div>

        <div className="bottom-container">
          <div className="bottom-container-top-section">
            <h1 className="bottom-container-heading">Your Passwords</h1>
            <div className="no-of-passwords-container">
              <p>{passwordsList.length}</p>
            </div>
            <div className="search-input-container">
              <img
                alt="search"
                className="search-icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="passwords-checkbox-container">
            <input
              type="checkbox"
              id="passwordsCheckbox"
              onChange={this.toggleShowPasswords}
            />
            <label htmlFor="passwordsCheckbox">Show Passwords</label>
          </div>
          <ul className="passwords-list">
            {filteredPasswords.length > 0 ? (
              filteredPasswords.map(password => (
                <li key={password.id} className="password-item">
                  <p className="website">{password.inputWebsite}</p>
                  <p className="username">{password.inputUsername}</p>
                  {showPasswords ? (
                    <p className="password">{password.inputPassword}</p>
                  ) : (
                    <img
                      className="stars-img"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      alt="stars"
                    />
                  )}
                  <button
                    type="button"
                    className="delete-btn"
                    data-testid="delete"
                    onClick={() => this.deletePassword(password.id)}
                  >
                    <img
                      className="delete-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
                </li>
              ))
            ) : (
              <div className="no-passwords-view">
                <img
                  className="container-image"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p>No Passwords</p>
              </div>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
