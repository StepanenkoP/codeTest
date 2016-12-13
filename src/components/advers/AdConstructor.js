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
import AvatarCropper from 'react-avatar-cropper'


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
    loader: false,
    cropperOpen: false,
  }

  handleRequestHide = () => {
    this.setState({
      cropperOpen: false,
      image: this.state.image && this.state.image_base64 ? this.state.image_base64 : this.props.image
    });
  }

  handleCrop = (dataURI) => {
    const newData = update(this.state.errors, {image_base64: {$set: ''}});
    this.setState({
      cropperOpen: false,
      image_base64: dataURI,
      image: dataURI,
      errors: newData
    });
  }


  handleFileChange = (dataURI) => {
    this.setState({
      image: dataURI,
      cropperOpen: true
    });
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
    console.log(files);
    this.setState({
      files: files,
    })
    this.setState({
      image_base64: this.state.files[0] ? this.state.files[0].base64 : '',
      image:this.state.files[0] ? this.state.files[0].name : '',
      cropperOpen: true
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
        const editData = {
          id: +this.props.id,
          dataForm: data
        }
        this.props.editAd(editData).then(
          r => {
            console.log(r);
            if (r.data.success) {
              this.setState({
                loader: false
              })
            }
            this.props.addFlashMessage({
              type: 'success',
              text: 'Advertise has been edited successfully!'
            })
            this.context.router.push('/advers_list')
          }
        )
      }
    }
  }


  render() {
    const image = this.state.image_base64.length
    ?
    <img src={this.state.image_base64} alt="alt"/>
    :
    null

    const imageEdit = this.state.image && !this.state.image_base64
    ?
    this.state.image.indexOf(";") == -1 ? <img src={`/api/public/upload/images/${this.state.image}`} alt="alt"/> : null
    :
    this.props.id ? this.state.image.indexOf(";") == -1 ? <img src={ring} alt="alt"/> : null : null

    const pending = !this.state.loader
    ?
    <button className="form_group__button" onClick={this.onClickHandler}>{this.props.id ? <span>Edit</span> : <span>Create</span>}</button>
    :
    <div style={{textAlign: 'center'}}><img src={ring} alt="alt" style={{paddingBottom: '50px', paddingTop: '50px'}}/></div>
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
              handleFileChange={this.handleFileChange}
              readOnly={true}
              error={this.state.errors.image_base64}
              field="image_base64"
              className="form_group__input withbg fileinput"
              id="addimg"
            />
          </div>
          <div className="right">
            {this.state.cropperOpen &&
              <AvatarCropper
                onRequestHide={this.handleRequestHide}
                cropperOpen={this.state.cropperOpen}
                onCrop={this.handleCrop}
                image={this.state.image}
                width={window.innerWidth > 480 ? 400 : 298}
                height={320}
              />
            }
            <div className="img_wrapper">{image}{imageEdit}</div>
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
