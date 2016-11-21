import React, {Component} from 'react'
import {connect} from 'react-redux'
import FlashMessage from './FlashMessage'
import {deleteFlashMessage} from '../../AC/flashMessages'

class FlashList extends Component {
  render() {
    const {deleteFlashMessage} = this.props
    const messages = this.props.flashMessages.map(message =>
      <FlashMessage key={message.id} message={message} deleteFlashMessage={deleteFlashMessage}/>
    )
    return (
      <div>{messages}</div>
    )
  }
}

FlashList.propTypes = {
  flashMessages: React.PropTypes.array.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      flashMessages: state.flashMessages
    }
  }, { deleteFlashMessage }
)(FlashList)
