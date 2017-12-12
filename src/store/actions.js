import React from 'react';
import * as actionTypes from './actionTypes';
import axios from '../axios-stories';

export const setStories = (stories) => {
    return {
        type: actionTypes.SET_STORIES,
        stories: stories
    };
};

export const initStories = () => {
    return dispatch => {
        axios.get('/stories.json')
            .then( response => {
               dispatch(setStories(response.data));
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

export const initStory = (storyId) => {
  return dispatch => {
    axios.get('/stories/' + storyId + '.json')
      .then(response => {
        dispatch(setStory(response.data, storyId));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
