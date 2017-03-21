import 'whatwg-fetch';
import {showMethodList} from './list';
import {renderJSON, renderXML, renderText} from './render';
import {getRequestHeaders, getResponseHeader, mergeHeaders} from './headers';
import {getSettings} from './settings';

export const createRequest = (route, method) => {
  const startTime = (new Date()).getTime();
  const methodContainerID = route + '/' + method;
  const resPanelID = methodContainerID + '-response';
  const resPanel = document.getElementById(resPanelID);
  const inputs = document.getElementById(methodContainerID).getElementsByTagName('input');
  const headers = new Headers(mergeHeaders(JSON.parse(getSettings()), getRequestHeaders(inputs)));
  const queryString = document.getElementById(methodContainerID + '-query-string').value;
  const prefix = queryString ? '?' : '';
  const url = getUrl(route, inputs) + prefix + queryString;
  const request = {
    method, headers, url
  };


  const warnings = document.getElementsByClassName(methodContainerID + '-warningText');
  if (warnings.length > 0) {
    for (let i = 0; i < warnings.length; i++) warnings[i].style.display = 'none';
  }

  const bodyMethods = ['put', 'post'];

  if (bodyMethods.includes(method)) {
    let bodyContent = document.getElementById(methodContainerID + '-body').value;
    if (!bodyContent) {
      bodyContent = {};
    }
    else {
      bodyContent = JSON.parse(bodyContent);
    }

    request.body = JSON.stringify(bodyContent);
  }

  window.fetch(url, request)
    .then(res => res)
    .then(res => {
      const resTime = (new Date()).getTime() - startTime;
      clearPanel(resPanel);
      populateResponsePanel(res, resPanelID, resTime, route);
      if (resPanel.style.display = 'none') {
        showMethodList(resPanelID, 'response');
      }
    })
    .catch(res => {
      clearPanel(resPanel);
      const container = document.getElementById(methodContainerID);
      const warning = document.createElement('p');
      warning.style.color = 'red';
      warning.className = methodContainerID + '-warningText';
      warning.innerHTML = 'CONNECTION REFUSED!';
      container.insertBefore(warning, container.childNodes[container.childNodes.length - 4]);
    });

};

export const getUrl = (route, inputs) => {
  const segments = route.split('/');
  let url = '';
  let params = [];
  let j = 0;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (inputs[i].getAttribute('target') == "Params") {
      if (input.value) params.push(input.value);
      else return new Error('undefined params')
    }
  }

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    if (segment[0] == ':') {
      url += '/' + params[j];
      j++;
    }
    else {
      url += '/' + segment;
    }

  }

  return url.slice(1);
};

export const populateResponsePanel = (res, panelID) => {
  const urlEl = document.getElementById(`${panelID}-url`);
  const statusEl = document.getElementById(`${panelID}-status`);
  const headerEl = document.getElementById(`${panelID}-header`);
  const bodyEl = document.getElementById(`${panelID}-body`);

  urlEl.innerHTML = res.url;
  statusEl.innerHTML = res.status;
  renderJSON(prettyPrint(JSON.stringify(getResponseHeader(res.headers))), headerEl);
  res.text().then(text => createBodyView(text, res.headers.get('Content-Type'), bodyEl));

};

export const createBodyView = (text, contentType, container) => {
  switch (contentType) {
    case 'application/json; charset=utf-8':
      renderJSON(prettyPrint(text), container, '200s');
      break;
    case 'text/xml; charset=utf-8':
      renderXML(text, container);
      break;
    default:
      renderText(text, container, '95')
  }
};

export const clearPanel = (panel) => {
  const divs = panel.getElementsByClassName('clearable');
  for (let i = 0; i < divs.length; i++) {
    divs[i].style.display = 'none';
  }
};

export const prettyPrint = (text) => JSON.stringify(JSON.parse(text), undefined, 1);





