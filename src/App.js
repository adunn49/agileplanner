import React, { Component } from 'react';
import classes from './App.css';
import PlanningBoard from './containers/PlanningBoard/PlanningBoard';
import TopMenu from './components/UI/Navigation/TopMenu/TopMenu';
import { BrowserRouter, Route } from 'react-router-dom';
import StoryListView from './containers/StoryListView/StoryListView';
import EditStoryView from './containers/EditStoryView/EditStoryView';
import Team from './components/Team/Team';
import Tasks from './components/UserStory/Tasks/Tasks';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={[classes.App, 'container-fluid'].join(' ')}>
          <TopMenu />
          <Route exact path="/team" component={Team} />
          <Route exact path="/planning" component={PlanningBoard} />
          <Route exact path="/storylist" component={StoryListView} />
          <Route exact path="/story/:id/tasks" component={Tasks} />
          <Route exact path="/addstory" component={EditStoryView} />
          <Route exact path="/editstory/:id" component={EditStoryView} />
          <Route exact path="/" component={StoryListView} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
