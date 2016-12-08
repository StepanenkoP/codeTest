import React, { Component } from 'react';
import Awaiting from './Awaiting'
import NotActive from './NotActive'
import Active from './Active'
import {loadAds} from '../../AC/adsAC'
import {connect} from 'react-redux'

class AdList extends Component {

  componentWillMount() {
    this.props.loadAds()
  }

  render() {
    console.log(this.props);
    const list = this.props.adsList.map(item =>
      <div key={item.id}>
        <Awaiting
          title={item.title}
          created_at={item.created_at.split(' ')[0]}
          short_description={item.short_description}
          image={item.image}
          id={item.id}
        />
      </div>)
    return (
      <div className="ads_wrapper">
        {list}
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
