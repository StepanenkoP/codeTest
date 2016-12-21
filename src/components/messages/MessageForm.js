import React, { Component } from 'react'
import message from '../../img/messages/message.png'
import user from '../../img/messages/user.png'
import button from '../../img/messages/button.png'
import me from '../../img/messages/me.png'
import {Link} from 'react-router'


class MessageForm extends Component {
  render () {
    return (
      <div className="settings_wrapper">
        <div className="settings_wrapper__form mess">
          <div className="title">
            <div className="img_wrapper"><img src={message} alt="alt"/></div>
            Messages
          </div>
          <div className="message_list">
            <div className="message_list__title">
              <div className="name">Chris Jones</div>
              <div className="id">ID Advert SC30293045</div>
            </div>
            <div className="message_list__items">
              <div className="block">
                <div className="message">
                  <div className="name">
                    <img src={user} alt="alt"/>
                    <span className="user_name">Chris Jones</span>
                    <div className="time">11:45</div>
                  </div>
                  <div className="text">Lorem ipsum dolor sit amet, ea sit cetero assusamus, a idqran ende salutandi no per. Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per. Lorem ipsum dolor sit amet, ea sit cetero assusamus, a idqran ende salutandi no per. Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per.</div>
                </div>
                <div className="message">
                  <div className="name">
                    <img src={me} alt="alt"/>
                    <span className="user_name">Dan King</span>
                    <div className="time">11:45</div>
                  </div>
                  <div className="text">Lorem ipsum dolor sit amet, ea sit cetero assusamus, a idqran ende salutandi no per. Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per. Lorem ipsum dolor sit amet, ea sit cetero assusamus, a idqran ende salutandi no per. Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per.</div>
                </div>
                <div className="date">Yesterday</div>
              </div>
              <div className="block">
                <div className="message">
                  <div className="name">
                    <img src={user} alt="alt"/>
                    <span className="user_name">Chris Jones</span>
                    <div className="time">11:45</div>
                  </div>
                  <div className="text">Lorem ipsum dolor sit amet, ea sit cetero assusamus, a idqran ende salutandi no per. Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per. Lorem ipsum dolor sit amet, ea sit cetero assusamus, a idqran ende salutandi no per. Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per.</div>
                </div>
                <div className="message">
                  <div className="name">
                    <img src={me} alt="alt"/>
                    <span className="user_name">Dan King</span>
                    <div className="time">11:45</div>
                  </div>
                  <div className="text">Lorem ipsum dolor sit amet, ea sit cetero assusamus, a idqran ende salutandi no per. Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per. Lorem ipsum dolor sit amet, ea sit cetero assusamus, a idqran ende salutandi no per. Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per.</div>
                </div>
              </div>
              <div className="input_block">
                <div className="button"><div className="btn"></div></div>
                <input type="text" name="message" placeholder="Text..."/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MessageForm;
