import React, { Component } from 'react';
import TextFieldGroup from '../signup/TextFieldGroup'
import DaysCheck from './DaysCheck'
import TimeCheck from './TimeCheck'
import AgeCheck from './AgeCheck'
import WebsitesCheck from './WebsitesCheck'

class CampaignConstructor extends Component {
  state = {
    name: '',
    start_date: '',
    end_date: '',
    country: '',
    gender: '',
    page_limit: '',
    views_limit: '',
    days: [],
    time: [],
    age: [],
    websites: [],
    errors: {}
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChange = (e) => {
    if (this.state.days.indexOf(e.target.name) > -1) {
      console.log(e.target.name);
      const filteredArr = this.state.days.filter(item => {
        return item !== e.target.name
      })
      console.log(filteredArr);
      this.setState({
        days: filteredArr
      })
    } else {
      console.log(e);
      const newDaysArr = this.state.days
      newDaysArr.push(e.target.name)
      console.log(newDaysArr);
      this.setState({
        days: newDaysArr,
        daysAll: false
      })
      if (e.target.name === "All") {
        const allDaysArr = ["All"]
        this.setState({
          days: allDaysArr,
          daysAll: true
        })
      }
    }
  }

  daysChanged= (days) => {
    if (days.indexOf("All") !== -1) {
      this.setState({
        days: ['All']
      });
    }
    if (this.state.days.indexOf("All") !== -1 && this.state.days.length === 1) {
      const allIndex = days.indexOf("All");
      const newArr = days.splice(allIndex, 1)
      this.setState({
        days: days
      });
    }
    if (days.indexOf("All") === -1) {
      this.setState({
        days: days
      });
    }
  }

  timeChanged= (time) => {
    if (time.indexOf("All") !== -1) {
      this.setState({
        time: ['All']
      });
    }
    if (this.state.time.indexOf("All") !== -1 && this.state.time.length === 1) {
      const allIndex = time.indexOf("All");
      const newArr = time.splice(allIndex, 1)
      this.setState({
        time: time
      });
    }
    if (time.indexOf("All") === -1) {
      this.setState({
        time: time
      });
    }
  }

  ageChanged= (age) => {
    if (age.indexOf("All") !== -1) {
      this.setState({
        age: ['All']
      });
    }
    if (this.state.age.indexOf("All") !== -1 && this.state.age.length === 1) {
      const allIndex = age.indexOf("All");
      const newArr = age.splice(allIndex, 1)
      this.setState({
        age: age
      });
    }
    if (age.indexOf("All") === -1) {
      this.setState({
        age: age
      });
    }
  }

  websitesChanged= (websites) => {
    if (websites.indexOf("All") !== -1) {
      this.setState({
        websites: ['All']
      });
    }
    if (this.state.websites.indexOf("All") !== -1 && this.state.websites.length === 1) {
      const allIndex = websites.indexOf("All");
      const newArr = websites.splice(allIndex, 1)
      this.setState({
        websites: websites
      });
    }
    if (websites.indexOf("All") === -1) {
      this.setState({
        websites: websites
      });
    }
  }

  render() {
    return (
      <div className="ad_constructor campaign_constructor">
        <div className="ad_constructor__form no_p clearfix">
          <h2>Create Campaign</h2>
          <div className="input_fields">
            <div className="block">
              <TextFieldGroup
                value={this.state.name}
                label="Name of the compaign"
                placeholder=""
                type="text"
                field={this.state.name}
                onChangeHandler={this.onChangeHandler}
                className="form_group__input"
              />
              <div className="form_group date">
                <div className="data_field">
                  <label className="form_group__label">Start Date</label>
                  <input
                    value={this.state.start_date}
                    onChange={this.onChangeHandler}
                    type="text"
                    name={this.state.start_date}
                    placeholder=""
                    className="form_group__input"
                  />
                  {this.state.errors.start_date && <span className="validate_span">{this.state.errors.start_date}</span>}
                </div>
                <div className="data_field">
                  <label className="form_group__label">End Date</label>
                  <input
                    value={this.state.end_date}
                    onChange={this.onChangeHandler}
                    type="text"
                    name={this.state.end_date}
                    placeholder=""
                    className="form_group__input"
                  />
                  {this.state.errors.end_date && <span className="validate_span">{this.state.errors.end_date}</span>}
                </div>
              </div>
            </div>
            <div className="block">
              <div className="form_group">
                <label className="form_group__label">Country</label>
                <select
                  value={this.state.country}
                  onChange={this.onChangeHandler}
                  name="country"
                  className="form_group__input"
                >
                  <option value="" disabled>Country</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                {/* {errors.select_compaign && <span className="validate_span">{errors.select_compaign}</span>} */}
              </div>
              <div className="form_group">
                <label className="form_group__label">Gender</label>
                <select
                  value={this.state.gender}
                  onChange={this.onChangeHandler}
                  name="gender"
                  className="form_group__input"
                >
                  <option value="" disabled>Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
                {/* {errors.select_compaign && <span className="validate_span">{errors.select_compaign}</span>} */}
              </div>
            </div>
          </div>
          <DaysCheck
            title="Days of the week"
            items={["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}
            checkTitle={this.state.days}
            daysChanged={this.daysChanged}
          />
          <TimeCheck
            title="Time"
            items={["All", "0-1 am", "1-2 am", "2-3 am", "3-4 am", "4-5 am", "5-6 am", "6-7 am", "7-8 am", "8-9 am", "9-10 am", "10-11 am",
            "11-12 am", "0-1 pm", "1-2 pm", "2-3 pm", "3-4 pm", "4-5 pm", "5-6 pm", "6-7 pm", "7-8 pm", "8-9 pm", "9-10 pm", "10-11 pm", "11-12 pm"]}
            checkTitle={this.state.time}
            timeChanged={this.timeChanged}
          />
          <AgeCheck
            title="Age"
            items={["All", "to 18", "19-25", "26-35", "36-50", "51-60", "more 61"]}
            checkTitle={this.state.age}
            ageChanged={this.ageChanged}
          />
          <div className="input_fields limits">
            <div className="block">
              <TextFieldGroup
                value={this.state.page_limit}
                label="The limit of page views per day"
                placeholder=""
                type="text"
                field={this.state.page_limit}
                limits="true"
                onChangeHandler={this.onChangeHandler}
                className="form_group__input"
              />
              <TextFieldGroup
                value={this.state.views_limit}
                label="Limit of views for each user"
                placeholder=""
                type="text"
                limits="true"
                field={this.state.views_limit}
                onChangeHandler={this.onChangeHandler}
                className="form_group__input"
              />
            </div>
          </div>
          <WebsitesCheck
            title="Websites"
            items={["All", "project1.com", "project2.com", "project3.com", "project4.com", "project5.com", "project6.com"]}
            width={{width:150}}
            checkTitle={this.state.websites}
            websitesChanged={this.websitesChanged}
          />
          <div className="form_group create_ad">
            <button className="form_group__button">Create</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CampaignConstructor;
