import React, { Component } from 'react';
import TextFieldGroup from '../signup/TextFieldGroup'
import TextareaField from '../unisex/TextareaField'
import InputFileGroup from '../unisex/InputFileGroup'
import update from 'react-addons-update'
import img from '../../img/adlist/img.png'
import validateCreateAd from '../../functions/validateCreateAd'


class AdConstructor extends Component {
  state = {
    title: '',
    short_description: '',
    description: '',
    url_link: '',
    campaign_id: '',
    image_base64: '',
    errors: {}
  }

  isValid() {
    const {errors, isValid} = validateCreateAd(this.state)

    if (!isValid) {
      this.setState({
        errors
      })
    }
    return isValid
  }


  onChangeHandler = (e) => {
    if (e.target.name !== 'image_base64') {
      this.setState({
        [e.target.name]: e.target.value
      })
      const newData = update(this.state.errors, {[e.target.name]: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }

  onClickHandler = () => {
    if (this.isValid()) {

    }
  }

  render() {
    const {errors} = this.state
    return (
      <div className="ad_constructor">
        <div className="ad_constructor__form clearfix">
          <h2>Create Adverts</h2>
          <div className="left">
            <TextFieldGroup
              value={this.state.title}
              label="Title"
              placeholder=""
              type="text"
              error={this.state.errors.title}
              field="title"
              onChangeHandler={this.onChangeHandler}
              className="form_group__input"
            />
            <TextFieldGroup
              value={this.state.short_description}
              label="Short description"
              placeholder=""
              error={this.state.errors.short_description}
              type="text"
              field="short_description"
              onChangeHandler={this.onChangeHandler}
              className="form_group__input"
            />
            <TextareaField
              value={this.state.description}
              label="Description"
              error={this.state.errors.description}
              placeholder=""
              field="description"
              onChangeHandler={this.onChangeHandler}
            />
            <TextFieldGroup
              value={this.state.url_link}
              label="Link to Url"
              placeholder=""
              type="text"
              error={this.state.errors.url_link}
              field="url_link"
              onChangeHandler={this.onChangeHandler}
              className="form_group__input withbg"
            />
            <div className="form_group">
              <label className="form_group__label">Select a campaign</label>
              <select
                value={this.state.campaign_id}
                onChange={this.onChangeHandler}
                name="campaign_id"
                className="form_group__input"
              >
                <option value="" disabled>Company name</option>
                {this.props.campaignList}
              </select>
              {errors.campaign_id && <span className="validate_span">{errors.campaign_id}</span>}
            </div>
            <InputFileGroup
              value={this.state.image_base64}
              label="Add Image"
              placeholder=""
              type="text"
              readOnly={true}
              error={this.state.errors.image_base64}
              field="image_base64"
              onChangeHandler={this.onChangeHandler}
              className="form_group__input withbg fileinput"
              id="addimg"
            />
          </div>
          <div className="right">
            <div className="img_wrapper"><img src={img} alt="alt"/></div>
            <h3>{this.state.title}</h3>
            <p className="short">{this.state.short_description}</p>
            <p className="long">{this.state.description}</p>
            <a href={this.state.url_link}>{this.state.url_link}</a>
          </div>
          <div className="form_group create_ad">
            <button className="form_group__button" onClick={this.onClickHandler}>Create</button>
          </div>
        </div>
      </div>
    )
  }
}

AdConstructor.propTypes = {
  campaignList: React.PropTypes.array
}

export default AdConstructor;
