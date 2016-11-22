import React, {Component} from 'react'
import classnames from 'classnames'

class FlashMessage extends Component {

  componentDidMount = () => {
    setTimeout(() => {
      this.props.deleteFlashMessage(this.props.message.id)
    }, 3000);
  }

  render() {
    const {id,type,text} = this.props.message
    return(
      <div className={classnames('alert', {
        'alert_success': type === 'success',
        'alert_error': type === 'error'
      })}>
        {text}
      </div>
    )
  }
}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired
}

export default FlashMessage
