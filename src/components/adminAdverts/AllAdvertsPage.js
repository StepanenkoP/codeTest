import React, { Component } from 'react';
import FlashList from '../flash/FlashList'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'
import AllAdvertsForm from './AllAdvertsForm'


class AllAdvertsPage extends Component {
  state = {
    isOpen: false
  }

  componentDidMount= () => {
    document.title = "All Adverts - Micro Advertising Portal";
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
    const messagesType = this.props.params.id === undefined
    ?
    <div className="main_wrapper">
      {mobileMenu}
      <FlashList />
      <Header
        title="Adverts"
        text="Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per."
        openMenu={this.openMenu}
        logOut={this.logOut}
      />
      <AllAdvertsForm />
      <Footer />
    </div>
    : <div>{this.props.children}</div>
    return (
      <div>
        {messagesType}
      </div>
    );
  }
}

AllAdvertsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default AllAdvertsPage;
