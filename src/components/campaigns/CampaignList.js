import React, { Component } from 'react';
import CampaignListItem from './CampaignListItem'
import {connect} from 'react-redux'
import {getCampaignList} from '../../AC/campaignGet'
import ring from '../../img/main/ring.svg'
import Pagination from '../unisex/Pagination'
import $ from 'jquery'

class CampaignList extends Component {
  state = {
    activePage: 1
  }
  componentWillMount() {
    this.props.getCampaignList(this.state.activePage)
  }

  handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber});
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.activePage !== nextState.activePage) {
      this.props.getCampaignList(nextState.activePage)
      $(document).scrollTop(0)
    }
  }

  render() {
    console.log(this.props);
    const List = this.props.campaignList.success || this.props.campaignList.campaign_count !== null ? this.props.campaignList.campaign_array.data.map(item=>
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

const pagination = this.props.campaignList.campaign_count !== null && this.props.campaignList.campaign_array.data.length === 10 ? <div style={{textAlign: 'center'}}>
  <Pagination
    activePage={this.state.activePage}
    itemsCountPerPage={10}
    totalItemsCount={this.props.campaignList.campaign_count}
    pageRangeDisplayed={5}
    onChange={this.handlePageChange}
  />
</div> : this.props.campaignList.campaign_count !== null && this.props.campaignList.campaign_array.current_page === this.props.campaignList.campaign_array.last_page ?
<div style={{textAlign: 'center'}}>
  <Pagination
    activePage={this.state.activePage}
    itemsCountPerPage={10}
    totalItemsCount={this.props.campaignList.campaign_count}
    pageRangeDisplayed={5}
    onChange={this.handlePageChange}
  />
</div> : null

  return (
      <div className="ads_wrapper cam_wrapper">
        {List}
        {!this.props.campaignList.campaign_count && this.props.campaignList.campaign_count !== null && <div className="no_data" style={{textAlign: 'center'}}>No data</div>}
        {pagination}
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
