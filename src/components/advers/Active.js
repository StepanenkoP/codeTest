import React, { Component } from 'react';
import img from '../../img/adlist/img.png'

class Active extends Component {
  render() {
    const {title, created_at, short_description, id, image} = this.props
    const imageSrc = `/api/public/upload/images/${image}`
    return (
      <div className="ads_wrapper__item clearfix">
        <div className="left">
          <h2>{title}</h2>
          <p className="text">{short_description}</p>
          <div className="info clearfix">
            <div className="item name">
              <p className="item_info">{id}</p>
              <p className="item_title">Advert ID</p>
            </div>
            <div className="item country">
              <p className="item_info">{created_at}</p>
              <p className="item_title">Date created</p>
            </div>
          </div>
          <div className="info clearfix">
            <div className="item">
              <p className="item_info">87</p>
              <p className="item_title">CTR (%)</p>
            </div>
            <div className="item ">
              <p className="item_info">315</p>
              <p className="item_title">VIEWS</p>
            </div>
          </div>
          <div className="buttons clearfix">
            <div className="btn_basic settings"></div>
            <div className="btn_basic delete"></div>
            <div className="btn_basic stats"></div>
          </div>
        </div>
        <div className="right">
          <img src={imageSrc} alt="alt"/>
        </div>
      </div>
    )
  }
}


Active.propTypes = {
  title: React.PropTypes.string.isRequired,
  created_at: React.PropTypes.string.isRequired,
  short_description: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired
}


export default Active;
