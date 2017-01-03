import React, { Component } from 'react';
import {Link} from 'react-router';
import hamclose from '../../img/main/hamclose.png'
import image from '../../img/main/image.png'
import {connect} from 'react-redux'
import {getUserInfo} from '../../AC/accountAC'
import ring from '../../img/main/ring.svg'

class MobileMenu extends Component {
  componentDidMount() {
    this.props.getUserInfo()
  }

  logOut = () => {
    localStorage.removeItem('token');
    this.context.router.push('/login');
  }

  render() {
    console.log(this.props);
    const user = this.props.userInfo !== null ? <div className="user">
      <div className="user_img" style={{backgroundColor: this.props.userInfo.color}}>
        {this.props.userInfo.first_name.slice(0, 1)}
      </div>
      <h3 className="user_name">{`${this.props.userInfo !== null ? this.props.userInfo.first_name : ''} ${this.props.userInfo !== null ? this.props.userInfo.last_name : ''}`}</h3>
      <div className="user_mnu"><span className="logout" onClick={this.logOut}>Logout</span>{this.props.userInfo.user_type !== 'admin' ? <span className="balance">&#163;{this.props.userInfo !== null ? this.props.userInfo.balance: ''}</span> : null}</div>
    </div> : <div style={{textAlign: 'center', float: 'right', paddingTop: '20px'}}><img src={ring} alt="alt" /></div>

    const menu = this.props.userInfo !== null && this.props.userInfo.user_type !== 'admin' ?
    <ul className="mobile_ul">
      <li><Link className="mobile_ul__link" onClick={this.props.closeMenu} to="/">Account summary</Link></li>
      <li><Link className="mobile_ul__link" onClick={this.props.closeMenu} to="/advers_list">List of Adverts</Link></li>
      <li><Link className="mobile_ul__link" onClick={this.props.closeMenu} to="/campaign_list">List of Compaign</Link></li>
      <li><Link className="mobile_ul__link" onClick={this.props.closeMenu} to="/messages">Messages</Link></li>
      <li><Link className="mobile_ul__link" onClick={this.props.closeMenu} to="/payments">Payments</Link></li>
      <li><Link className="mobile_ul__link" onClick={this.props.closeMenu} to="/settings">Settings</Link></li>
    </ul> :
    <ul className="mobile_ul">
      <li><Link className="mobile_ul__link" onClick={this.props.closeMenu} to="/users">Users</Link></li>
      <li><Link className="mobile_ul__link" onClick={this.props.closeMenu} to="/adverts">Adverts</Link></li>
      <li><Link className="mobile_ul__link" onClick={this.props.closeMenu} to="/messages">Messages</Link></li>
      <li><Link className="mobile_ul__link" onClick={this.props.closeMenu} to="/settings">Settings</Link></li>
    </ul>

    return (
      <div className="mobile_mnu">
        <div className="mobile_head">
          <div className="ham" onClick={this.props.closeMenu}><img src={hamclose} alt="alt"/></div>
          {user}
        </div>
        {menu}
      </div>
    )
  }
}

MobileMenu.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps({accountData}) {
  return {
    userInfo: accountData.userInfo
  }
}

export default connect(mapStateToProps, {getUserInfo})(MobileMenu);
