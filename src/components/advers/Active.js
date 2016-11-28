import React, { Component } from 'react';
import img from '../../img/adlist/img.png'

class NotActive extends Component {
  render() {
    return (
      <div className="ads_wrapper__item clearfix">
        <div className="left">
          <h2>Company name</h2>
          <p className="text">Lorem ipsum dolor sit amet, ea sit cetero assusamus, a idqran ende salutandi no per. Est eu pertina
          ciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per. </p>
          <div className="info clearfix">
            <div className="item">
              <p className="item_info">SC302948736</p>
              <p className="item_title">Advert ID</p>
            </div>
            <div className="item">
              <p className="item_info">15/11/2016</p>
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
            <div className="buttons_settings"></div>
            <div className="buttons_delete"></div>
            <div className="buttons_stats"></div>
          </div>
        </div>
        <div className="right">
          <img src={img} alt="alt"/>
        </div>
      </div>
    )
  }
}

export default NotActive;
