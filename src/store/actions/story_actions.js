import * as actionTypes from './actionTypes';
import axios from '../../axios-stories';

export const setStories = (stories) => {
    return {
        type: actionTypes.SET_STORIES,
        stories: stories
    };
};

export const initStories = () => {
    return dispatch => {
        axios.get('/stories')
            .then( response => {
               dispatch(setStories(response.data.stories));
            } )
            .catch( error => {
                console.log(error);
            } );
    };
};

export const setStory = (story, storyId) => {
  return {
    type: actionTypes.SET_STORY,
    story: story,
    storyId: storyId
  }
}


export const deleteStory = (storyId) => {
  return {
    type: actionTypes.DELETE_STORY,
    storyId: storyId
  }
}

export const initDeleteStory = (storyId) => {
  return dispatch => {
    axios.delete('/stories/' + storyId)
      .then(response => {
          dispatch(deleteStory(storyId));
        });
  }
}

export const initStory = (storyId) => {
  return dispatch => {
    axios.get('/stories/' + storyId)
      .then(response => {
        dispatch(setStory(response.data.story, storyId));
      })
      .catch(error => {
        console.log(error);
      });
  }
}
