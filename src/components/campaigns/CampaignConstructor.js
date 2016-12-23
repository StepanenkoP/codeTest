import React, { Component } from 'react';
import TextFieldGroup from '../signup/TextFieldGroup'
import DaysCheck from './DaysCheck'
import TimeCheck from './TimeCheck'
import AgeCheck from './AgeCheck'
import WebsitesCheck from './WebsitesCheck'
import AfricaCheck from './AfricaCheck'
import AmericaCheck from './AmericaCheck'
import AsiaCheck from './AsiaCheck'
import EuropeCheck from './EuropeCheck'
import OceaniaCheck from './OceaniaCheck'
import DayInputEnd from '../unisex/DayInputEnd'
import {connect} from 'react-redux'
import {getCountries,getDays,getTimes,getAges,getWebsites,createCampaign} from '../../AC/campaignConstructor'
import validateCampaignForm from '../../functions/validateCampaignForm'
import update from 'react-addons-update'
import {addFlashMessage} from '../../AC/flashMessages'
import back from '../../img/signup/back.png'

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
    serverAfrica: [],
    serverAmerica: [],
    serverAsia: [],
    serverEurope: [],
    serverOceania: [],
    serverCountries: [],
    showDatePicker: true,
    showModal: false,
    africa: [],
    america: [],
    asia: [],
    europe: [],
    oceania: [],
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
      const daysArrServer = this.props.daysEdit.map(item=> item.id);
      const agesArr = this.props.agesEdit.map(item=> item.title);
      const agesArrServer = this.props.agesEdit.map(item=> item.id);
      const timesArr = this.props.timesEdit.map(item=> item.title);
      const timesArrServer = this.props.timesEdit.map(item=> item.id);
      const websitesArr = this.props.websitesEdit.map(item=> item.title);
      const websitesArrServer = this.props.websitesEdit.map(item=> item.id);
      const africaArr = this.props.africaEdit.map(item=> item.title)
      const americaArr = this.props.americaEdit.map(item=> item.title)
      const asiaArr = this.props.asiaEdit.map(item=> item.title)
      const europeArr = this.props.europeEdit.map(item=> item.title)
      const oceaniaArr = this.props.oceaniaEdit.map(item=> item.title)
      const serverAfricaArr = this.props.africaEdit.map(item=> item.id)
      const serverAmericaArr = this.props.americaEdit.map(item=> item.id)
      const serverAsiaArr = this.props.asiaEdit.map(item=> item.id)
      const serverEuropeArr = this.props.europeEdit.map(item=> item.id)
      const serverOceaniaArr = this.props.oceaniaEdit.map(item=> item.id)
      this.setState({
        title: this.props.name,
        gender_id: `${this.props.gender_id}`,
        days: daysArr.length === 7 ? ['All'].concat(daysArr) : daysArr,
        serverDays: daysArrServer,
        serverAges: agesArrServer,
        serverTimes: timesArrServer,
        serverWebsites: websitesArrServer,
        start_date: this.props.start_date,
        end_date: this.props.end_date,
        ages: agesArr.length === 6 ? ['All'].concat(agesArr) : agesArr,
        times: timesArr.length === 24 ? ['All'].concat(timesArr) : timesArr,
        websites: websitesArr.length === 5 ? ['All'].concat(websitesArr) : websitesArr,
        limit_per_day: `${this.props.limit_per_day}`,
        limit_per_user: `${this.props.limit_per_user}`,
        country_id: `${this.props.country_id}`,
        showDatePicker: this.props.showDatePicker ? false : true,
        africa: africaArr.length === 58 ? ['All'].concat(africaArr) : africaArr,
        america: americaArr.length === 55 ? ['All'].concat(americaArr) : americaArr,
        asia: asiaArr.length === 51 ? ['All'].concat(asiaArr) : asiaArr,
        europe: europeArr.length === 51 ? ['All'].concat(europeArr) : europeArr,
        oceania: oceaniaArr.length === 25 ? ['All'].concat(oceaniaArr) : oceaniaArr,
        serverAfrica: serverAfricaArr,
        serverAmerica: serverAmericaArr,
        serverAsia: serverAsiaArr,
        serverEurope: serverEuropeArr,
        serverOceania: serverOceaniaArr
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

  clickModal = () => {
    this.setState({
      showModal: true
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false
    })
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
        countries: [].concat(this.state.serverAfrica, this.state.serverAmerica, this.state.serverAsia, this.state.serverEurope, this.state.serverOceania),
        gender_id: this.state.gender_id,
        limit_per_day: this.state.limit_per_day,
        limit_per_user: this.state.limit_per_user,
        days: this.state.serverDays,
        times: this.state.serverTimes,
        ages: this.state.serverAges,
        websites: this.state.serverWebsites,
      }
      if (!this.props.start_date) {
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
      } else {
        const obj = {
          formData: data,
          id: this.props.id
        }
        this.props.onClickEdit(obj)
      }
    }
  }

  //// other methods

  daysChanged= (days) => {
    if (days.indexOf("All") !== -1) {
      const toServer = this.props.days.map(item => item.id)
      const toClient = this.props.days.map(item => item.title)
      this.setState({
        days: ['All'].concat(toClient),
        serverDays: toServer
      });
    }
    if (this.state.days.indexOf("All") !== -1 && this.state.serverDays.length === this.props.days.length) {
      const allIndex = days.indexOf("All");
      const newArr = allIndex === -1 ? days = [] : days.splice(allIndex, 1)
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
      const toClient = this.props.times.map(item => item.title)
      this.setState({
        times: ['All'].concat(toClient),
        serverTimes: toServer
      });
    }
    if (this.state.times.indexOf("All") !== -1 && this.state.serverTimes.length === this.props.times.length) {
      const allIndex = time.indexOf("All");
      const newArr = allIndex === -1 ? time = [] : time.splice(allIndex, 1)
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
    if (age.indexOf("All") !== -1) {
      const toServer = this.props.ages.map(item => item.id)
      const toClient = this.props.ages.map(item => item.title)
      this.setState({
        ages: ['All'].concat(toClient),
        serverAges: toServer
      });
    }
    if (this.state.ages.indexOf("All") !== -1 && this.state.serverAges.length === this.props.ages.length) {
      const allIndex = age.indexOf("All");
      const newArr = allIndex === -1 ? age = [] : age.splice(allIndex, 1)
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
      const toClient = this.props.websites.map(item => item.title)
      this.setState({
        websites: ['All'].concat(toClient),
        serverWebsites: toServer
      });
    }
    if (this.state.websites.indexOf("All") !== -1 && this.state.serverWebsites.length === this.props.websites.length) {
      const allIndex = websites.indexOf("All");
      const newArr = allIndex === -1 ? websites = [] : websites.splice(allIndex, 1)
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.serverAfrica !== this.state.serverAfrica) {
      this.setState({
        country_id: 'checked'
      })
    }
    if (prevState.serverAmerica !== this.state.serverAmerica) {
      this.setState({
        country_id: 'checked'
      })
    }
    if (prevState.serverAsia !== this.state.serverAsia) {
      this.setState({
        country_id: 'checked'
      })
    }
    if (prevState.serverEurope !== this.state.serverEurope) {
      this.setState({
        country_id: 'checked'
      })
    }
    if (prevState.serverOceania !== this.state.serverOceania) {
      this.setState({
        country_id: 'checked'
      })
    }
    if (prevState.serverAfrica.length > this.state.serverAfrica) {
      this.setState({
        country_id: ''
      })
    }
    if (prevState.serverAmerica.length > this.state.serverAmerica) {
      this.setState({
        country_id: ''
      })
    }
    if (prevState.serverAsia.length > this.state.serverAsia) {
      this.setState({
        country_id: ''
      })
    }
    if (prevState.serverEurope.length > this.state.serverEurope) {
      this.setState({
        country_id: ''
      })
    }
    if (prevState.serverOceania.length > this.state.serverOceania) {
      this.setState({
        country_id: ''
      })
    }
  }

  africaChanged= (africa) => {
    if (africa.indexOf("All") !== -1) {
      const toServer = this.props.countries.Africa.map(item => item.id)
      const toClient = this.props.countries.Africa.map(item => item.title)
      this.setState({
        africa: ['All'].concat(toClient),
        serverAfrica: toServer
      });
    }
    if (this.state.africa.indexOf("All") !== -1 && this.state.serverAfrica.length === this.props.countries.Africa.length) {
      const allIndex = africa.indexOf("All");
      const newArr = allIndex === -1 ? africa = [] : africa.splice(allIndex, 1)
      const toServer = this.props.countries.Africa.filter(item => africa.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        africa: africa,
        serverAfrica: toServer
      });
    }
    if (africa.indexOf("All") === -1) {
      const toServer = this.props.countries.Africa.filter(item => africa.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        africa: africa,
        serverAfrica: toServer
      });
    }
    const {isValid} = validateCampaignForm(this.state)
    if (!isValid) {
      const newData = update(this.state.errors, {country_id: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }

  americaChanged= (america) => {
    if (america.indexOf("All") !== -1) {
      const toServer = this.props.countries.Americas.map(item => item.id)
      const toClient = this.props.countries.Americas.map(item => item.title)
      this.setState({
        america: ['All'].concat(toClient),
        serverAmerica: toServer
      });
    }
    if (this.state.america.indexOf("All") !== -1 && this.state.serverAmerica.length === this.props.countries.Americas.length) {
      const allIndex = america.indexOf("All");
      const newArr = allIndex === -1 ? america = [] : america.splice(allIndex, 1)
      const toServer = this.props.countries.Americas.filter(item => america.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        america: america,
        serverAmerica: toServer
      });
    }
    if (america.indexOf("All") === -1) {
      const toServer = this.props.countries.Americas.filter(item => america.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        america: america,
        serverAmerica: toServer
      });
    }
    const {isValid} = validateCampaignForm(this.state)
    if (!isValid) {
      const newData = update(this.state.errors, {country_id: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }

  asiaChanged= (asia) => {
    if (asia.indexOf("All") !== -1) {
      const toServer = this.props.countries.Asia.map(item => item.id)
      const toClient = this.props.countries.Asia.map(item => item.title)
      this.setState({
        asia: ['All'].concat(toClient),
        serverAsia: toServer
      });
    }
    if (this.state.asia.indexOf("All") !== -1 && this.state.serverAsia.length === this.props.countries.Asia.length) {
      const allIndex = asia.indexOf("All");
      const newArr = allIndex === -1 ? asia = [] : asia.splice(allIndex, 1)
      const toServer = this.props.countries.Asia.filter(item => asia.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        asia: asia,
        serverAsia: toServer
      });
    }
    if (asia.indexOf("All") === -1) {
      const toServer = this.props.countries.Asia.filter(item => asia.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        asia: asia,
        serverAsia: toServer
      });
    }
    const {isValid} = validateCampaignForm(this.state)
    if (!isValid) {
      const newData = update(this.state.errors, {country_id: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }

  europeChanged= (europe) => {
    if (europe.indexOf("All") !== -1) {
      const toServer = this.props.countries.Europe.map(item => item.id)
      const toClient = this.props.countries.Europe.map(item => item.title)
      this.setState({
        europe: ['All'].concat(toClient),
        serverEurope: toServer
      });
    }
    if (this.state.europe.indexOf("All") !== -1 && this.state.serverEurope.length === this.props.countries.Europe.length) {
      const allIndex = europe.indexOf("All");
      const newArr = allIndex === -1 ? europe = [] : europe.splice(allIndex, 1)
      const toServer = this.props.countries.Europe.filter(item => europe.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        europe: europe,
        serverEurope: toServer
      });
    }
    if (europe.indexOf("All") === -1) {
      const toServer = this.props.countries.Europe.filter(item => europe.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        europe: europe,
        serverEurope: toServer
      });
    }
    const {isValid} = validateCampaignForm(this.state)
    if (!isValid) {
      const newData = update(this.state.errors, {country_id: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }

  oceaniaChanged= (oceania) => {
    if (oceania.indexOf("All") !== -1) {
      const toServer = this.props.countries.Oceania.map(item => item.id)
      const toClient = this.props.countries.Oceania.map(item => item.title)
      this.setState({
        oceania: ['All'].concat(toClient),
        serverOceania: toServer
      });
    }
    if (this.state.oceania.indexOf("All") !== -1 && this.state.serverOceania.length === this.props.countries.Oceania.length) {
      const allIndex = oceania.indexOf("All");
      const newArr = allIndex === -1 ? oceania = [] : oceania.splice(allIndex, 1)
      const toServer = this.props.countries.Oceania.filter(item => oceania.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        oceania: oceania,
        serverOceania: toServer
      });
    }
    if (oceania.indexOf("All") === -1) {
      const toServer = this.props.countries.Oceania.filter(item => oceania.indexOf(item.title) !== -1).map(item=> item.id)
      this.setState({
        oceania: oceania,
        serverOceania: toServer
      });
    }
    const {isValid} = validateCampaignForm(this.state)
    if (!isValid) {
      const newData = update(this.state.errors, {country_id: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }

  showDatePicker = () => {
    this.setState({
      showDatePicker: true,
      start_date: '',
      end_date: ''
    })
  }


  render() {
    console.log(this.props.days);
    const {errors} = this.state
    const dayInputs = !this.state.showDatePicker ?
    <div>
      <div className="data_field">
        <label className="form_group__label">Start Date</label>
        <input
          type="text"
          value={this.props.start_date}
          placeholder="YYYY-MM-DD"
          onFocus={ this.openDaypicker }
          className="form_group__input"
          onChange={() => {}}
        />
      </div>
      <div className="data_field" style={{float: 'right'}}>
        <label className="form_group__label">End Date</label>
        <input
          type="text"
          value={this.props.end_date}
          placeholder="YYYY-MM-DD"
          onChange={() => {}}
          className="form_group__input"
        />
      </div>
      <div className="reset" onClick={this.showDatePicker}>Reset</div>
    </div> : <DayInputEnd errors={this.state.errors} getDateData={this.getDateData} startState={this.state.start_date}/>
    const title = this.props.title ? <h2>Edit Campaign</h2> : <h2>Create Campaign</h2>
    const allInArr = [{id:0, title: "All"}]
    const days = this.props.days.length ? allInArr.concat(this.props.days) : []
    const countriesAfrica = this.props.countries.Africa ? allInArr.concat(this.props.countries.Africa) : []
    const countriesAmerica = this.props.countries.Americas ? allInArr.concat(this.props.countries.Americas) : []
    const countriesAsia = this.props.countries.Asia ? allInArr.concat(this.props.countries.Asia) : []
    const countriesEurope = this.props.countries.Europe ? allInArr.concat(this.props.countries.Europe) : []
    const countriesOceania = this.props.countries.Oceania ? allInArr.concat(this.props.countries.Oceania) : []
    const times = this.props.times.length ? allInArr.concat(this.props.times) : []
    const ages = this.props.ages.length ? allInArr.concat(this.props.ages) : []
    const websites = this.props.websites.length ? allInArr.concat(this.props.websites) : []
    const dataOnEdit = {
      id: this.props.id,
      formData: {
        title: this.state.title,
        start_date: this.props.start_date,
        end_date: this.props.end_date,
        country_id: this.state.country_id,
        gender_id: this.state.gender_id,
        limit_per_day: this.state.limit_per_day,
        limit_per_user: this.state.limit_per_user,
        days: this.state.serverDays,
        times: this.state.serverTimes,
        ages: this.state.serverAges,
        websites: this.state.serverWebsites,
      }
    }
    const countriesChosen = this.state.serverAfrica.length + this.state.serverAsia.length + this.state.serverAmerica.length + this.state.serverEurope.length + this.state.serverOceania.length
    const buttonSwitch = !this.props.editbtn ? <button className="form_group__button" onClick={this.onClickHandler}>Create</button> : <button className="form_group__button" onClick={this.onClickHandler}>Save</button>
  const countryModal = !this.state.showModal ? <div className="ad_constructor__form no_p clearfix">
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
        <div className="form_group country">
          <label className="form_group__label">Country</label>
          <button className="country" onClick={this.clickModal}>click to choose</button>
          <span className="chosen">{countriesChosen} chosen</span>
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
            <option value="0">Both</option>
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
  :
  <div className="ad_constructor__form no_p clearfix">
    <div className="back" onClick={this.closeModal}><img src={back} alt="alt"/> Back</div>
    <h2>Choose your Countries</h2>
    <AfricaCheck
      title="Africa"
      items={countriesAfrica}
      width={{width:150}}
      checkTitle={this.state.africa}
      africaChanged={this.africaChanged}
    />
    <AmericaCheck
      title="America"
      items={countriesAmerica}
      width={{width:150}}
      checkTitle={this.state.america}
      americaChanged={this.americaChanged}
    />
    <AsiaCheck
      title="Asia"
      items={countriesAsia}
      width={{width:150}}
      checkTitle={this.state.asia}
      asiaChanged={this.asiaChanged}
    />
    <EuropeCheck
      title="Europe"
      items={countriesEurope}
      width={{width:150}}
      checkTitle={this.state.europe}
      europeChanged={this.europeChanged}
    />
    <OceaniaCheck
      title="Oceania"
      items={countriesOceania}
      width={{width:150}}
      checkTitle={this.state.oceania}
      oceaniaChanged={this.oceaniaChanged}
    />
    <div className="form_group create_ad">
      <button className="form_group__button" onClick={this.closeModal}>Back</button>
    </div>
  </div>

    return (
      <div className="ad_constructor campaign_constructor">
        {countryModal}
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
    websites: campaignGetData.websitesList
  }
}

export default connect(mapStateToProps, {getCountries,getDays,getTimes,getAges,getWebsites,validateCampaignForm, createCampaign, addFlashMessage})(CampaignConstructor);
