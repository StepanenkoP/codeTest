import React, {Component} from 'react'
import FlashList from '../flash/FlashList'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'
import AdStatsContainer from './AdStatsContainer'
import {connect} from 'react-redux'
import {getAdStats} from '../../AC/adsAC'
import isEmpty from 'lodash/isEmpty'



class CreateAd extends Component {
  state = {
    isOpen: false,
  }


  componentDidMount= () => {
    document.title = "Statistics - Micro Advertising Portal";
    this.props.getAdStats(this.props.params.id)
  }

  openMenu = () => {
    this.setState({
      isOpen: true
    })
  }

  closeMenu = () => {
    this.setState({
      isOpen: false
    })
  }

  logOut = () => {
    localStorage.removeItem('token');
    this.context.router.push('/login');
  }

  render() {
    console.log(this.props.adStats);
    const mobileMenu = this.state.isOpen ? <MobileMenu closeMenu={this.closeMenu}/> : null
    return (
      <div className="main_wrapper">
        {mobileMenu}
        <FlashList />
        <Header
          title="Statistics"
          text={`${!isEmpty(this.props.adStats) ? this.props.adStats.adv_title : ""} ${!isEmpty(this.props.adStats) ? this.props.adStats.adv_id : ''}`}
          openMenu={this.openMenu}
          logOut={this.logOut}
        />
        <AdStatsContainer
          idWithData={this.props.params.id}
          id={!isEmpty(this.props.adStats) ? this.props.adStats.adv_id : ''}
          stats={!isEmpty(this.props.adStats) ? this.props.adStats.adv_stats : []}
          title={!isEmpty(this.props.adStats) ? this.props.adStats.adv_title : ''}
        />
        <Footer />
      </div>
    );
  }
}

CreateAd.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps({adsData}) {
  return {
    adStats: adsData.adStats
  }
}

export default connect(mapStateToProps, {getAdStats})(CreateAd)
