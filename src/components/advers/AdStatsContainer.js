import React, { Component } from 'react'
import DayInputEnd from '../unisex/DayInputEnd'
var LineChart = require("react-chartjs").Line
import ring from '../../img/main/ring.svg'
import {connect} from 'react-redux'
import {getAdStats} from '../../AC/adsAC'

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


  componentDidUpdate(prevProps, prevState) {
    if (this.state.end_date !== 'Invalid date' && prevState.end_date !== this.state.end_date ) {
      this.props.getAdStats(this.props.idWithData, this.state.start_date, this.state.end_date)
    }
    if (this.state.end_date !== 'Invalid date' && prevState.start_date !== this.state.start_date ) {
      this.props.getAdStats(this.props.idWithData, this.state.start_date, this.state.end_date)
    }
  }

  datesContinue = (arr) => {
    console.log();
    if (arr.length > 30) {
      arr.filter(item => arr.indexOf(item)%Math.ceil((arr.length/(arr.length - 30))) !== 0)
    }
    if (arr.length > 30) {
      this.datesContinue(arr)
    }
    console.log(arr.length);
  }

  render () {
    const statsRow = this.props.stats && this.props.id && this.props.title
    ?
    this.props.stats.map(item => <div key={item.date} className="table_row">
      <div className="name">{this.props.title}</div>
      <div className="id">{this.props.id}</div>
      <div className="date">{item.date}</div>
      <div className="views">{item.views}</div>
      <div className="clicks">{item.clicks}</div>
      <div className="ctr">{item.ctr}</div>
    </div>) : <div style={{textAlign: 'center'}}><img src={ring} alt="alt" style={{paddingBottom: '50px'}}/></div>
    const dates = this.props.stats ? this.props.stats.map(item => item.date) : []
    const views = this.props.stats ? this.props.stats.map(item => item.views) : null
    const data = {
        labels: dates,
        datasets: [{
            label: "My First dataset",
            data: views,
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
        <h2 className="stats_container__header">{this.state.start_date && this.state.end_date !== 'Invalid date' ? <span>{`Views from ${this.state.start_date} to ${this.state.end_date}`}</span> : <span>Views last 30 days</span>}</h2>
        <div className="stats_container__date">
          <DayInputEnd
            errors={this.state.errors}
            getDateData={this.getDateData}
            startState={this.state.start_date}
            startTitle='From'
            endTitle='To'
            disableDays={true}
          />
        </div>
        <div className="stats_wrapper">
          <LineChart data={data} width="1170" height="310" redraw />
        </div>
        <div className="stats_container__table">
          <div className="wrapper">
            <h2 className="stats_container__header">{this.state.start_date && this.state.end_date !== 'Invalid date' ? <span>{`Views from ${this.state.start_date} to ${this.state.end_date}`}</span> : <span>Views last 30 days</span>}</h2>
            <div className="table_row title">
              <div className="name">Name of Advert</div>
              <div className="id">ID Advert</div>
              <div className="date">Date</div>
              <div className="views">Views</div>
              <div className="clicks">Clicks</div>
              <div className="ctr">CTR(%)</div>
            </div>
            <div className="table_data">
              {statsRow}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AdStatsContainer.propTypes = {
  idWithData: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  stats: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired
}

export default connect(null, {getAdStats})(AdStatsContainer);
