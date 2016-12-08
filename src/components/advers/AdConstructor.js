import React, { Component } from 'react';
import TextFieldGroup from '../signup/TextFieldGroup'
import TextareaField from '../unisex/TextareaField'
import InputFileGroup from '../unisex/InputFileGroup'
import update from 'react-addons-update'
import validateCreateAd from '../../functions/validateCreateAd'
import {createAD, editAd} from '../../AC/adsAC'
import {addFlashMessage} from '../../AC/flashMessages'
import {connect} from 'react-redux'
import ring from '../../img/main/ring.svg'


class AdConstructor extends Component {
  state = {
    title: '',
    short_description: '',
    description: '',
    url_link: '',
    campaign_id: '',
    files: [],
    image_base64: '',
    errors: {},
    image: '',
    loader: false
  }

  componentWillReceiveProps() {
    if (this.props.short_description) {
      const {adTitle, short_description, description, image, campaign_id, url_link} = this.props
      this.setState({
        title: adTitle,
        short_description,
        description,
        image,
        campaign_id: `${campaign_id}`,
        url_link
      })
    }
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
    this.setState({
      [e.target.name]: e.target.value
    })
    const newData = update(this.state.errors, {[e.target.name]: {$set: ''}});
    this.setState({
      errors: newData
    })
  }

  getFiles = (files) => {
    this.setState({
      files: files,
    })
    this.setState({
      image_base64: this.state.files[0] ? this.state.files[0].base64 : '',
      image:this.state.files[0] ? this.state.files[0].name : ''
    })
    if (this.state.image_base64) {
      const newData = update(this.state.errors, {image_base64: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }


  onClickHandler = () => {
    if (this.isValid()) {
      this.setState({
        loader: true
      })
      const data = {}
      for (let key in this.state) {
        if (key !== 'files' && key !== 'errors' && key !== 'loader' && key !== 'image') {
          data[key] = this.state[key]
        }
      }
      data.campaign_id = +data.campaign_id
      if (!this.props.adTitle) {
        this.props.createAD(data).then(
          r => {
            console.log(r);
            if (r.data.success) {
              this.setState({
                loader: false
              })
              this.props.addFlashMessage({
                type: 'success',
                text: 'Advertise has been created successfully!'
              })
              this.context.router.push('/advers_list')
            }
          }
        )
      } else {
        this.props.editAd(this.props.id)
      }
    }
  }

  render() {
    console.log(this.state);
    const image = this.state.image_base64.length || this.state.image ? <img src={this.state.image ? `/api/public/upload/images/${this.state.image}` : this.state.image_base64} alt="alt"/> : null
    const pending = !this.state.loader
    ?
    <button className="form_group__button" onClick={this.onClickHandler}>{this.props.id ? <span>Edit</span> : <span>Create</span>}</button>
    :
    <div style={{textAlign: 'center'}}><img src={ring} alt="alt" style={{paddingBottom: '50px', paddingTop: '50px'}}/></div>
    console.log(this.state);
    const {errors} = this.state
    const title = this.props.title ? <h2>Edit Adverts</h2> : <h2>Create Adverts</h2>
    return (
      <div className="ad_constructor">
        <div className="ad_constructor__form clearfix">
          {title}
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
              value={this.state.files[0] || this.state.image ? this.state.image : ''}
              label="Add Image"
              placeholder=""
              type="text"
              getFiles={this.getFiles}
              readOnly={true}
              error={this.state.errors.image_base64}
              field="image_base64"
              className="form_group__input withbg fileinput"
              id="addimg"
            />
          </div>
          <div className="right">
            <div className="img_wrapper">{image}</div>
            <h3>{this.state.title}</h3>
            <p className="short">{this.state.short_description}</p>
            <p className="long">{this.state.description}</p>
            <a href={this.state.url_link}>{this.state.url_link}</a>
          </div>
          <div className="form_group create_ad">
            {pending}
          </div>
        </div>
      </div>
    )
  }
}

AdConstructor.contextTypes = {
  router: React.PropTypes.object.isRequired
}

AdConstructor.propTypes = {
  campaignList: React.PropTypes.array
}

export default connect(null, {createAD, addFlashMessage, editAd})(AdConstructor);
