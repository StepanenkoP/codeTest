import React, { Component } from 'react';
import {Link} from 'react-router'

class CampaignListItem extends Component {

  idToStorage = () => {
    localStorage.setItem('campaignId', this.props.id)
  }

  render() {
    const {title,country,start,end, id, advertisementsCount} = this.props
    return (
      <div className="ads_wrapper__item cam_wrapper__item clearfix">
        <div className="left clearfix">
          <div className="info clearfix">
            <div className="item name">
              <p className="item_info">{title}</p>
              <p className="item_title">Name</p>
            </div>
            <div className="item country">
              <p className="item_info">{country}</p>
              <p className="item_title">Country</p>
            </div>
          </div>
          <div className="info clearfix">
            <div className="item start">
              <p className="item_info">{start}</p>
              <p className="item_title">Start</p>
            </div>
            <div className="item end">
              <p className="item_info">{end}</p>
              <p className="item_title">End</p>
            </div>
          </div>
          <div className="info clearfix">
            <div className="item no_m">
              <p className="item_info">{advertisementsCount}</p>
              <p className="item_title">Number of adverts</p>
            </div>
          </div>
          <div className="buttons clearfix">
            <div className="buttons_settings"><Link to={`/campaign_list/${id}`} className="cam_link" onClick={this.idToStorage}></Link></div>
            <div className="buttons_delete"></div>
          </div>
        </div>
      </div>
    )
  }
}


CampaignListItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  country: React.PropTypes.string.isRequired,
  start: React.PropTypes.string.isRequired,
  end: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired,
  advertisementsCount: React.PropTypes.number.isRequired
}

export default CampaignListItem;
