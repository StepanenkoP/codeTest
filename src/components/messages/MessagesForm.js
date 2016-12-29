import React, { Component } from 'react'
import mail from '../../img/settings/mail.png'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {loadAllMessages} from '../../AC/messagesAC'
import ring from '../../img/main/ring.svg'
import moment from 'moment'
import Pagination from '../unisex/Pagination'
import $ from 'jquery'


class MessagesForm extends Component {

  state = {
    activePage: 1,
    preloader: false
  }

  componentDidMount() {
    this.props.loadAllMessages(this.state.activePage)
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
      this.props.loadAllMessages(nextState.activePage).then(
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



  render () {
    // console.log(this.props);
    const items = this.props.allMessages !== null ? this.props.allMessages.data.map(item => {
      const localTime = moment(moment.utc(item.last_message_at).local().format("YYYY-MM-DD HH:mm"))
      return <div key={item.id} onClick={() => this.linkClick(item.from, item.advertisement_slug)}><Link className='message_link' to={`/messages/${item.id}`}>
        <div className={`messages_row ${item.has_new ? 'passive' : 'active'} clearfix`}>
          <div className="from">{item.from}</div>
          <div className="subject">{item.title}</div>
          <div className="id">{item.advertisement_slug == null ? 'n/a' : item.advertisement_slug}</div>
          <div className="date">{localTime._i.split(' ')[0]}</div>
          <div className="time">{localTime._i.split(' ')[1].slice(0, 5)}</div>
        </div>
      </Link></div>
    }) : null

    const messages = this.props.allMessages !== null && !this.state.preloader ? <div className="messages_wrapper">
      <div className="messages">
        <div className="messages_row clearfix">
          <div className="from">With</div>
          <div className="subject">Subject</div>
          <div className="id">ID Advert</div>
          <div className="date">Date</div>
          <div className="time">Time</div>
        </div>
        {items}
      </div>
    </div> : <div style={{textAlign: 'center'}}><img src={ring} alt="alt" style={{paddingBottom: '50px', paddingTop: '50px'}}/></div>

    const pagination = this.props.allMessages !== null && this.props.allMessages.data.length === 10 ? <div style={{textAlign: 'center'}}>
      <Pagination
        activePage={this.state.activePage}
        itemsCountPerPage={10}
        totalItemsCount={this.props.allMessages.total}
        pageRangeDisplayed={5}
        onChange={this.handlePageChange}
      />
    </div> : this.props.allMessages !== null && this.props.allMessages.current_page === this.props.allMessages.last_page ?
    <div style={{textAlign: 'center'}}>
      <Pagination
        activePage={this.state.activePage}
        itemsCountPerPage={10}
        totalItemsCount={this.props.allMessages.total}
        pageRangeDisplayed={5}
        onChange={this.handlePageChange}
      />
    </div> : null

    return (
      <div className="settings_wrapper">
        <div className="settings_wrapper__form mess">
          <div className="title">
            <div className="img_wrapper"><img src={mail} alt="alt"/></div>
            Custom Messages
          </div>
          {messages}
          {this.props.allMessages !== null && !this.props.allMessages.data.length && <div className="no_data" style={{textAlign: 'center'}}>No data</div>}
          {!this.state.preloader ? pagination : null}
        </div>
      </div>
    )
  }
}

function mapStateToProps({accountData}) {
  return {
    allMessages: accountData.allMessages,
  }
}

export default connect(mapStateToProps, {loadAllMessages})(MessagesForm);
