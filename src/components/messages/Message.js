import React, { Component } from 'react';
import FlashList from '../flash/FlashList'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'
import MessageForm from './MessageForm'
import {connect} from 'react-redux'
import {loadMessageById} from '../../AC/messagesAC'
import ring from '../../img/main/ring.svg'
import isEmpty from 'lodash/isEmpty'


class Message extends Component {
  state = {
    isOpen: false
  }

  componentDidMount= () => {
    document.title = "Messages - Micro Advertising Portal";
    this.props.loadMessageById(this.props.params.id)
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
    const mobileMenu = this.state.isOpen ? <MobileMenu closeMenu={this.closeMenu}/> : null
    return (
      <div className="main_wrapper">
        {mobileMenu}
        <FlashList />
        <Header
          title="Messages"
          text="Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per."
          openMenu={this.openMenu}
          logOut={this.logOut}
        />
        {this.props.messageById !== null && !isEmpty(this.props.messageById) ? <MessageForm id={this.props.params.id} messages={this.props.messageById !== null ? this.props.messageById : []}/> : <div style={{textAlign: 'center'}}><img src={ring} alt="alt" style={{paddingBottom: '50px', paddingTop: '50px'}}/></div>}
        <Footer />
      </div>
    );
  }
}

Message.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps({accountData}) {
  return {
    messageById: accountData.messageById
  }
}

export default connect(mapStateToProps, {loadMessageById})(Message);
