import { Platform } from 'react-native';

const API = {
  domain: 'streaming.alaan.tv',
  port: '8080',
  pullInterval: 3000,
};

const CDN = {
  domain: 'live.cdn.alaan.tv',
  https: false,
  path: '/livecf',
};

const StreamingEngine = {
  hostAddress:'streaming.alaan.tv',
  applicationName:'livecf',
  username:'',
  password:'',
  streamName:'iOS-' + Math.round(Math.random()*1000) ,
  sdkLicenseKey: Platform.OS === 'ios' ? 'GOSK-6745-010F-DCB5-A9A9-BBE7' : 'GOSK-6745-010F-AEDC-AC33-DD7D'
};

export {
  API,CDN,StreamingEngine
};
