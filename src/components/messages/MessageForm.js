import React, { Component } from 'react'
import message from '../../img/messages/message.png'
import user from '../../img/messages/user.png'
import button from '../../img/messages/button.png'
import me from '../../img/messages/me.png'
import {Link} from 'react-router'
import {sendMessage} from '../../AC/messagesAC'
import {getUserInfo} from '../../AC/accountAC'
import {addFlashMessage} from '../../AC/flashMessages'
import validateSendMessage from '../../functions/validateSendMessage'
import {connect} from 'react-redux'
import moment from 'moment';


class MessageForm extends Component {
  state = {
    message_text: '',
    sended: false,
    errors: {}
  }

  componentDidMount() {
    this.props.getUserInfo()
  }

  inputChange = (e) => {
    this.setState({
      sended: false,
      message_text: e.target.value
    })
  }

  isValid() {
    const {errors, isValid} = validateSendMessage(this.state)

    if (!isValid) {
      this.setState({
        errors
      })
    }
    return isValid
  }

  sendOnClick = () => {
    this.setState({
      errors : {}
    });
    if (this.isValid()) {
      const data = {
        subject_id: this.props.id,
        message_text: this.state.message_text
      }
      const newobj = {
        id: Date.now(),
        from: `${this.props.userInfo.first_name} ${this.props.userInfo.last_name}`,
        color: this.props.userInfo.color,
        text: this.state.message_text,
        created_at: moment.utc(new Date()).format("YYYY-MM-DD HH:mm")
      }
      const currentDate = Object.keys(this.props.messages)[Object.keys(this.props.messages).length - 1]
      this.props.sendMessage(data, newobj, currentDate)
      this.setState({
        message_text: '',
        sended: true
      })
    } else {
      this.props.addFlashMessage({
        type: 'error',
        text: 'You cant send empty message!'
      })
    }
  }

  render () {
    console.log(this.props);
    const {messages} = this.props
    const allMessages = this.props.messages !== undefined ? Object.keys(messages).map(item => <div key={item} className="block">
      {
        messages[item].map(date => {
          const localTime = moment(moment.utc(date.created_at).local().format("YYYY-MM-DD HH:mm"))
            return <div key={date.id} className="message">
              <div className="name">
                <span className="img" style={{backgroundColor: date.color}}>{date.from.slice(0,1)}</span>
                <span className="user_name">{date.from}</span>
                <div className="time">{localTime._i.split(' ')[1].slice(0,5)}</div>
              </div>
              <div className="text">{date.text}</div>
            </div>
        })
      } {item !== Object.keys(messages)[Object.keys(messages).length - 1] && <div className="date">{item}</div>}</div>) : null
    console.log(allMessages);
    return (
      <div className="settings_wrapper">
        <div className="settings_wrapper__form mess">
          <div className="title">
            <div className="img_wrapper"><img src={message} alt="alt"/></div>
            Messages
          </div>
          <div className="message_list">
            <div className="message_list__title">
              <div className="name">{localStorage.from}</div>
              <div className="id">{localStorage.advert_id !== "null" ? `ID Advert ${localStorage.advert_id}` : ''}</div>
            </div>
            <div className="message_list__items">
              {allMessages}
              <div className="input_block">
                <div className="button" onClick={this.sendOnClick}><div className="btn"></div></div>
                <input type="text" value={this.state.message_text} onChange={this.inputChange} placeholder="Text..."/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({accountData}) {
  return {
    userInfo: accountData.userInfo,
  }
}

export default connect(mapStateToProps, {addFlashMessage, sendMessage, getUserInfo})(MessageForm);
