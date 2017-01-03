import React, { Component } from 'react';
import {Link} from 'react-router';
import logo from '../../img/signup/logo.png'
import ham from '../../img/main/ham.png'
import image from '../../img/main/image.png'
import {connect} from 'react-redux'
import {getUserInfo} from '../../AC/accountAC'
import ring from '../../img/main/ring.svg'

class Header extends Component {
  componentDidMount() {
    this.props.getUserInfo()
  }
  render() {
    console.log(this.props);
    const floatAdmin = this.props.userInfo !== null && this.props.userInfo.user_type !== 'admin' ? {float: 'left'} : {float: 'right'}
    const user = this.props.userInfo !== null ? <div className="user">
      <div className="user_img" style={{backgroundColor: this.props.userInfo.color}}>
        {this.props.userInfo.first_name.slice(0, 1)}
      </div>
      <h3 className="user_name">{`${this.props.userInfo !== null ? this.props.userInfo.first_name : ''} ${this.props.userInfo !== null ? this.props.userInfo.last_name : ''}`}</h3>
      <div className="user_mnu"><span className="logout" onClick={this.props.logOut} style={floatAdmin}>Logout</span>{this.props.userInfo.user_type !== 'admin' ? <span className="balance">&#163;{this.props.userInfo !== null ? this.props.userInfo.balance: ''}</span> : null}</div>
    </div> : <div style={{textAlign: 'center', float: 'right', paddingTop: '20px'}}><img src={ring} alt="alt" /></div>

  const menu = this.props.userInfo !== null && this.props.userInfo.user_type !== 'admin' ?
  <ul className="main_mnu">
    <li><Link className="main_mnu__link" to="/">Account summary</Link></li>
    <li><Link className="main_mnu__link" to="/advers_list">List of Adverts</Link></li>
    <li><Link className="main_mnu__link" to="/campaign_list">List of Compaign</Link></li>
    <li><Link className="main_mnu__link" to="/messages">Messages</Link></li>
    <li><Link className="main_mnu__link" to="/payments">Payments</Link></li>
    <li><Link className="main_mnu__link" to="/settings">Settings</Link></li>
  </ul> :
  <ul className="main_mnu">
    <li><Link className="main_mnu__link" to="/users">Users</Link></li>
    <li><Link className="main_mnu__link" to="/adverts">Adverts</Link></li>
    <li><Link className="main_mnu__link" to="/messages">Messages</Link></li>
    <li><Link className="main_mnu__link" to="/settings">Settings</Link></li>
  </ul>

    return (
      <header className="main_header">
        <div className="main_header__line clearfix">
          <div className="img_wrapper"><Link to="/"><img src={logo} alt="alt"/></Link></div>
          <div className="ham" onClick={this.props.openMenu}><img src={ham} alt="alt"/></div>
          {user}
          <h1>{this.props.title}</h1>
          <p className="text">{this.props.text}</p>
          {menu}
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

function mapStateToProps({accountData}) {
  return {
    userInfo: accountData.userInfo
  }
}

export default connect(mapStateToProps, {getUserInfo})(Header);
