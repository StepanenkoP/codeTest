import React, { Component } from 'react';
import CampaignListItem from './CampaignListItem'
import {connect} from 'react-redux'
import {getCampaignList} from '../../AC/campaignGet'
import ring from '../../img/main/ring.svg'
import EditCampaign from './EditCampaign'

class CampaignList extends Component {
  componentWillMount() {
    this.props.getCampaignList()
  }

  render() {
    console.log(this.props);
    const List =  this.props.campaignList.length ? this.props.campaignList.map(item=>
      <div key={item.id}>
        <CampaignListItem
          title={item.title}
          country={item.country}
          start={item.start_date}
          end={item.end_date}
          id={item.id}
          advertisementsCount={item.advertisementsCount}
        />
      </div>
  ) : <img src={ring} alt="alt"/>
    return (
      <div className="ads_wrapper cam_wrapper">
        {List}
      </div>
    )
  }
}


function mapStateToProps({campaignGetData}) {
  return {
    campaignList: campaignGetData.campaignList
  }
}

export default connect(mapStateToProps, {getCampaignList})(CampaignList);
