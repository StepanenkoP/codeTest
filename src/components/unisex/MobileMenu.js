import React, { Component } from 'react';
import {Link} from 'react-router';
import hamclose from '../../img/main/hamclose.png'
import image from '../../img/main/image.png'

class MobileMenu extends Component {
  render() {
    return (
      <div className="mobile_mnu">
        <div className="mobile_head">
          <div className="ham" onClick={this.props.closeMenu}><img src={hamclose} alt="alt"/></div>
          <div className="user">
            <div className="user_img">
              <img src={image} alt="alt"/>
            </div>
            <h3 className="user_name">Chris jones</h3>
            <div className="user_mnu"><span className="logout" onClick={this.logOut}>Logout</span><span className="balance">$0.00</span></div>
          </div>
        </div>
        <ul className="mobile_ul">
          <li><Link className="mobile_ul__link" onClick={this.props.closeMenu} to="/">Account summary</Link></li>
          <li><Link className="mobile_ul__link" onClick={this.props.closeMenu} to="/advers_list">List of Adverts</Link></li>
          <li><Link className="mobile_ul__link" onClick={this.props.closeMenu} to="/compaign_list">List of Compaign</Link></li>
          <li><Link className="mobile_ul__link" onClick={this.props.closeMenu} to="/messages">Messages</Link></li>
          <li><Link className="mobile_ul__link" onClick={this.props.closeMenu} to="/payments">Payments</Link></li>
          <li><Link className="mobile_ul__link" onClick={this.props.closeMenu} to="/settings">Settings</Link></li>
        </ul>
      </div>
    )
  }
}

export default MobileMenu;
