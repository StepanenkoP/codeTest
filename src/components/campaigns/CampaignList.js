import React, { Component } from 'react';
import img from '../../img/adlist/img.png'

class CampaignList extends Component {
  render() {
    return (
      <div className="ads_wrapper cam_wrapper">
        <div className="ads_wrapper__item cam_wrapper__item clearfix">
          <div className="left clearfix">
            <div className="info clearfix">
              <div className="item">
                <p className="item_info">Lego Kids</p>
                <p className="item_title">Name</p>
              </div>
              <div className="item">
                <p className="item_info">United Kingdom</p>
                <p className="item_title">Country</p>
              </div>
            </div>
            <div className="info clearfix">
              <div className="item">
                <p className="item_info">11/01/2016</p>
                <p className="item_title">Start</p>
              </div>
              <div className="item">
                <p className="item_info">12/31/2016</p>
                <p className="item_title">End</p>
              </div>
            </div>
            <div className="info clearfix">
              <div className="item no_m">
                <p className="item_info">3</p>
                <p className="item_title">Number of adverts</p>
              </div>
            </div>
            <div className="buttons clearfix">
              <div className="buttons_settings"></div>
              <div className="buttons_delete"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CampaignList;
