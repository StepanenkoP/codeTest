import React, { Component } from 'react';
import FlashList from '../flash/FlashList'
import SettingsForm from './SettingsForm'
import {Link} from 'react-router'
import Footer from '../unisex/Footer'
import Header from '../unisex/Header'
import ham from '../../img/main/ham.png'
import image from '../../img/main/image.png'


class SettingsPage extends Component {
  state = {
    isOpen: false
  }

  openMenu = () => {
    this.setState({
      isOpen: true
    })
  }

  closeMenu = () => {
    this.setState({
      isOpen: false
    })
  }

  logOut = () => {
    localStorage.removeItem('token');
    this.context.router.push('/login');
  }

  render() {
    const mobileMenu = this.state.isOpen ? <div className="mobile_mnu">
      <div className="mobile_head">
        <div className="ham" onClick={this.closeMenu}><img src={ham} alt="alt"/></div>
        <div className="user">
          <div className="user_img">
            <img src={image} alt="alt"/>
          </div>
          <h3 className="user_name">Chris jones</h3>
          <div className="user_mnu"><span className="logout" onClick={this.logOut}>Logout</span><span className="balance">$0.00</span></div>
        </div>
      </div>
      <ul className="mobile_ul">
        <li><Link className="mobile_ul__link" to="/">Account summary</Link></li>
        <li><Link className="mobile_ul__link" to="/adlist">List of Advers</Link></li>
        <li><Link className="mobile_ul__link" to="/compaign_list">List of Compaign</Link></li>
        <li><Link className="mobile_ul__link" to="/messages">Messages</Link></li>
        <li><Link className="mobile_ul__link" to="/payments">Payments</Link></li>
        <li><Link className="mobile_ul__link" to="/settings">Settings</Link></li>
      </ul>
    </div> : null
    return (
      <div className="main_wrapper">
        {mobileMenu}
        <FlashList />
        <Header
          title="Settings"
          text="Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per."
          openMenu={this.openMenu}
          logOut={this.logOut}
        />
        <SettingsForm />
        <Footer />
      </div>
    );
  }
}

SettingsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SettingsPage;
