import React, { Component } from 'react';
import TextFieldGroup from '../signup/TextFieldGroup'
import DaysCheck from './DaysCheck'
import TimeCheck from './TimeCheck'
import AgeCheck from './AgeCheck'
import WebsitesCheck from './WebsitesCheck'
import DayInputEnd from '../unisex/DayInputEnd'
import {connect} from 'react-redux'
import {getCountries,getDays,getTimes,getAges,getWebsites,createCampaign} from '../../AC/campaignConstructor'
import validateCampaignForm from '../../functions/validateCampaignForm'
import update from 'react-addons-update'
import {addFlashMessage} from '../../AC/flashMessages'

class CampaignConstructor extends Component {
  state = {
    title: '',
    start_date: '',
    end_date: '',
    country_id: '',
    gender_id: '',
    limit_per_day: '0',
    limit_per_user: '0',
    days: [],
    times: [],
    ages: [],
    websites: [],
    serverDays: [],
    serverTimes: [],
    serverAges: [],
    serverWebsites: [],
    showDatePicker: false,
    errors: {}
  }

  componentDidMount() {
    this.props.getCountries();
    this.props.getDays();
    this.props.getTimes();
    this.props.getAges();
    this.props.getWebsites();
  }

  componentWillReceiveProps() {
    if (this.props.name) {
      const daysArr = this.props.daysEdit.map(item=> item.title);
      const agesArr = this.props.agesEdit.map(item=> item.title);
      const timesArr = this.props.timesEdit.map(item=> item.title);
      const websitesArr = this.props.websitesEdit.map(item=> item.title);
      console.log(daysArr);
      this.setState({
        title: this.props.name,
        gender_id: this.props.gender_id,
        days: daysArr,
        ages: agesArr,
        times: timesArr,
        websites: websitesArr,
        limit_per_day: `${this.props.limit_per_day}`,
        limit_per_user: `${this.props.limit_per_user}`
      })
    }
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    const {isValid} = validateCampaignForm(this.state)
    if (!isValid) {
      const newData = update(this.state.errors, {[e.target.name]: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }

  isValid() {
    const {errors, isValid} = validateCampaignForm(this.state)

    if (!isValid) {
      this.setState({
        errors
      })
    }
    return isValid
  }

  getDateData = (data) => {
    console.log(data);
    if (data.startError === '') {
      let newData = update(this.state.errors, { start_date: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
    if (data.endError) {
      let newData = update(this.state.errors, { end_date: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
    let newData = update(this.state.errors, { end_date: {$set: ''}, start_date: {$set: ''}});
    this.setState({
      start_date: data.from,
      end_date: data.to,
      errors: newData
    })
  }


  onClickHandler = () => {
    this.setState({
      errors : {}
    });
    if (this.isValid()) {
      const data = {
        title: this.state.title,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        country_id: this.state.country_id,
        gender_id: this.state.gender_id,
        limit_per_day: this.state.limit_per_day,
        limit_per_user: this.state.limit_per_user,
        days: this.state.serverDays,
        times: this.state.serverTimes,
        ages: this.state.serverAges,
        websites: this.state.serverWebsites,
      }
      this.props.createCampaign(data).then(
        r => {
          console.log(r);
          if (r.data.success) {
            this.props.addFlashMessage({
              type: 'success',
              text: "Campaign has been created successfully!"
            })
            this.context.router.push('/campaign_list');
          }
        }
      )
    }
  }

  //// other methods

  daysChanged= (days) => {
    if (days.indexOf("All") !== -1) {
      const toServer = this.props.days.map(item => item.id)
      this.setState({
        days: ['All'],
        serverDays: toServer
      });
    }
    if (this.state.days.indexOf("All") !== -1 && this.state.days.length === 1) {
      const allIndex = days.indexOf("All");
      const newArr = days.splice(allIndex, 1)
      const toServer = this.props.days.filter(item => days.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        days: days,
        serverDays: toServer
      });
    }
    if (days.indexOf("All") === -1) {
      const toServer = this.props.days.filter(item => days.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        days: days,
        serverDays: toServer
      });
    }
    const {isValid} = validateCampaignForm(this.state)
    if (!isValid) {
      const newData = update(this.state.errors, {days: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }

  timeChanged= (time) => {
    if (time.indexOf("All") !== -1) {
      const toServer = this.props.times.map(item => item.id)
      this.setState({
        times: ['All'],
        serverTimes: toServer
      });
    }
    if (this.state.times.indexOf("All") !== -1 && this.state.times.length === 1) {
      const allIndex = time.indexOf("All");
      const newArr = time.splice(allIndex, 1)
      const toServer = this.props.times.filter(item => time.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        times: time,
        serverTimes: toServer
      });
    }
    if (time.indexOf("All") === -1) {
      const toServer = this.props.times.filter(item => time.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        times: time,
        serverTimes: toServer
      });
    }
    const {isValid} = validateCampaignForm(this.state)
    if (!isValid) {
      const newData = update(this.state.errors, {times: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }

  ageChanged= (age) => {
    console.log(age);
    if (age.indexOf("All") !== -1) {
      const toServer = this.props.ages.map(item => item.id)
      this.setState({
        ages: ['All'],
        serverAges: toServer
      });
    }
    if (this.state.ages.indexOf("All") !== -1 && this.state.ages.length === 1) {
      const allIndex = age.indexOf("All");
      const newArr = age.splice(allIndex, 1)
      const toServer = this.props.ages.filter(item => age.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        ages: age,
        serverAges: toServer
      });
    }
    if (age.indexOf("All") === -1) {
      const toServer = this.props.ages.filter(item => age.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        ages: age,
        serverAges: toServer
      });
    }
    const {isValid} = validateCampaignForm(this.state)
    if (!isValid) {
      const newData = update(this.state.errors, {ages: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }

  websitesChanged= (websites) => {
    if (websites.indexOf("All") !== -1) {
      const toServer = this.props.websites.map(item => item.id)
      this.setState({
        websites: ['All'],
        serverWebsites: toServer
      });
    }
    if (this.state.websites.indexOf("All") !== -1 && this.state.websites.length === 1) {
      const allIndex = websites.indexOf("All");
      const newArr = websites.splice(allIndex, 1)
      const toServer = this.props.websites.filter(item => websites.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        websites: websites,
        serverWebsites: toServer
      });
    }
    if (websites.indexOf("All") === -1) {
      const toServer = this.props.websites.filter(item => websites.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        websites: websites,
        serverWebsites: toServer
      });
    }
    const {isValid} = validateCampaignForm(this.state)
    if (!isValid) {
      const newData = update(this.state.errors, {websites: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }

  showDatePicker = () => {
    this.setState({
      showDatePicker: true
    })
  }


  render() {
    const {errors} = this.state
    console.log(this.props);
    const dayInputs = !this.state.showDatePicker ?
    <div>
      <div className="data_field">
        <label className="form_group__label">Start Date</label>
        <input
          type="text"
          value={this.props.start_date}
          placeholder="MM-DD-YYYY"
          onFocus={ this.openDaypicker }
          className="form_group__input"
        />
      </div>
      <div className="data_field" style={{float: 'right'}}>
        <label className="form_group__label">End Date</label>
        <input
          type="text"
          value={this.props.end_date}
          placeholder="MM-DD-YYYY"
          className="form_group__input"
        />
      </div>
      <div className="reset" onClick={this.showDatePicker}>Reset</div>
    </div> : <DayInputEnd errors={this.state.errors} getDateData={this.getDateData} startState={this.state.start_date}/>
    const title = this.props.title ? <h2>Edit Campaign</h2> : <h2>Create Campaign</h2>
    const countries = this.props.countries ? this.props.countries.map(item => <option key={item.id} value={item.id}>{item.name}</option>) : null
    const allInArr = [{id:0, title: "All"}]
    const days = this.props.days ? allInArr.concat(this.props.days) : []
    const times = this.props.times ? allInArr.concat(this.props.times) : []
    const ages = this.props.ages ? allInArr.concat(this.props.ages) : []
    const websites = this.props.websites ? allInArr.concat(this.props.websites) : []
    const dataOnEdit = {
      title: this.state.title,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      country_id: this.state.country_id,
      gender_id: this.state.gender_id,
      limit_per_day: this.state.limit_per_day,
      limit_per_user: this.state.limit_per_user,
      days: this.state.serverDays,
      times: this.state.serverTimes,
      ages: this.state.serverAges,
      websites: this.state.serverWebsites,
    }
    const buttonSwitch = !this.props.editbtn ? <button className="form_group__button" onClick={this.onClickHandler}>Create</button> : <button className="form_group__button" onClick={this.props.onClickEdit(this.props.id, dataOnEdit)}>Save</button>
    return (
      <div className="ad_constructor campaign_constructor">
        <div className="ad_constructor__form no_p clearfix">
          {title}
          <div className="input_fields">
            <div className="block">
              <TextFieldGroup
                value={this.state.title}
                label="Name of the compaign"
                placeholder=""
                type="text"
                field="title"
                onChangeHandler={this.onChangeHandler}
                className="form_group__input"
                error={this.state.errors.title}
              />
              <div className="form_group date">
                {dayInputs}
              </div>
            </div>
            <div className="block">
              <div className="form_group">
                <label className="form_group__label">Country</label>
                <select
                  value={this.state.country_id}
                  onChange={this.onChangeHandler}
                  name="country_id"
                  className="form_group__input"
                >
                  <option value="" disabled>Country</option>
                  {countries}
                </select>
                {errors.country_id && <span className="validate_span">{errors.country_id}</span>}
              </div>
              <div className="form_group">
                <label className="form_group__label">Gender</label>
                <select
                  value={this.state.gender_id}
                  onChange={this.onChangeHandler}
                  name="gender_id"
                  className="form_group__input"
                >
                  <option value="" disabled>Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
                {errors.gender_id && <span className="validate_span">{errors.gender_id}</span>}
              </div>
            </div>
          </div>
          <DaysCheck
            title="Days of the week"
            items={days}
            checkTitle={this.state.days}
            daysChanged={this.daysChanged}
            error={this.state.errors.days}
          />
          <TimeCheck
            title="Time"
            items={times}
            checkTitle={this.state.times}
            timeChanged={this.timeChanged}
            error={this.state.errors.times}
          />
          <AgeCheck
            title="Age"
            items={ages}
            checkTitle={this.state.ages}
            ageChanged={this.ageChanged}
            error={this.state.errors.ages}
          />
          <div className="input_fields limits">
            <div className="block">
              <TextFieldGroup
                value={this.state.limit_per_day}
                label="The limit of page views per day"
                placeholder=""
                type="text"
                field="limit_per_day"
                limits="true"
                onChangeHandler={this.onChangeHandler}
                className="form_group__input"
                error={this.state.errors.limit_per_day}
              />
              <TextFieldGroup
                value={this.state.limit_per_user}
                label="Limit of views for each user"
                placeholder=""
                type="text"
                limits="true"
                field="limit_per_user"
                onChangeHandler={this.onChangeHandler}
                className="form_group__input"
                error={this.state.errors.limit_per_user}
              />
            </div>
          </div>
          <WebsitesCheck
            title="Websites"
            items={websites}
            width={{width:150}}
            checkTitle={this.state.websites}
            websitesChanged={this.websitesChanged}
            error={this.state.errors.websites}
          />
          <div className="form_group create_ad">
            {buttonSwitch}
          </div>
        </div>
      </div>
    )
  }
}


CampaignConstructor.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps({campaignGetData}) {
  return {
    countries: campaignGetData.countriesList,
    days: campaignGetData.daysList,
    times: campaignGetData.timesList,
    ages: campaignGetData.agesList,
    websites: campaignGetData.websitesList,
  }
}

export default connect(mapStateToProps, {getCountries,getDays,getTimes,getAges,getWebsites,validateCampaignForm, createCampaign, addFlashMessage})(CampaignConstructor);
