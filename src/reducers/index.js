import {combineReducers} from 'redux';
import camReducer from './camReducer'

export default combineReducers({
  cams: camReducer
});
