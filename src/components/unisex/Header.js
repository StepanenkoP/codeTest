import React, { Component } from 'react';
import {Link} from 'react-router';
import logo from '../../img/signup/logo.png'
import ham from '../../img/main/ham.png'
import image from '../../img/main/image.png'

class Header extends Component {
  render() {
    return (
      <header className="main_header">
        <div className="main_header__line clearfix">
          <div className="img_wrapper"><Link to="/"><img src={logo} alt="alt"/></Link></div>
          <div className="ham" onClick={this.props.openMenu}><img src={ham} alt="alt"/></div>
          <div className="user">
            <div className="user_img">
              <img src={image} alt="alt"/>
            </div>
            <h3 className="user_name">Chris jones</h3>
            <div className="user_mnu"><span className="logout" onClick={this.props.logOut}>Logout</span><span className="balance">$0.00</span></div>
          </div>
          <h1>{this.props.title}</h1>
          <p className="text">{this.props.text}</p>
          <ul className="main_mnu">
            <li><Link className="main_mnu__link" to="/">Account summary</Link></li>
            <li><Link className="main_mnu__link" to="/adlist">List of Advers</Link></li>
            <li><Link className="main_mnu__link" to="/compaign_list">List of Compaign</Link></li>
            <li><Link className="main_mnu__link" to="/messages">Messages</Link></li>
            <li><Link className="main_mnu__link" to="/payments">Payments</Link></li>
            <li><Link className="main_mnu__link" to="/settings">Settings</Link></li>
          </ul>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  openMenu: React.PropTypes.func.isRequired,
  logOut: React.PropTypes.func.isRequired,
}

export default Header;
