import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import * as actions from '../../store/actions/index';

class Authentication extends Component {

  state = {
    controls: {
      email: '',
      password: ''
    }
  }

  handleUserInput = (event, control) => {
    let controls = {...this.state.controls};
    controls[control] = event.target.value;
    this.setState({
      controls: controls
    });
  }

  handleUserLogin = () => {
    this.props.onAuthentication(this.state.controls.email, this.state.controls.password);
  }

  render() {

    let errorMessage = null;
    console.log(this.props);
    if (this.props.error) {
      errorMessage = (<p>{this.props.error.message}</p>);
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = (<Redirect to='/storylist'></Redirect>);
    }
    return (
      <div>
        {errorMessage}
        {authRedirect}
        <FormGroup controlId="email">
          <ControlLabel>User Email</ControlLabel>
          <FormControl onChange={(event) => this.handleUserInput(event, 'email')}
            type="text"
            placeholder="Enter Login Email"
            autoComplete="off"
            value={this.state.controls.email}/>
        </FormGroup>
        <FormGroup controlId="password">
          <ControlLabel>Password</ControlLabel>
          <FormControl onChange={(event) => this.handleUserInput(event, 'password')}
            type="password"
            placeholder="Enter Password"
            autoComplete="off"
            value={this.state.controls.password}/>
        </FormGroup>
        <button className="btn btn-primary" onClick={this.handleUserLogin}>Login
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state, 'STATE');
    return {
        loading: state.authentication.loading,
        error: state.authentication.error,
        userId: state.authentication.userId,
        token: state.authentication.token,
        isAuthenticated: state.authentication.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthentication: ( email, password ) => dispatch( actions.authentication( email, password ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Authentication );
