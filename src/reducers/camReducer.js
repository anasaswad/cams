import {FETCH_CAMS, PLAY_CAM, START_FETCH_CAMS} from '../actions/types';

const initialState = {
  cams : [],
  isLoading: true,
  fetching: false,
  activeCam : {}
}


export default function (state = initialState, action){
  switch(action.type){
    case FETCH_CAMS:
      return {
        ...state,
        cams: action.payload,
        isLoading: false,
        fetching: false,
      };
    case START_FETCH_CAMS:
      return {
        ...state,
        fetching: true,
      }
    case PLAY_CAM:
      return state;
    default:
      return state;
  }
}
