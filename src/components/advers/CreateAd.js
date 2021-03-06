import React, {Component} from 'react'
import FlashList from '../flash/FlashList'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'
import AdConstructor from './AdConstructor'
import {connect} from 'react-redux'
import {getCampaignList} from '../../AC/campaignGet'


class CreateAd extends Component {
  state = {
    isOpen: false
  }

  componentWillMount() {
    this.props.getCampaignList()
  }

  componentDidMount= () => {
    document.title = "Create Advertise - Micro Advertising Portal";
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
    console.log(this.props);
    const campaignList = this.props.campaignList.campaign_count !== null ? this.props.campaignList.campaign_array.data.map(item => <option key={item.id} value={item.id}>{item.title}</option>) : null
    const mobileMenu = this.state.isOpen ? <MobileMenu closeMenu={this.closeMenu}/> : null
    return (
      <div className="main_wrapper">
        {mobileMenu}
        <FlashList />
        <Header
          title="Create adverts"
          text="Service which allows you to create advertisements. You can easily manage the process and to increase their sales."
          openMenu={this.openMenu}
          logOut={this.logOut}
        />
        <AdConstructor
          campaignList={campaignList}
        />
        <Footer />
      </div>
    );
  }
}

CreateAd.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps({campaignGetData}) {
  return {
    campaignList: campaignGetData.campaignList
  }
}

export default connect(mapStateToProps, {getCampaignList})(CreateAd)
