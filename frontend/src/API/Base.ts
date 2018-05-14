//#region imports
import { ajax } from 'rxjs/observable/dom/ajax';
import * as qs from 'querystring';
const config = require('config').default;
//#endregion

enum HTTPMethod {
  get   = 'get',
  post  = 'post',
  put   = 'put',
  patch = 'patch',
  del   = 'del'
}

function _request(method: HTTPMethod,
                     uri: string,
                    data: any = null,
                      cb = (_?: Error) => {},
                headers?: any)
{
  let url = `${config.API.URL}${uri}`;

  if (method === HTTPMethod.get && data) {
    url += `?${qs.stringify(data)}`;
  }

  if (!headers) {
    headers = {};
  }

  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  return ajax({
    method,
    url,
    headers,
    body: data,
    timeout: 5000,
    crossDomain: true
  })
}

/**
 * Performs a GET request.
 */
export function get(url: string, query: any = null) {
  return _request(HTTPMethod.get, url, query);
}

/**
 * Performs a POST request
 */
export function post(url: string, data: any = null) {
  return _request(HTTPMethod.post, url, data);
}

/**
 * Performs a PUT request
 */
export function put(url: string, data: any = null) {
  return _request(HTTPMethod.put, url, data);
}

/**
 * Performs a DELETE request.
 */
export function del(url: string, data: any = null) {
  return _request(HTTPMethod.del, url, data);
}
