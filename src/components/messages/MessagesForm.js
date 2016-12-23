import React, { Component } from 'react'
import mail from '../../img/settings/mail.png'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {loadAllMessages} from '../../AC/messagesAC'
import ring from '../../img/main/ring.svg'


class MessagesForm extends Component {
  componentDidMount() {
    this.props.loadAllMessages()
  }

  linkClick = (from,id) => {
    localStorage.setItem('from', from)
    localStorage.setItem('advert_id', id)
  }



  render () {
    console.log(this.props);
    const items = this.props.allMessages !== null ? this.props.allMessages.map(item => <div key={item.id} onClick={this.linkClick(item.from, item.advertisement_slug)}><Link className='message_link' to={`/messages/${item.id}`}>
      <div className={`messages_row ${item.has_new ? 'passive' : 'active'} clearfix`}>
        <div className="from">{item.from}</div>
        <div className="subject">{item.title}</div>
        <div className="id">{item.advertisement_slug}</div>
        <div className="date">{item.last_message_at.split(' ')[0]}</div>
        <div className="time">{item.last_message_at.split(' ')[1].slice(0, 5)}</div>
      </div>
    </Link></div>) : null
    const messages = this.props.allMessages !== null ? <div className="messages_wrapper">
      <div className="messages">
        <div className="messages_row clearfix">
          <div className="from">From</div>
          <div className="subject">Subject</div>
          <div className="id">ID Advert</div>
          <div className="date">Date</div>
          <div className="time">Time</div>
        </div>
        {items}
      </div>
    </div> : <div style={{textAlign: 'center'}}><img src={ring} alt="alt" style={{paddingBottom: '50px', paddingTop: '50px'}}/></div>
    return (
      <div className="settings_wrapper">
        <div className="settings_wrapper__form mess">
          <div className="title">
            <div className="img_wrapper"><img src={mail} alt="alt"/></div>
            Custom Messages
          </div>
          {messages}
          {this.props.allMessages !== null && !this.props.allMessages.length && <div className="no_data" style={{textAlign: 'center'}}>No data</div>}
        </div>
      </div>
    )
  }
}

function mapStateToProps({accountData}) {
  return {
    allMessages: accountData.allMessages
  }
}

export default connect(mapStateToProps, {loadAllMessages})(MessagesForm);
