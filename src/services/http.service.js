import { handleResponseError } from './utils';

export function fetchGet(url, payload) {
  var params = '';
  for(var i in payload){
    var key = i;
    var val = payload[i];
    params += `&${key}=${val}`;
  }
  return fetch(`${url}?${params}`)
    .then((response) => response.json())
    .then(handleResponseError);
}
