import React, {Component} from 'react'
import FlashList from '../flash/FlashList'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'
import CampaignConstructor from './CampaignConstructor'
import {connect} from 'react-redux'
import {getCampaign, editCampaign} from '../../AC/campaignGet'



class EditCampaign extends Component {
  state = {
    isOpen: false
  }

  componentWillMount= () => {
    this.props.getCampaign(+this.props.params.id)
  }

  componentDidMount= () => {
    document.title = "Create Campaign - Micro Advertising Portal";
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

  onClickEdit = (id, data) => {
    console.log(id);
    console.log(data);
    this.props.editCampaign(id, data)
  }

  render() {
    console.log(this.props);
    const {campaign} = this.props
    console.log(campaign.days);
    const mobileMenu = this.state.isOpen ? <MobileMenu closeMenu={this.closeMenu}/> : null
    return (
      <div className="main_wrapper">
        {mobileMenu}
        <FlashList />
        <Header
          title="Edit campaign"
          text="Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per."
          openMenu={this.openMenu}
          logOut={this.logOut}
        />
        <CampaignConstructor
          id={+this.props.params.id}
          title="Edit Campaign"
          name={campaign.title !== undefined ? campaign.title : ''}
          start_date={campaign.start_date !== undefined ? campaign.start_date : ''}
          end_date={campaign.end_date !== undefined ? campaign.end_date : ''}
          gender_id={campaign.gender_id !== undefined ? campaign.gender_id : ''}
          daysEdit={campaign.days !== undefined ? campaign.days : ''}
          agesEdit={campaign.ages !== undefined ? campaign.ages : ''}
          timesEdit={campaign.times !== undefined ? campaign.times : ''}
          websitesEdit={campaign.websites !== undefined ? campaign.websites : ''}
          limit_per_day={campaign.limit_per_day !== undefined ? campaign.limit_per_day : ''}
          limit_per_user={campaign.limit_per_user !== undefined ? campaign.limit_per_user : ''}
          editbtn={true}
          onClickEdit={this.onClickEdit}
        />
        <Footer />
      </div>
    );
  }
}

EditCampaign.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps({campaignGetData}) {
  return {
    campaign: campaignGetData.campaign
  }
}

export default connect(mapStateToProps, {getCampaign, editCampaign})(EditCampaign)
