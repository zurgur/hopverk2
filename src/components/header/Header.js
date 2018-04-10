import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Button from '../button';

import { loginUser, logoutUser } from '../../actions/auth';

import './Header.css';

class Header extends Component {

  handleLogout = (e) => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  onClick = (e) => {
    console.log('leita');
  }

  render() {
    const { name } = this.props;
    if (this.props.auth.isAuthenticated) {
      return (
        <header className="header">
          <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>
  
          {/* ætti samt frekar heima í sér component */}
          <Button onClick={this.onClick}>Leita</Button>
          <Link to="/profile">{ name }</Link>
          <Button onClick={this.handleLogout}>Logout</Button>
        </header>
      );
    }
    return (
      <header className="header">
        <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>

        {/* ætti samt frekar heima í sér component */}
        <Button onClick={this.onClick}>Leita</Button>

        <Link to="/login">Innskráning</Link>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    name: state.auth.user ? state.auth.user.name : '',
  }
}

export default connect(mapStateToProps)(Header);