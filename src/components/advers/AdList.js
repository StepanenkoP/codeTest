import React, { Component } from 'react';
import Awaiting from './Awaiting'
import NotActive from './NotActive'
import Active from './Active'
import {loadAds} from '../../AC/adsAC'
import {connect} from 'react-redux'
import ring from '../../img/main/ring.svg'
import Pagination from '../unisex/Pagination'
import $ from 'jquery'

class AdList extends Component {
  state = {
    activePage: 1
  }

  componentWillMount() {
    this.props.loadAds(this.state.activePage)
  }

  handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber});
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.activePage !== nextState.activePage) {
      this.props.loadAds(nextState.activePage)
      $(document).scrollTop(0)
    }
  }


  render() {
    console.log(this.props);
    const list = this.props.adsList.advertisement_count !== null ? this.props.adsList.advertisement_array.data.map(item =>
      <div key={item.id}>
        <Awaiting
          title={item.title}
          created_at={item.created_at.split(' ')[0]}
          short_description={item.short_description}
          image={item.image}
          id={item.id}
        />
      </div>) : <div style={{textAlign: 'center'}}><img src={ring} alt="alt" style={{paddingBottom: '50px'}}/></div>
    const pagination = this.props.adsList.advertisement_count !== null && this.props.adsList.advertisement_array.data.length === 10 ? <div style={{textAlign: 'center'}}>
      <Pagination
        activePage={this.state.activePage}
        itemsCountPerPage={10}
        totalItemsCount={this.props.adsList.advertisement_count}
        pageRangeDisplayed={5}
        onChange={this.handlePageChange}
      />
    </div> : this.props.adsList.advertisement_count !== null && this.props.adsList.advertisement_array.current_page === this.props.adsList.advertisement_array.last_page ?
    <div style={{textAlign: 'center'}}>
      <Pagination
        activePage={this.state.activePage}
        itemsCountPerPage={10}
        totalItemsCount={this.props.adsList.advertisement_count}
        pageRangeDisplayed={5}
        onChange={this.handlePageChange}
      />
    </div> :null

    return (
      <div className="ads_wrapper">
        {list}
        {!this.props.adsList.advertisement_count && this.props.adsList.advertisement_count !== null && <div className="no_data" style={{textAlign: 'center'}}>No data</div>}
        {pagination}
      </div>
    )
  }
}

function mapStateToProps({adsData}) {
  return {
    adsList: adsData.adsList
  }
}

export default connect(mapStateToProps, {loadAds})(AdList)
