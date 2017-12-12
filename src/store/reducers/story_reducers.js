import * as actionTypes from '../actionTypes';
import {updateObject} from '../../common/utilties';

const initialState = {
  stories: []
};

const setStories = (state, action) => {
    let stories = [];
    for (let key in action.stories) {
      let story = action.stories[key];
      story['id'] = key;
      stories.push(story);
    }
    return updateObject( state, {
        stories: stories
    });
};

const setStory = (state, action) => {
  let story = action.story;
  story['id'] = action.storyId;
  return updateObject(state, { story: action.story });
}


const reducers = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_STORIES: return setStories(state, action);
        case actionTypes.SET_STORY: return setStory(state, action);
        default: return state;
    }
};

export default reducers;
