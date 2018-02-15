import * as actionTypes from './actionTypes';
import axios from '../../axios-stories';

export const setTeam = (team) => {
  return {
    type: actionTypes.SET_TEAM,
    team: team
  };
};


export const initStories = () => {
    return dispatch => {
        axios.get('/stories.json')
            .then( response => {
               dispatch(setTeam(response.data));
            } )
            .catch( error => {
                console.log(error);
            } );
    };
};
