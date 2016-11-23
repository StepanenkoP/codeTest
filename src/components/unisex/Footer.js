import React, { Component } from 'react';
import {Link} from 'react-router';

class Footer extends Component {
  render() {
    return (
      <div className="main_footer">
        <div className="main_footer__content">
          <span className="copy">Copyright &copy; Micro Advertising Portal. All rights reserved</span>
          <Link className="feedback" to="/feedback">Feedback</Link>
        </div>
      </div>
    )
  }
}

export default Footer;
