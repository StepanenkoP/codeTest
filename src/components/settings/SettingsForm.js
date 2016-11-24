import React, { Component } from 'react';
import mech from '../../img/settings/mech.png'
import trash from '../../img/settings/trash.png'
import TextFieldGroup from '../signup/TextFieldGroup'
import Checkbox from 'rc-checkbox'
import 'rc-checkbox/assets/index.css';

class SettingsForm extends Component {
  state = {
    current_password: '',
    new_password: '',
    confirm_password: '',
    disabled: false
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  changeCheckbox = () => {
    this.setState({
      isChecked: !this.state.isChecked
    })
  }

  render() {
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
            <button className="form_group__button">Save</button>
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

export default SettingsForm;
