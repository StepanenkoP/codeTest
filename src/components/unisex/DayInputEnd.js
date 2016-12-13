import React from 'react';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import close from '../../img/main/close.png'

import 'react-day-picker/lib/style.css';

export default class Range extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }
  state = {
    isOpen: false,
    from: null,
    to: null,
  };
  componentWillReceiveProps() {
    const data = new Date(this.props.startState)
    const newDate = moment(data).format("YYYY-MM-DD")
    // console.log(this.props.startState);
    // console.log(newDate);
    // console.log(newDate == this.props.startState);
    if (newDate == this.props.startState) {
      // this.setState({
      //   from: newDate
      // })
    }
  }
  handleDayClick(e, day) {
    console.log(day);
    const range = DateUtils.addDayToRange(day, this.state);
    console.log(range.from);
    this.setState(range);
    if (range.from && range.to) {
      this.props.getDateData({
        from: moment(range.from).format("YYYY-MM-DD"),
        to: moment(range.to).format("YYYY-MM-DD"),
      })
      this.closeDaypicker()
    }
    if (range.from) {
      this.props.getDateData({
        startError: '',
        from: moment(range.from).format("YYYY-MM-DD"),
        to: moment(range.to).format("YYYY-MM-DD"),
      })
    }
    if (range.to) {
      this.props.getDateData({
        endError: '',
        from: moment(range.from).format("YYYY-MM-DD"),
        to: moment(range.to).format("YYYY-MM-DD"),
      })
    }
  }

  handleResetClick(e) {
    e.preventDefault();
    this.setState({
      from: null,
      to: null,
    });
  }
  openDaypicker = () => {
    this.setState({
      isOpen: true
    })
  }
  closeDaypicker = () => {
    this.setState({
      isOpen: false
    })
  }
  render() {
    const { from, to } = this.state;
    return (
        <div>
          <div className="data_field">
            <label className="form_group__label">Start Date</label>
            <input
              type="text"
              value={this.state.from !== null ? moment(from).format("YYYY-MM-DD") : '' }
              placeholder="YYYY-MM-DD"
              onFocus={ this.openDaypicker }
              className="form_group__input"
            />
            {this.props.errors.start_date && <span className="validate_span">{this.props.errors.start_date}</span>}
          </div>
          <div className="data_field" style={{float: 'right'}}>
            <label className="form_group__label">End Date</label>
            <input
              type="text"
              value={this.state.to !== null ? moment(to).format("YYYY-MM-DD") : '' }
              placeholder="YYYY-MM-DD"
              onChange={ this.handleInputChange }
              onFocus={ this.openDaypicker }
              className="form_group__input"
            />
            {this.props.errors.end_date && <span className="validate_span">{this.props.errors.end_date}</span>}
          </div>
          <div style={this.state.isOpen ? {} : {display: 'none'}}>
            <div className="close_picker" onClick={this.closeDaypicker}><img src={close} alt="alt"/></div>
            <DayPicker
              numberOfMonths={ 2 }
              selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
              onDayClick={ this.handleDayClick }
            />
          </div>
        </div>
    );
  }

}
