import React, { Component } from 'react';
import FlashList from '../flash/FlashList'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'
import MessagesForm from './MessagesForm'



class MessagesPage extends Component {
  state = {
    isOpen: false
  }

  componentDidMount= () => {
    document.title = "Messages - Micro Advertising Portal";
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
        title="Messages"
        text="Service which allows you to create advertisements. You can easily manage the process and to increase their sales."
        openMenu={this.openMenu}
        logOut={this.logOut}
      />
      <MessagesForm />
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

MessagesPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default MessagesPage;
