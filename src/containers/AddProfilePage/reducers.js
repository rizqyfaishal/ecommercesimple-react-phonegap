import { fromJS } from 'immutable';

const addProfilePageInitialState = fromJS({

});


function addProfilePageReducer(state=addProfilePageInitialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}

export default addProfilePageReducer;