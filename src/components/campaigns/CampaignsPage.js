import React, {Component} from 'react'
import FlashList from '../flash/FlashList'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'
import CreateBlock from '../unisex/CreateBlock'
import CampaignList from './CampaignList'
import {getCampaignList} from '../../AC/campaignGet'
import {connect} from 'react-redux'


class CampaignsPage extends Component {
  state = {
    isOpen: false
  }


  componentWillMount= () => {
    document.title = "List of Campaigns - Micro Advertising Portal";
  }

  componentDidMount() {
    this.props.getCampaignList()
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
    const mobileMenu = this.state.isOpen ? <MobileMenu closeMenu={this.closeMenu}/> : null
    const content = this.props.params.id === undefined ?
    <div className="main_wrapper">
      {mobileMenu}
      <FlashList />
      <Header
        title="List of campaigns"
        text="Service which allows you to create advertisements. You can easily manage the process and to increase their sales."
        openMenu={this.openMenu}
        logOut={this.logOut}
      />
      <CreateBlock />
      <CampaignList />
      <Footer />
    </div> : <div>{this.props.children}</div>
    return (
      <div>
        {content}
      </div>
    );
  }
}

CampaignsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps({campaignGetData}) {
  return {
    campaignList: campaignGetData.campaignList
  }
}

export default connect(mapStateToProps, {getCampaignList})(CampaignsPage)
