import {FETCH_CAMS, PLAY_CAM} from '../actions/types';

const initialState = {
  cams : [],
  activeCam : {}
}


export default function (state = initialState, action){
  switch(action.type){
    case FETCH_CAMS:
      return {
        ...state,
        cams: action.payload
      };
    case PLAY_CAM:
      return state;
    default:
      return state;
  }
}
