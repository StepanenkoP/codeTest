import React, { Component } from 'react';
import TextFieldGroup from '../signup/TextFieldGroup'
import TextareaField from '../unisex/TextareaField'
import InputFileGroup from '../unisex/InputFileGroup'
import img from '../../img/adlist/img.png'

class AdConstructor extends Component {
  state = {
    title: '',
    short_description: '',
    description: '',
    link: '',
    select_compaign: '',
    image: '',
    errors: {}
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
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
              field="title"
              onChangeHandler={this.onChangeHandler}
              className="form_group__input"
            />
            <TextFieldGroup
              value={this.state.short_description}
              label="Short description"
              placeholder=""
              type="text"
              field="short_description"
              onChangeHandler={this.onChangeHandler}
              className="form_group__input"
            />
            <TextareaField
              value={this.state.description}
              label="Description"
              placeholder=""
              field="description"
              onChangeHandler={this.onChangeHandler}
            />
            <TextFieldGroup
              value={this.state.link}
              label="Link to Url"
              placeholder=""
              type="text"
              field="link"
              onChangeHandler={this.onChangeHandler}
              className="form_group__input withbg"
            />
            <div className="form_group">
              <label className="form_group__label">Select a campaign</label>
              <select
                value={this.state.select_compaign}
                onChange={this.onChangeHandler}
                name="select_compaign"
                className="form_group__input"
              >
                <option value="" disabled>Company name</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              {/* {errors.select_compaign && <span className="validate_span">{errors.select_compaign}</span>} */}
            </div>
            <InputFileGroup
              value={this.state.image}
              label="Add Image"
              placeholder=""
              type="text"
              field="image"
              onChangeHandler={this.onChangeHandler}
              className="form_group__input withbg fileinput"
              id="addimg"
            />
          </div>
          <div className="right">
            <div className="img_wrapper"><img src={img} alt="alt"/></div>
            <h3>Lorem ipsum dolor sit amet, ea sit</h3>
            <p className="short">Est eu pertinaciaen delacrue instructiol vel eu</p>
            <p className="long">Lorem ipsum dolor sit amet, ea sit cetero assusamus, a idqran ende salutandi no per. Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per. Lorem ipsum dolor sit amet, ea sit cetero assusamus, a idqran ende salutandi no per. Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per.</p>
            <a href="/">www.loremipsum.com</a>
          </div>
          <div className="form_group create_ad">
            <button className="form_group__button">Create</button>
          </div>
        </div>
      </div>
    )
  }
}

export default AdConstructor;
