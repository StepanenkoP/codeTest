import React, { Component } from 'react'
import mail from '../../img/settings/mail.png'
import {Link} from 'react-router'


class MessagesForm extends Component {
  render () {
    return (
      <div className="settings_wrapper">
        <div className="settings_wrapper__form mess">
          <div className="title">
            <div className="img_wrapper"><img src={mail} alt="alt"/></div>
            Custom Messages
          </div>
          <div className="messages_wrapper">
            <div className="messages">
              <div className="messages_row clearfix">
                <div className="from">From</div>
                <div className="subject">Subject</div>
                <div className="id">ID Advert</div>
                <div className="date">Date</div>
                <div className="time">Time</div>
              </div>
              <Link to="/messages/1">
                <div className="messages_row passive clearfix">
                  <div className="from">Eugene</div>
                  <div className="subject">New offer for you</div>
                  <div className="id">SC30293045</div>
                  <div className="date">11/01/2016</div>
                  <div className="time">11:20</div>
                </div>
              </Link>
              <div className="messages_row active clearfix">
                <div className="from">Eugene</div>
                <div className="subject">New offer for you</div>
                <div className="id">SC30293045</div>
                <div className="date">11/01/2016</div>
                <div className="time">11:20</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MessagesForm;
