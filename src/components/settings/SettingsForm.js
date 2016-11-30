import React, { Component } from 'react';
import mech from '../../img/settings/mech.png'
import trash from '../../img/settings/trash.png'
import TextFieldGroup from '../signup/TextFieldGroup'
import Checkbox from 'rc-checkbox'
import update from 'react-addons-update'
import 'rc-checkbox/assets/index.css';
import validateChangepass from '../../functions/validateChangepass'
import {connect} from 'react-redux'
import {addFlashMessage} from '../../AC/flashMessages'
import {userChangePassword} from '../../AC/changePassword'

class SettingsForm extends Component {
  state = {
    current_password: '',
    new_password: '',
    confirm_password: '',
    disabled: false,
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

  changeCheckbox = () => {
    this.setState({
      isChecked: !this.state.isChecked
    })
  }

  isValid() {
    const {errors, isValid} = validateChangepass(this.state)

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
      if (this.state.new_password !== this.state.confirm_password) {
        this.props.addFlashMessage({
          type: 'error',
          text: '"New password" and "Confirm password" fields must match'
        })
      }
      else if (this.state.current_password == this.state.new_password) {
        this.props.addFlashMessage({
          type: 'error',
          text: "New password can't be the same as current one"
        })
      }
      else {
        const changeObj = {
          old_password: this.state.current_password,
          new_password: this.state.new_password
        }
        console.log(changeObj);
        this.props.userChangePassword(changeObj).then(
          (r) => {
            console.log(r);
            if (r.data.error) {
              this.props.addFlashMessage({
                type: 'error',
                text: "Current password is incorrect"
              })
            }
            if (r.data.success) {
              this.props.addFlashMessage({
                type: 'success',
                text: "Success! You have changed your password"
              })
              this.setState({
                current_password: '',
                new_password: '',
                confirm_password: ''
              })
            }
          }
        )
      }
    }
  }

  render() {
    const {errors} = this.state
    return (
      <div className="settings_wrapper">
        <div className="settings_wrapper__form">
          <div className="title">
            <div className="img_wrapper"><img src={mech} alt="alt"/></div>
            Settings
          </div>
          <div className="all_blocks">
            <div className="form_block">
              <TextFieldGroup
                value={this.state.current_password}
                label="Current password"
                placeholder="*******"
                type="password"
                field="current_password"
                onChangeHandler={this.onChangeHandler}
                className="form_group__input"
                error={errors.current_password}
              />
            </div>
            <div className="form_block">
              <TextFieldGroup
                value={this.state.new_password}
                label="New password"
                placeholder="*******"
                type="password"
                field="new_password"
                onChangeHandler={this.onChangeHandler}
                className="form_group__input"
                error={errors.new_password}
              />
            </div>
            <div className="form_block">
              <TextFieldGroup
                value={this.state.confirm_password}
                label="Confirm password"
                placeholder="*******"
                type="password"
                field="confirm_password"
                onChangeHandler={this.onChangeHandler}
                className="form_group__input"
                error={errors.confirm_password}
              />
            </div>
            <div className="form_block">
              <div className="form_group">
                <label className="checkbox_label">
                  <Checkbox
                    disabled={this.state.disabled}
                  /><span className="label_text">Get important notifications</span>
                </label>
                <label className="checkbox_label">
                  <Checkbox
                    defaultChecked
                    disabled={this.state.disabled}
                  /><span className="label_text">Get news from the system</span>
                </label>
              </div>
            </div>
          </div>
          <div className="form_group">
            <button className="form_group__button" onClick={this.clickHandler}>Save</button>
          </div>
          <div className="delete_acc">
            <div className="img_wrapper"><img src={trash} alt="alt"/></div>
            Delete account
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, {userChangePassword, addFlashMessage})(SettingsForm);
