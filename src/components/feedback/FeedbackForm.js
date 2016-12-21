import React, { Component } from 'react'
import mail from '../../img/settings/mail.png'
import TextFieldGroup from '../signup/TextFieldGroup'
import update from 'react-addons-update'
import TextareaField from '../unisex/TextareaField'
import validateFeedback from '../../functions/validateFeedback'
import ring from '../../img/main/ring.svg'
import {postFeedback} from '../../AC/feedbackAC'
import {addFlashMessage} from '../../AC/flashMessages'
import {connect} from 'react-redux'


class FeedbackForm extends Component {
  state = {
    subject: '',
    description: '',
    errors: {},
    loader: false
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    const newData = update(this.state.errors, {[e.target.name]: {$set: ''}});
    this.setState({
      errors: newData
    })
  }


  isValid() {
    const {errors, isValid} = validateFeedback(this.state)

    if (!isValid) {
      this.setState({
        errors
      })
    }
    return isValid
  }

  clickHandler = () => {
    this.setState({
      errors : {},
    });
    if (this.isValid()) {
      this.setState({
        loader: true
      })
      const data = {
        subject: this.state.subject,
        description: this.state.description
      }
      this.props.postFeedback(data).then(
        r => {
          console.log(r);
          if (r.data.success) {
            this.props.addFlashMessage({
              type: 'success',
              text: 'Your message has been sent successfully'
            })
            this.setState({
              subject: '',
              description: '',
              loader: false
            })
          }
        }
      )
    }
  }

  render () {
    const {errors} = this.state
    const loader = this.state.loader
    ?
    <div style={{textAlign: 'center'}}><img src={ring} alt="alt" style={{paddingBottom: '50px'}}/></div>
    :
    <button className="form_group__button" onClick={this.clickHandler}>Send Message</button>
    return (
      <div className="settings_wrapper">
        <div className="settings_wrapper__form">
          <div className="title">
            <div className="img_wrapper"><img src={mail} alt="alt"/></div>
            Send Feedback
          </div>
          <div className="feedback">
            <div className="form_block">
              <TextFieldGroup
                value={this.state.subject}
                label="Subject"
                placeholder="Text"
                type="text"
                field="subject"
                onChangeHandler={this.onChangeHandler}
                className="form_group__input"
                error={errors.subject}
              />
              <TextareaField
                value={this.state.description}
                label="Description"
                error={errors.description}
                placeholder="Text"
                field="description"
                onChangeHandler={this.onChangeHandler}
              />
              <div className="form_group">
                {loader}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, {postFeedback, addFlashMessage})(FeedbackForm);
