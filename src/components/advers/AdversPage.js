import React, {Component} from 'react'
import FlashList from '../flash/FlashList'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'
import CreateBlock from '../unisex/CreateBlock'
import AdList from './AdList'


class AdversPage extends Component {
  state = {
    isOpen: false
  }

  componentDidMount= () => {
    document.title = "List of Adverts - Micro Advertising Portal";
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
    const mobileMenu = this.state.isOpen ? <MobileMenu closeMenu={this.closeMenu}/> : null
    return (
      <div className="main_wrapper">
        {mobileMenu}
        <FlashList />
        <Header
          title="List of adverts"
          text="Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per."
          openMenu={this.openMenu}
          logOut={this.logOut}
        />
        <CreateBlock />
        <AdList />
        <Footer />
      </div>
    );
  }
}

AdversPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default AdversPage
