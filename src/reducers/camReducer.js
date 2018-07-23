import {FETCH_CAMS, PLAY_CAM, START_FETCH_CAMS, FETCH_CAMS_ERROR} from '../actions/types';

const initialState = {
  cams : [],
  isLoading: true,
  fetching: false,
  activeCam : {},
  error: '',
}


export default function (state = initialState, action){
  switch(action.type){
    case FETCH_CAMS:
      return {
        ...state,
        cams: action.payload,
        isLoading: false,
        fetching: false,
        error: ''
      };
    case START_FETCH_CAMS:
      return {
        ...state,
        fetching: true,
      }
    case FETCH_CAMS_ERROR:
      return {
        ...state,
        fetching: false,
        isLoading: false,
        error: action.payload,
      }
    case PLAY_CAM:
      return state;
    default:
      return state;
  }
}
