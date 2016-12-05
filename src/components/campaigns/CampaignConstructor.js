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
    errors: {}
  }

  componentDidMount() {
    this.props.getCountries();
    this.props.getDays();
    this.props.getTimes();
    this.props.getAges();
    this.props.getWebsites();
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

  // onChange = (e) => {
  //   if (this.state.days.indexOf(e.target.name) > -1) {
  //     console.log(e.target.name);
  //     const filteredArr = this.state.days.filter(item => {
  //       return item !== e.target.name
  //     })
  //     console.log(filteredArr);
  //     this.setState({
  //       days: filteredArr
  //     })
  //   } else {
  //     console.log(e);
  //     const newDaysArr = this.state.days
  //     newDaysArr.push(e.target.name)
  //     console.log(newDaysArr);
  //     this.setState({
  //       days: newDaysArr,
  //       daysAll: false
  //     })
  //     if (e.target.name === "All") {
  //       const allDaysArr = ["All"]
  //       this.setState({
  //         days: allDaysArr,
  //         daysAll: true
  //       })
  //     }
  //   }
  // }

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
        }
      )
    }
  }

  //// other methods

  daysChanged= (days) => {
    if (days.indexOf("All") !== -1) {
      const toServer = this.props.days.map(item => item.title)
      this.setState({
        days: ['All'],
        serverDays: toServer
      });
    }
    if (this.state.days.indexOf("All") !== -1 && this.state.days.length === 1) {
      const allIndex = days.indexOf("All");
      const newArr = days.splice(allIndex, 1)
      this.setState({
        days: days,
        serverDays: days
      });
    }
    if (days.indexOf("All") === -1) {
      this.setState({
        days: days,
        serverDays: days
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
      const toServer = this.props.times.map(item => item.title)
      this.setState({
        times: ['All'],
        serverTimes: toServer
      });
    }
    if (this.state.times.indexOf("All") !== -1 && this.state.times.length === 1) {
      const allIndex = time.indexOf("All");
      const newArr = time.splice(allIndex, 1)
      this.setState({
        times: time,
        serverTimes: time
      });
    }
    if (time.indexOf("All") === -1) {
      this.setState({
        times: time,
        serverTimes: time
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
      const toServer = this.props.ages.map(item => item.title)
      this.setState({
        ages: ['All'],
        serverAges: toServer
      });
    }
    if (this.state.ages.indexOf("All") !== -1 && this.state.ages.length === 1) {
      const allIndex = age.indexOf("All");
      const newArr = age.splice(allIndex, 1)
      this.setState({
        ages: age,
        serverAges: age
      });
    }
    if (age.indexOf("All") === -1) {
      this.setState({
        ages: age,
        serverAges: age
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
      const toServer = this.props.websites.map(item => item.title)
      this.setState({
        websites: ['All'],
        serverWebsites: toServer
      });
    }
    if (this.state.websites.indexOf("All") !== -1 && this.state.websites.length === 1) {
      const allIndex = websites.indexOf("All");
      const newArr = websites.splice(allIndex, 1)
      this.setState({
        websites: websites,
        serverWebsites: websites
      });
    }
    if (websites.indexOf("All") === -1) {
      this.setState({
        websites: websites,
        serverWebsites: websites
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

  render() {
    const {errors} = this.state
    const countries = this.props.countries ? this.props.countries.map(item => <option key={item.id} value={item.id}>{item.name}</option>) : null
    const allInArr = [{id:0, title: "All"}]
    const days = this.props.days ? allInArr.concat(this.props.days) : []
    const times = this.props.times ? allInArr.concat(this.props.times) : []
    const ages = this.props.ages ? allInArr.concat(this.props.ages) : []
    const websites = this.props.websites ? allInArr.concat(this.props.websites) : []
    return (
      <div className="ad_constructor campaign_constructor">
        <div className="ad_constructor__form no_p clearfix">
          <h2>Create Campaign</h2>
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
                <DayInputEnd errors={this.state.errors} getDateData={this.getDateData} />
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
            <button className="form_group__button" onClick={this.onClickHandler}>Create</button>
          </div>
        </div>
      </div>
    )
  }
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

export default connect(mapStateToProps, {getCountries,getDays,getTimes,getAges,getWebsites,validateCampaignForm, createCampaign})(CampaignConstructor);
