const createRequest = (route, method) => {
  const startTime = (new Date()).getTime();
  const methodContainerID = route + '/' + method;
  const resPanelID = methodContainerID + '-response';
  const resPanel = document.getElementById(resPanelID);
  const inputs = document.getElementById(methodContainerID).getElementsByTagName('input');
  const headers = getHeaders(inputs);
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
    console.log(request);
    window.fetch(url, request)
      .then(res => res)
      .then(res => {
        console.log(res);
        const resTime = (new Date()).getTime() - startTime;
        showMethodList(resPanelID, 'response');
        populateResponsePanel(res, resPanelID, resTime, request.url);
      })
      .catch(res => {
        const resTime = (new Date()).getTime() - startTime;
        showMethodList(resPanelID, 'response');
        populateResponsePanel(res, resPanelID, resTime, request.url);
      });
  }
  else {
    showMethodList(resPanelID, 'response');
  }
};

const getHeaders = (inputs) => {
  const headers = {};
  const headerKeys = [];
  const headerValues = [];

  for (let i = 0; i < inputs.length - 2; i++) {
    const input = inputs[i];

    if (input.getAttribute('target') == 'Headers') {
      if (input.getAttribute('placeholder') == 'key') {
        headerKeys.push(input.value);
      }
      else {
        headerValues.push(input.value);
      }
    }
  }

  for (let i = 0; i < headerKeys.length; i++) {
    headers[headerKeys[i]] = headerValues[i];
  }

  return headers;
};

const getUrl = (route, inputs) => {

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

const populateResponsePanel = (res, panelID, time, url) => {
  const panel = document.getElementById(panelID);
  const info = panel.getElementsByTagName('li');
  const data = panel.getElementsByTagName('textarea');

  info[0].innerHTML = 'URL:' + url;
  info[1].innerHTML = 'Status:' + res.status;
  info[2].innerHTML = 'Time:' + time + ' ms';


  data[0].value = prettifyJson(res.headers);
  res.text().then(text => data[1].value = text);
};

const prettifyJson = (ugly) => JSON.stringify(ugly, undefined, 2);

