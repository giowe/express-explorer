import 'whatwg-fetch';
import {showMethodList} from './list';
import {renderJSON, renderXML, renderText} from './render';
import {getRequestHeaders, getResponseHeader, mergeHeaders} from './headers';
import {panelHeight, animationTime} from './constants';
import {getSettings} from './settings';

export const createRequest = (route, method) => {
  const startTime = (new Date()).getTime();
  const methodContainerID = route + '/' + method;
  const resPanelID = methodContainerID + '-response';
  const resPanel = document.getElementById(resPanelID);
  const inputs = document.getElementById(methodContainerID).getElementsByTagName('input');
  const headers = new Headers(mergeHeaders(JSON.parse(getSettings()), getRequestHeaders(inputs)));
  const url = getUrl(route, inputs);
  const request = {
    method, headers, url
  };
  const bodyMethods = ['put', 'post'];

  if (method in bodyMethods) {
    let bodyContent = document.getElementById(methodContainerID + '-body').value;

    if (!bodyContent) {
      bodyContent = {};
    }
    else {
      bodyContent = JSON.parse(bodyContent);
    }

    request.body = JSON.stringify(bodyContent);
    console.log(request);
  }

  if (resPanel.style.display == 'none' || resPanel.style.display == '') {
    window.fetch(url, request)
      .then(res => res)
      .then(res => {
        const resTime = (new Date()).getTime() - startTime;
        showMethodList(resPanelID, 'response');
        populateResponsePanel(res, resPanelID, resTime, route);
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
    clearPanel(resPanel);
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
    console.log('ciao');
    divs[i].style.display = 'none';
  }
};

export const prettyPrint = (text) => JSON.stringify(JSON.parse(text), undefined, 1);



