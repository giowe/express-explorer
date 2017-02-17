import 'whatwg-fetch';
import {showMethodList} from './list';
import {renderJSON, renderXML, renderText} from './render';
import {getRequestHeaders, getResponseHeader} from './headers';

export const createRequest = (route, method) => {
  const startTime = (new Date()).getTime();
  const methodContainerID = route + '/' + method;
  const resPanelID = methodContainerID + '-response';
  const resPanel = document.getElementById(resPanelID);
  const inputs = document.getElementById(methodContainerID).getElementsByTagName('input');
  const headers = getRequestHeaders(inputs);
  const url = getUrl(route, inputs);
  const request = {
    method: method,
    headers: headers,
    url: url
  };

  if (method == 'put' || method == 'post') {
    const body = document.getElementById(methodContainerID + '-body').value;
    request.body = JSON.parse(body);
  }

  if (!resPanel.classList.contains('slide-down-response')) {
    //console.log(request);
    window.fetch(url, request)
      .then(res => res)
      .then(res => {
        //console.log(res);
        const resTime = (new Date()).getTime() - startTime;
        showMethodList(resPanelID, 'response');
        populateResponsePanel(res, resPanelID, resTime, request.url);
      })
      .catch(res => {
        const container = document.getElementById(methodContainerID);
        const warning = document.createElement('p');
        warning.style.color = 'red';
        warning.innerHTML = 'CONNECTION REFUSED!';
        container.insertBefore(warning, container.childNodes[container.childNodes.length - 4]);
      });
  }
  else {
    showMethodList(resPanelID, 'response');
  }
};

export const getUrl = (route, inputs) => {

  const segments = route.split('/');
  let url = '/' + segments[1];
  let params = [];
  let j = 0;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (inputs[i].getAttribute('target') == "Params") {
      params.push(input.value);
    }
  }

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    if (segment[0] == ':') {
      url += '/' + params[j];
      j++;
    }

  }

  return url;
};

export const populateResponsePanel = (res, panelID, time, url) => {

  const infoEl = document.getElementById(`${panelID}-info`);
  const headerEl = document.getElementById(`${panelID}-header`);
  const bodyEl = document.getElementById(`${panelID}-body`);
  const infoObj = {
    url,
    status: res.status,
    time: `${time} ms`
  };

  renderJSON(infoObj, infoEl);
  renderJSON(getResponseHeader(res.headers), headerEl);
  res.text().then(text => createBodyView(text, res.headers.get('Content-Type'), bodyEl));

};

export const createBodyView = (text, contentType, container) => {
  switch (contentType) {
    case 'application/json; charset=utf-8':
      renderJSON(JSON.parse(text), container);
      break;
    case 'text/xml; charset=utf-8':
      renderXML(text, container);
      break;
    default:
      renderText(text, container, '95')
  }
};




