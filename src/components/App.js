import React, { Component } from 'react';
import FlashList from './flash/FlashList'
import Footer from './unisex/Footer'
import Header from './unisex/Header'
import MobileMenu from './unisex/MobileMenu'
var LineChart = require("react-chartjs").Line
import ring from '../img/main/ring.svg'
import {connect} from 'react-redux'
import {loadAllStats} from '../AC/accountAC'
import isEmpty from 'lodash/isEmpty'



class App extends Component {
  state = {
    isOpen: false
  }

  componentDidMount= () => {
    document.title = "Account Summary - Micro Advertising Portal";
    this.props.loadAllStats()
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
    console.log(this.props);
    const {adv_completed, adv_launched, balance, total_spend, total_views, unread_message} = this.props.accountStats
    const mobileMenu = this.state.isOpen ? <MobileMenu closeMenu={this.closeMenu} /> : null
    const data = {
        labels: [0,1],
        datasets: [{
            data: [0,1],
            fillColor: "rgba(151,187,205,0.2)",
            pointColor: "rgba(151,187,205,1)",
            strokeColor: "rgba(151,187,205,1)",
            pointHightlightStroke: "rgba(151,187,205,1)",
            pointHightlightFill: "#fff",
            pointStrokeColor: "rgba(151,187,205,1)",
            pointColor: "#fff"
        }]
    }
    const totalStats = !isEmpty(this.props.accountStats) ?
    <div className="data">
      <ul className="data_ul">
        <li>
          <span className="data_ul__number">{unread_message}</span>
          <p>Unread message</p>
        </li>
        <li>
          <span className="data_ul__number">{adv_launched}</span>
          <p>Total Adverts launched</p>
        </li>
        <li>
          <span className="data_ul__number">{adv_completed}</span>
          <p>Total Adverts completed</p>
        </li>
        <li>
          <span className="data_ul__number">{total_views}</span>
          <p>Total views</p>
        </li>
        <li>
          <span className="data_ul__number">{total_spend}</span>
          <p>Total spend</p>
        </li>
        <li>
          <span className="data_ul__number">{balance}</span>
          <p>You balance</p>
        </li>
      </ul>
      <h2>Views last month</h2>
      <div className="data_chart">
        <LineChart data={data} width="1170" height="310"/>
      </div>
    </div> : <div style={{textAlign: 'center'}}><img src={ring} alt="alt" style={{paddingBottom: '150px', paddingTop: '150px'}}/></div>


    return (
      <div className="main_wrapper">
        {mobileMenu}
        <FlashList />
        <Header
          title="ACCOUNT SUMMARY"
          text="Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per."
          openMenu={this.openMenu}
          logOut={this.logOut}
        />
        {totalStats}
        <Footer />
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps({accountData}) {
  return {
    accountStats: accountData.accountStats
  }
}

export default connect(mapStateToProps, {loadAllStats})(App);
