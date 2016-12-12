import React, {Component} from 'react'
import FlashList from '../flash/FlashList'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'
import CampaignConstructor from './CampaignConstructor'
import {connect} from 'react-redux'
import {getCampaign, editCampaign} from '../../AC/campaignGet'
import validateCampaignForm from '../../functions/validateCampaignForm'
import {addFlashMessage} from '../../AC/flashMessages'
import ring from '../../img/main/ring.svg'
import isEmpty from 'lodash/isEmpty'



class EditCampaign extends Component {
  state = {
    isOpen: false,
    formData: {}
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

  componentDidUpdate() {
    if (this.state.formData.title) {
      console.log(this.state.formData);
      const obj = {
        formData: this.state.formData,
        id: this.state.id
      }
      this.props.editCampaign(obj).then(
        r => {
          console.log(r);
          if (r.data.success) {
            this.props.addFlashMessage({
              type: 'success',
              text: 'Campaign has been edited successfully!'
            })
            this.context.router.push('/campaign_list')
          }
        }
      )
    }
  }


  onClickEdit = (data) => {
    console.log(data);
    const {formData} = data
    const {id} = data
    this.setState({
      formData,
      id
    })
  }



  render() {
    const {campaign} = this.props
    console.log(campaign);
    const mobileMenu = this.state.isOpen ? <MobileMenu closeMenu={this.closeMenu}/> : null
    const loader =
    !campaign.error && !isEmpty(campaign) && campaign.days.length && campaign.times.length && campaign.ages.length && campaign.websites.length ?
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
      country_id={campaign.country_id !== undefined ? campaign.country_id : ''}
      editbtn={true}
      showDatePicker={false}
      onClickEdit={this.onClickEdit}
    /> : <div style={{textAlign: 'center', marginTop: '50px'}}><img src={ring} alt="alt" style={{paddingBottom: '50px'}}/></div>
  const noData = campaign.error ? <div className="no_data" style={{textAlign: 'center'}}>No data</div> : loader
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
        {noData}
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

export default connect(mapStateToProps, {getCampaign, editCampaign, addFlashMessage})(EditCampaign)
