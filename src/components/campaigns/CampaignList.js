import React, { Component } from 'react';
import CampaignListItem from './CampaignListItem'
import {connect} from 'react-redux'
import {getCampaignList} from '../../AC/campaignGet'
import ring from '../../img/main/ring.svg'

class CampaignList extends Component {
  componentWillMount() {
    this.props.getCampaignList()
  }

  render() {
    console.log(this.props);
    const List = this.props.campaignList.success || this.props.campaignList.campaign_count !== null ? this.props.campaignList.campaign_array.map(item=>
      <div key={item.id}>
        <CampaignListItem
          title={item.title}
          country={item.country}
          start={item.start_date}
          end={item.end_date}
          id={item.id}
          advertisements_count={item.advertisements_count}
        />
      </div>
  ) : <div style={{textAlign: 'center'}}><img src={ring} alt="alt" style={{paddingBottom: '50px'}}/></div>

  return (
      <div className="ads_wrapper cam_wrapper">
        {List}
        {!this.props.campaignList.campaign_count && this.props.campaignList.campaign_count !== null && <div className="no_data" style={{textAlign: 'center'}}>No data</div>}
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
