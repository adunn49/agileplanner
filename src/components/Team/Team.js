import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Auxillary';

import * as actions from '../../store/actions/team_actions';

class Team extends Component {

  state = {
    team: {
        0: {
          name: 'Andrew Dunn',
          job: 'Web Applications Developer',
          _id: 13687162837612
        },
        1: {
          name: 'Bertie Flutterby',
          job: 'Technical Writer',
          _id: 6368512753
        }
    }
  };

  render() {
    let items = [];
    Object.keys(this.state.team).forEach(key => {
      items.push(<tr key={key}>
          <td>{this.state.team[key].name}</td>
          <td>{this.state.team[key].job}</td>
          <td><button className={'btn btn-sm btn-default'}>Delete</button></td>
        </tr>
      );
    });
    return (
      <Aux>
        <h1>Team Members</h1>
        <table className={['table', 'table-striped'].join(' ')}>
          <thead>
            <th>Name</th>
            <th>Job Title</th>
            <th></th>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
        <button className={'btn btn-sm btn-default'}>Add Team Member</button>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
    return {
        team: state.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
          onInitTeam: () => dispatch(actions.initStories()),
    };
};

export default connect (mapStateToProps, mapDispatchToProps)(Team);
