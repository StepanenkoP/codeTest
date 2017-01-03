import React, {Component} from 'react'
import FlashList from '../flash/FlashList'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'
import AdConstructor from './AdConstructor'
import {connect} from 'react-redux'
import {getCampaignList} from '../../AC/campaignGet'
import {loadAd} from '../../AC/adsAC'
import ring from '../../img/main/ring.svg'


class EditAd extends Component {
  state = {
    isOpen: false
  }

  componentWillMount() {
    this.props.loadAd(this.props.params.id)
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
    const {title, short_description, description, image, campaign_id, url_link} = this.props.ad
    const campaignList = this.props.campaignList.campaign_count !== null ? this.props.campaignList.campaign_array.data.map(item => <option key={item.id} value={item.id}>{item.title}</option>) : null
    const mobileMenu = this.state.isOpen ? <MobileMenu closeMenu={this.closeMenu}/> : null
    const loader =
    !this.props.ad.error && title ?
    <AdConstructor
      id={this.props.params.id}
      campaignList={campaignList}
      title='Edit adverts'
      adTitle={title}
      short_description={short_description}
      description={description}
      image={image}
      campaign_id={campaign_id}
      url_link={url_link}
    /> : <div style={{textAlign: 'center', marginTop: '150px'}}><img src={ring} alt="alt" style={{paddingBottom: '150px'}}/></div>
    const noData = this.props.ad.error ? <div className="no_data" style={{textAlign: 'center'}}>No data</div> : loader
    return (
      <div className="main_wrapper">
        {mobileMenu}
        <FlashList />
        <Header
          title="Edit adverts"
          text="Service which allows you to create advertisements. You can easily manage the process and to increase their sales."
          openMenu={this.openMenu}
          logOut={this.logOut}
        />
        {noData}
        <Footer />
      </div>
    );
  }
}

EditAd.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps({adsData, campaignGetData}) {
  return {
    campaignList: campaignGetData.campaignList,
    ad: adsData.ad
  }
}

export default connect(mapStateToProps, {loadAd, getCampaignList})(EditAd)
