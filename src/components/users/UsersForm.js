import React, { Component } from 'react'
import profile from '../../img/users/Profile.png'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getAllUsers, blockUser, getFilteredUsers} from '../../AC/accountAC'
import ring from '../../img/main/ring.svg'
import moment from 'moment'
import Pagination from '../unisex/Pagination'
import $ from 'jquery'


class UsersForm extends Component {

  state = {
    activePage: 1,
    preloader: false,
    activeOn: 'all'
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
    if (this.state.activePage !== nextState.activePage && this.state.activeOn == nextState.activeOn && this.state.activeOn == 'all') {
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
    if (this.state.activePage !== nextState.activePage && this.state.activeOn == nextState.activeOn && this.state.activeOn !== 'all') {
      this.setState({
        preloader: true
      })
      this.props.getAllUsers(nextState.activePage, nextState.activeOn).then(
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

  filterOnClick = (data) => {
    if (data == 'all' && data !== this.state.activeOn) {
      this.setState({
        activePage: 1,
        preloader: true,
        activeOn: 'all'
      })
      this.props.getAllUsers(this.state.activePage).then(r => {
        if (r.type) {
          this.setState({
            preloader: false
          })
        }
      })
    } else if (data == 'blocked' && data !== this.state.activeOn){
      this.setState({
        activePage: 1,
        activeOn: 'blocked',
        preloader: true,
      })
      this.props.getFilteredUsers(data).then(r => {
        if (r.type) {
          this.setState({
            preloader: false
          })
        }
      })
    }
  }


  render () {
    console.log(this.props);
    const items = this.props.allUsers !== null ? this.props.allUsers.data.map(item => {
      return <div key={item.id}>
        <div className={`messages_row users_row ${item.blocked ? 'blocked' : 'unblocked'} clearfix`}>
          <div className="user_id">{item.id}</div>
          <div className="user_name">{item.first_name} {item.last_name}</div>
          <div className="user_surname">{item.email}</div>
          <div className="user_date">{item.created_at.split(' ')[0]}</div>
          <div className="user_campaigns">{item.campaigns_count}/{item.advertisements_count}</div>
          <div className="user_spent">£{item.balance_spent}</div>
          <div className="user_balance">£{item.balance}</div>
          <div className="user_block"><div className="block" onClick={() => this.blockToggle(item.id)}></div></div>
        </div>
      </div>
    }) : null

    const users = this.props.allUsers !== null && !this.state.preloader ? <div className="messages_wrapper">
      <div className="messages">
        <div className="messages_row users_row clearfix">
          <div className="user_id">ID</div>
          <div className="user_name">Full name</div>
          <div className="user_surname">Email</div>
          <div className="user_date">Registration</div>
          <div className="user_campaigns">Campaigns / Ads</div>
          <div className="user_spent">Spent</div>
          <div className="user_balance">Balance</div>
          <div className="user_block">Block</div>
        </div>
        {items}
      </div>
    </div> : <div style={{textAlign: 'center'}}><img src={ring} alt="alt" style={{paddingBottom: '150px', paddingTop: '150px'}}/></div>

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
            <div className="filter">
              <span onClick={() => this.filterOnClick('all')} className={ this.state.activeOn == 'all' ? 'active' : ''}>All</span>
              <span className="bold">|</span>
              <span onClick={() => this.filterOnClick('blocked')} className={ this.state.activeOn == 'blocked' ? 'active' : ''}>Blocked</span>
            </div>
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

export default connect (mapStateToProps, {getAllUsers, blockUser, getFilteredUsers})(UsersForm);
