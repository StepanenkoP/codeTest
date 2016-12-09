import React, { Component } from 'react';
import img from '../../img/adlist/img.png'
import {Link} from 'react-router'
import {deleteAd} from '../../AC/adsAC'
import {connect} from 'react-redux'

class Awaiting extends Component {
  state = {
    deleteIsOpen: false
  }

  openDeleteBlock = () => {
    this.setState({
      deleteIsOpen: true
    })
  }

  closeDeleteBlock = () => {
    this.setState({
      deleteIsOpen: false
    })
  }

  deleteById = (id) => {
    this.props.deleteAd(id)
  }

  render() {
    const {title, created_at, short_description, id, image} = this.props
    const imageSrc = `/api/public/upload/images/${image}`
    const buttons = this.state.deleteIsOpen ?
    <div className="buttons clearfix delete_ad">Delete this advertisement?<div className="block_btn"><button className="yes" onClick={() => this.deleteById(id)}>Yes</button><button className="no" onClick={this.closeDeleteBlock}>No</button></div></div>
      :
    <div className="buttons clearfix">
      <div className="btn_basic settings"><Link to={`/advers_list/${id}`} className="cam_link" onClick={this.idToStorage}></Link></div>
      <div className="btn_basic delete" onClick={this.openDeleteBlock}></div>
      <div className="btn_basic stats"></div>
    </div>
    return (
      <div className="ads_wrapper__item clearfix" style={this.state.deleteIsOpen && window.innerWidth < 992 ? {paddingBottom: '100px'} : null}>
        <div className="left">
          <h2>{title} <span>Awaiting moderation</span></h2>
          <p className="text">{short_description}</p>
          <div className="info clearfix">
            <div className="item">
              <p className="item_info">{id}</p>
              <p className="item_title">Advert ID</p>
            </div>
            <div className="item">
              <p className="item_info">{created_at}</p>
              <p className="item_title">Date created</p>
            </div>
          </div>
          <div className="info clearfix">
            <div className="item">
              <p className="item_info">87</p>
              <p className="item_title">CTR (%)</p>
            </div>
            <div className="item">
              <p className="item_info">315</p>
              <p className="item_title">VIEWS</p>
            </div>
          </div>
          {buttons}
        </div>
        <div className="right">
          <img src={imageSrc} alt="alt"/>
        </div>
      </div>
    )
  }
}

export default connect(null, {deleteAd})(Awaiting);
