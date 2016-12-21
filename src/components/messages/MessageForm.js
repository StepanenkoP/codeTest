import React, { Component } from 'react'
import mail from '../../img/settings/mail.png'
import {Link} from 'react-router'


class MessageForm extends Component {
  render () {
    return (
      <div className="settings_wrapper">
        <div className="settings_wrapper__form mess">
          <div className="title">
            <div className="img_wrapper"><img src={mail} alt="alt"/></div>
            Messages
          </div>
        </div>
      </div>
    )
  }
}

export default MessageForm;
