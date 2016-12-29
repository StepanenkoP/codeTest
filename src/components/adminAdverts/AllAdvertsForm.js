import React, { Component } from 'react'
import profile from '../../img/users/Profile.png'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getAllAdverts, setApprove, setReject, getFilteredAdverts} from '../../AC/accountAC'
import ring from '../../img/main/ring.svg'
import moment from 'moment'
import Pagination from '../unisex/Pagination'
import $ from 'jquery'


class AllAdvertsForm extends Component {

  state = {
    activePage: 1,
    preloader: false
  }

  componentDidMount() {
    this.props.getAllAdverts(this.state.activePage)
  }

  linkClick = (from,id) => {
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
      this.props.getAllAdverts(nextState.activePage).then(
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

  setApprove = (id) => {
    this.props.setApprove(id)
  }

  setReject = (id) => {
    this.props.setReject(id)
  }

  filterOnClick = (data) => {
    console.log(data);
    if (data == 'all') {
      this.props.getAllAdverts(this.state.activePage)
    } else {
      let status = {
        filter_by: data
      }
      this.props.getFilteredAdverts(this.state.activePage, status).then(
        r => console.log(r)
      )
    }
  }



  render () {
    console.log(this.props);
    const items = this.props.allAdverts !== null ? this.props.allAdverts.data.map(item => {
      return <div key={item.id}>
        <div className={`messages_row adverts_row ${item.status == 'pending' ? 'pending' : 'approved'} clearfix`}>
          <div className="advert_title">Lego for kids</div>
          <div className="advert_id">SC30293045</div>
          <div className="advert_date">11/01/2016</div>
          <div className="advert_name">Chris</div>
          <div className="advert_surname">Jones</div>
          <div className="advert_status"><span onClick={() => this.setApprove(item.id)} className={`${item.status == 'approved' ? 'active' : ''}`}>Approve</span> / <span onClick={() => this.setReject(item.id)} className={`${item.status == 'rejected' ? 'active' : ''}`}>Reject</span></div>
          </div>
          </div>
    }) : null

    const messages = this.props.allAdverts !== null && !this.state.preloader ? <div className="messages_wrapper">
      <div className="messages">
        <div className="messages_row adverts_row clearfix">
          <div className="advert_title">Title</div>
          <div className="advert_id">ID advert</div>
          <div className="advert_date">Date of creation</div>
          <div className="advert_name">First name</div>
          <div className="advert_surname">Last name</div>
          <div className="advert_status">Status</div>
        </div>
        {items}
      </div>
    </div> : <div style={{textAlign: 'center'}}><img src={ring} alt="alt" style={{paddingBottom: '50px', paddingTop: '50px'}}/></div>

  const pagination = this.props.allAdverts !== null && this.props.allAdverts.data.length === 20 ? <div style={{textAlign: 'center'}}>
    <Pagination
      activePage={this.state.activePage}
      itemsCountPerPage={20}
      totalItemsCount={this.props.allAdverts.total}
      pageRangeDisplayed={5}
        onChange={this.handlePageChange}
      />
    </div> : this.props.allAdverts !== null && this.props.allAdverts.current_page === this.props.allAdverts.last_page ?
    <div style={{textAlign: 'center'}}>
      <Pagination
        activePage={this.state.activePage}
        itemsCountPerPage={20}
        totalItemsCount={this.props.allAdverts.total}
        pageRangeDisplayed={5}
        onChange={this.handlePageChange}
      />
    </div> : null

    return (
      <div className="settings_wrapper">
        <div className="settings_wrapper__form mess">
          <div className="title">
            <div className="img_wrapper"><img src={profile} alt="alt"/></div>
            List of Adverts
            <div className="filter adverts">
              <span className="active" onClick={() => this.filterOnClick('all')}>All</span>
              <span className="bold">|</span>
              <span onClick={() => this.filterOnClick('approved')}>Approved</span>
              <span className="bold">|</span>
              <span onClick={() => this.filterOnClick('rejected')}>Rejected</span>
              <span className="bold">|</span>
              <span onClick={() => this.filterOnClick('pending')}>Pending</span>
            </div>
          </div>
          {messages}
          {this.props.allAdverts !== null && !this.props.allAdverts.data.length && <div className="no_data" style={{textAlign: 'center'}}>No data</div>}
          {!this.state.preloader ? pagination : null}
        </div>
      </div>
    )
  }
}

function mapStateToProps({adminInfo}) {
  return {
    allAdverts: adminInfo.allAdverts,
  }
}

export default connect (mapStateToProps, {getAllAdverts, setApprove, setReject, getFilteredAdverts})(AllAdvertsForm);
