import {FETCH_CAMS, PLAY_CAM, START_FETCH_CAMS,FETCH_CAMS_ERROR} from './types';
import {API, CDN} from '../config';


const camFetchMapper = function(entry){
  return {
    name: entry.name,
    sourceIp: entry.sourceIp,
    isConnected: entry.isConnected,
    url: `${CDN.https ? 'https' : 'http'}://${CDN.domain}${CDN.path}/${entry.name}/playlist.m3u8?DVR`,
    paused: true
  };
}


export const fetchCAMS = () =>  dispatch => {
    dispatch({type: START_FETCH_CAMS});
    let endpoint = `http://${API.domain}:${API.port}/cams`;
    fetch(endpoint)
    .then( res => res.json() )
    .then( data => {

      if( data.serverName )
        return dispatch({
          type: FETCH_CAMS,
          payload: data.instanceList[0].incomingStreams.map( camFetchMapper )
        });
      dispatch({type: FETCH_CAMS_ERROR, payload: `Server response ERROR: ${data.message}`});
    })
    .catch( err => {
      dispatch({type: FETCH_CAMS_ERROR, payload: err.message});
    });
};
