import React, { Component } from 'react'
import DayInputEnd from '../unisex/DayInputEnd'
var LineChart = require("react-chartjs").Line

class AdStatsContainer extends Component {
  state = {
    start_date: '',
    end_date: '',
    errors: {}
  }

  getDateData = (data) => {
    this.setState({
      start_date: data.from,
      end_date: data.to,
    })
  }

  render () {
    const data = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            data: [12, 19, 3, 5, 2, 3],
            fillColor: "rgba(151,187,205,0.2)",
            pointColor: "rgba(151,187,205,1)",
            strokeColor: "rgba(151,187,205,1)",
            pointHightlightStroke: "rgba(151,187,205,1)",
            pointHightlightFill: "#fff",
            pointStrokeColor: "rgba(151,187,205,1)",
            pointColor: "#fff"
        }]
    }
    return(
      <div className="stats_container">
        <h2 className="stats_container__header">Views last month</h2>
        <div className="stats_container__date">
          <DayInputEnd
            errors={this.state.errors}
            getDateData={this.getDateData}
            startState={this.state.start_date}
            startTitle='From'
            endTitle='To'
          />
        </div>
        <LineChart data={data} width="1170" height="310"/>
        <div className="stats_container__table">
          <div className="wrapper">
            <h2 className="stats_container__header">Views last month</h2>
            <div className="table_row title">
              <div className="name">Name of Advert</div>
              <div className="id">ID Advert</div>
              <div className="date">Date</div>
              <div className="views">Views</div>
              <div className="clicks">Clicks</div>
              <div className="ctr">CTR(%)</div>
            </div>
            <div className="table_data">
              <div className="table_row">
                <div className="name">Lego City</div>
                <div className="id">SC302948736</div>
                <div className="date">11/3/2016</div>
                <div className="views">14680</div>
                <div className="clicks">246</div>
                <div className="ctr">1.7%</div>
              </div>
              <div className="table_row">
                <div className="name">Lego City</div>
                <div className="id">SC302948736</div>
                <div className="date">11/3/2016</div>
                <div className="views">14680</div>
                <div className="clicks">246</div>
                <div className="ctr">1.7%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AdStatsContainer;
