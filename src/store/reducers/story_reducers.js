import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../common/utilties';

const initialState = {
  stories: []
};

const setStories = (state, action) => {
    return updateObject( state, {
        stories: action.stories
    });
};

const setStory = (state, action) => {
  console.log('SET STORY');
  return updateObject(state, { story: action.story });
}

const deleteStory = (state, action) => {
  let stories = [...state.stories].filter(story => story._id !== action.storyId);
  let updated = updateObject(state, {stories: stories});
  return updated;
}

const saveSuccess = (state, action) => {
  console.log(state);
  state.history.goBack();
};


const reducers = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_STORIES: return setStories(state, action);
        case actionTypes.SET_STORY: return setStory(state, action);
        case actionTypes.DELETE_STORY: return deleteStory(state, action);
        case actionTypes.SAVE_SUCCESS: return saveSuccess(state, action);
        default: return state;
    }
};

export default reducers;
