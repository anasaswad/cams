import {Alert} from 'react-native';
import fetchWithDigest from 'react-native-digest-fetch';
import {FETCH_CAMS, PLAY_CAM} from './types';
import {API, CDN} from '../config';
import digestAuthRequest from 'digest-auth-request';


const camFetchMapper = function(entry){
  return {
    name: entry.name,
    sourceIp: entry.sourceIp,
    isConnected: entry.isConnected,
    url: `${CDN.https ? 'https' : 'http'}://${CDN.domain}${CDN.path}/${entry.name}/playlist.m3u8?DVR`
  };
}


export const fetchCAMS = () =>  dispatch => {
    let endpoint = `http://${API.domain}:${API.port}/cams`;
    fetch(endpoint)
    .then( res => res.json() )
    .then( data => {

      if( data.success )
        return dispatch({
          type: FETCH_CAMS,
          payload: data.map( camFetchMapper )
        });

      Alert.alert(data.message);

    })
    .catch( err => {
      Alert.alert(err.message)
    });
};
