import React, { Component } from 'react'
import profile from '../../img/users/Profile.png'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getAllUsers, blockUser} from '../../AC/accountAC'
import ring from '../../img/main/ring.svg'
import moment from 'moment'
import Pagination from '../unisex/Pagination'
import $ from 'jquery'


class UsersForm extends Component {

  state = {
    activePage: 1,
    preloader: false
  }

  componentDidMount() {
    this.props.getAllUsers(this.state.activePage)
  }

  linkClick = (from, id) => {
    localStorage.setItem('from', from)
    localStorage.setItem('advert_id', id)
  }

  handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber});
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.activePage !== nextState.activePage) {
      this.setState({
        preloader: true
      })
      this.props.getAllUsers(nextState.activePage).then(
        r => {
          if (r.payload) {
            this.setState({
              preloader: false
            })
          }
        }
      )
    }
  }


  blockToggle = (id) => {
    this.props.blockUser(id)
  }


  render () {
    console.log(this.props);
    const items = this.props.allUsers !== null ? this.props.allUsers.data.map(item => {
      const localTime = moment(moment.utc(item.last_message_at).local().format("YYYY-MM-DD HH:mm"))
      return <div key={item.id} onClick={() => this.linkClick(item.from, item.advertisement_slug)}>
        <div className={`messages_row users_row ${item.blocked ? 'blocked' : 'unblocked'} clearfix`}>
          <div className="user_id">C01</div>
          <div className="user_name">Chris</div>
          <div className="user_surname">Jones</div>
          <div className="user_date">11/01/2016</div>
          <div className="user_campaigns">15</div>
          <div className="user_ads">15</div>
          <div className="user_spent">£84.95</div>
          <div className="user_balance">£84.95</div>
          <div className="user_block"><div className="block" onClick={() => this.blockToggle(item.id)}></div></div>
        </div>
      </div>
    }) : null

    const users = this.props.allUsers !== null && !this.state.preloader ? <div className="messages_wrapper">
      <div className="messages">
        <div className="messages_row users_row clearfix">
          <div className="user_id">ID</div>
          <div className="user_name">First name</div>
          <div className="user_surname">Last name</div>
          <div className="user_date">Date of <br/>registration</div>
          <div className="user_campaigns">Number of campaigns</div>
          <div className="user_ads">Number of <br/>ads</div>
          <div className="user_spent">Spent</div>
          <div className="user_balance">Balance</div>
          <div className="user_block">Block</div>
        </div>
        {items}
      </div>
    </div> : <div style={{textAlign: 'center'}}><img src={ring} alt="alt" style={{paddingBottom: '50px', paddingTop: '50px'}}/></div>

  const pagination = this.props.allUsers !== null && this.props.allUsers.data.length === 20 ? <div style={{textAlign: 'center'}}>
    <Pagination
      activePage={this.state.activePage}
      itemsCountPerPage={20}
        totalItemsCount={this.props.allUsers.total}
        pageRangeDisplayed={5}
        onChange={this.handlePageChange}
      />
    </div> : this.props.allUsers !== null && this.props.allUsers.current_page === this.props.allUsers.last_page ?
    <div style={{textAlign: 'center'}}>
      <Pagination
        activePage={this.state.activePage}
        itemsCountPerPage={20}
        totalItemsCount={this.props.allUsers.total}
        pageRangeDisplayed={5}
        onChange={this.handlePageChange}
      />
    </div> : null

    return (
      <div className="settings_wrapper">
        <div className="settings_wrapper__form mess">
          <div className="title">
            <div className="img_wrapper"><img src={profile} alt="alt"/></div>
            List of Users
            <div className="filter"><span className="active">All</span><span className="bold">|</span><span>Blocked</span></div>
          </div>
          {users}
          {this.props.allUsers !== null && !this.props.allUsers.data.length && <div className="no_data" style={{textAlign: 'center'}}>No data</div>}
          {!this.state.preloader ? pagination : null}
        </div>
      </div>
    )
  }
}

function mapStateToProps({adminInfo}) {
  return {
    allUsers: adminInfo.allUsers,
  }
}

export default connect (mapStateToProps, {getAllUsers, blockUser})(UsersForm);
