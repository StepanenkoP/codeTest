import React, { Component } from 'react'
import mail from '../../img/settings/mail.png'
import TextFieldGroup from '../signup/TextFieldGroup'
import update from 'react-addons-update'
import TextareaField from '../unisex/TextareaField'
import validateFeedback from '../../functions/validateFeedback'


class FeedbackForm extends Component {
  state = {
    subject: '',
    description: '',
    errors: {}
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
      errors : {}
    });
    if (this.isValid()) {
      alert(123);
    }
  }

  render () {
    const {errors} = this.state
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
                <button className="form_group__button" onClick={this.clickHandler}>Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FeedbackForm;
