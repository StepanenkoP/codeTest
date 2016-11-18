import React, {Component} from 'react'
import { Link } from 'react-router'

class NoPage extends Component {
  render() {
    return(
      <div className="no_page">
        <h1>Oops! The page you were looking for doesn't exist.</h1>
        <p>You may have mistyped the address or the page may have moved.</p>
        <Link to="/" className="no_page__link">Back to home page</Link>
      </div>
    )
  }
}

export default NoPage;
