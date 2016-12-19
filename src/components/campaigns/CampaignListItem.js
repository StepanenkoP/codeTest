import React, { Component } from 'react';
import {Link} from 'react-router'
import {deleteCampaign} from '../../AC/campaignGet'
import {connect} from 'react-redux'

class CampaignListItem extends Component {

  state = {
    deleteIsOpen: false
  }

  idToStorage = () => {
    localStorage.setItem('campaignId', this.props.id)
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
    this.props.deleteCampaign(id)
  }

  render() {
    const {title,start,end, id, advertisements_count} = this.props
    const morePadding = this.state.deleteIsOpen && window.innerWidth < 1200 ? {paddingBottom: '150px'} : {}
    const buttons = this.state.deleteIsOpen ?
    <div className="buttons clearfix delete_campaign">Delete this campaign?<div className="block_btn"><button className="yes" onClick={() => this.deleteById(id)}>Yes</button><button className="no" onClick={this.closeDeleteBlock}>No</button></div></div>
      :
    <div className="buttons clearfix">
      <div className="btn_basic settings"><Link to={`/campaign_list/${id}`} className="cam_link" onClick={this.idToStorage}></Link></div>
      <div className="btn_basic delete" onClick={this.openDeleteBlock}></div>
    </div>
    return (
      <div className="ads_wrapper__item cam_wrapper__item clearfix" style={morePadding}>
        <div className="left clearfix">
          <div className="info clearfix">
            <div className="item name">
              <p className="item_info">{title}</p>
              <p className="item_title">Name</p>
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
              <p className="item_info">{advertisements_count}</p>
              <p className="item_title">Number of adverts</p>
            </div>
          </div>
          {buttons}
        </div>
      </div>
    )
  }
}


CampaignListItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  start: React.PropTypes.string.isRequired,
  end: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired,
  advertisements_count: React.PropTypes.number.isRequired
}

export default connect(null, {deleteCampaign})(CampaignListItem);
