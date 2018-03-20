import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import classes from './App.css';
import PlanningBoard from './containers/PlanningBoard/PlanningBoard';
import TopMenu from './components/UI/Navigation/TopMenu/TopMenu';
import StoryListView from './containers/StoryListView/StoryListView';
import EditStoryView from './containers/EditStoryView/EditStoryView';
import Team from './components/Team/Team';
import Tasks from './components/UserStory/Tasks/Tasks';
import Authentication from './containers/Authentication/Authentication';
import Logout from './containers/Authentication/Logout/Logout';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={[classes.App, 'container-fluid'].join(' ')}>
          {this.props.isAuthenticated ? (<TopMenu/>) : null}
          <Route exact path="/team" component={Team} />
          <Route exact path="/planning" component={PlanningBoard} />
          <Route exact path="/storylist" component={StoryListView} />
          <Route exact path="/story/:id/tasks" component={Tasks} />
          <Route exact path="/addstory" component={EditStoryView} />
          <Route exact path="/editstory/:id" component={EditStoryView} />
          <Route exact path="/login" component={Authentication} />
          <Route exact path="/logout" component={Logout} />

          <Route exact path="/" component={Authentication} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.token !== null
  };
};

export default connect(mapStateToProps, null)(App);
