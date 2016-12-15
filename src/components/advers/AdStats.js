import React, {Component} from 'react'
import FlashList from '../flash/FlashList'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'
import AdStatsContainer from './AdStatsContainer'



class CreateAd extends Component {
  state = {
    isOpen: false
  }


  componentDidMount= () => {
    document.title = "Statistics - Micro Advertising Portal";
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
          title="Statistics"
          text={`"Lego City" ${this.props.params.id}`}
          openMenu={this.openMenu}
          logOut={this.logOut}
        />
        <AdStatsContainer
          id={this.props.params.id}
        />
        <Footer />
      </div>
    );
  }
}

CreateAd.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default CreateAd
