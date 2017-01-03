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
    activePage: 1,
    loader: false
  }

  componentWillMount() {
    this.props.loadAds(this.state.activePage)
  }

  handlePageChange = (pageNumber) => {
    this.setState({
      activePage: pageNumber,
      loader: true
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.activePage !== nextState.activePage) {
      this.props.loadAds(nextState.activePage).then(r => {
        if (r.type == 'LOAD_ADS') {
          this.setState({
            loader: false
          })
        }
      })
      $(document).scrollTop(0)
    }
  }


  render() {
    console.log(this.props);
    const listPending = this.props.adsList.advertisement_count !== null ? this.props.adsList.advertisement_array.data.filter(item => item.status == 'pending').map(item =>
      <div key={item.id}>
        <Awaiting
          title={item.title}
          created_at={item.created_at.split(' ')[0]}
          short_description={item.short_description}
          image={item.image}
          id={item.id}
        />
      </div>) : null
    const listApproved = this.props.adsList.advertisement_count !== null ? this.props.adsList.advertisement_array.data.filter(item => item.status == 'approved').map(item =>
        <div key={item.id}>
          <Active
            title={item.title}
            created_at={item.created_at.split(' ')[0]}
            short_description={item.short_description}
            image={item.image}
            id={item.id}
          />
        </div>) : null
      const listRejected = this.props.adsList.advertisement_count !== null ? this.props.adsList.advertisement_array.data.filter(item => item.status == 'rejected').map(item =>
        <div key={item.id}>
          <NotActive
            title={item.title}
            created_at={item.created_at.split(' ')[0]}
            short_description={item.short_description}
            image={item.image}
            id={item.id}
          />
        </div>) : null
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
        {this.props.adsList.advertisement_count !== null && !this.state.loader ? <div>
          {listPending}
          {listApproved}
          {listRejected}
        </div> : <div style={{textAlign: 'center'}}><img src={ring} alt="alt" style={{paddingBottom: '50px'}}/></div>}
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
