import React, { Component } from 'react';
import Awaiting from './Awaiting'
import NotActive from './NotActive'
import Active from './Active'
import {loadAds} from '../../AC/adsAC'
import {connect} from 'react-redux'
import ring from '../../img/main/ring.svg'

class AdList extends Component {

  componentWillMount() {
    this.props.loadAds()
  }

  render() {
    console.log(this.props);
    const list = this.props.adsList.advertisement_count !== null ? this.props.adsList.advertisement_array.map(item =>
      <div key={item.id}>
        <Awaiting
          title={item.title}
          created_at={item.created_at.split(' ')[0]}
          short_description={item.short_description}
          image={item.image}
          id={item.id}
        />
      </div>) : <div style={{textAlign: 'center'}}><img src={ring} alt="alt" style={{paddingBottom: '50px'}}/></div>
    return (
      <div className="ads_wrapper">
        {list}
        {!this.props.adsList.advertisement_count && this.props.adsList.advertisement_count !== null && <div className="no_data" style={{textAlign: 'center'}}>No data</div>}
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
