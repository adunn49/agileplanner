import React, { Component } from 'react';
import classes from './App.css';
import PlanningBoard from './containers/PlanningBoard/PlanningBoard';
import TopMenu from './components/UI/Navigation/TopMenu/TopMenu';
import { BrowserRouter, Route } from 'react-router-dom';
import StoryList from './containers/StoryList/StoryList';
import EditStory from './components/EditStory/EditStory';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={classes.App}>
          <TopMenu />
          <Route exact path="/planning" component={PlanningBoard} />
          <Route exact path="/storylist" component={StoryList} />
          <Route exact path="/addstory" component={EditStory} />
          <Route exact path="/editstory/:id" component={EditStory} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
