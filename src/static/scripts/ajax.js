var createRequest = function (route, method) {
  var startTime = (new Date()).getTime();
  var methodContainerID = route + '/' + method;
  var resPanelID = methodContainerID + '-response';
  var resPanel = document.getElementById(resPanelID);
  var inputs = document.getElementById(methodContainerID).getElementsByTagName('input');
  var headers = getHeaders(inputs);
  var url = getUrl(route, inputs);
  var request = {
    method: method,
    headers: headers,
    url: url
  };

  if ( ['put', 'post'].indexOf(method) !== -1 ) {
    var body = document.getElementById(methodContainerID + '-body').value;
    request.data = JSON.parse(body);
  }

  if (!resPanel.classList.contains('slide-down-response')) {
    axios(request)
      .then(function (res) {
        var resTime = (new Date()).getTime() - startTime;
        showMethodList(resPanelID, 'response');
        populateResponsePanel(res, resPanelID, resTime, request.url);
      })
      .catch(function (res) {
        var resTime = (new Date()).getTime() - startTime;
        showMethodList(resPanelID, 'response');
        populateResponsePanel(res, resPanelID, resTime, request.url);
      });
  }
  else {
    showMethodList(resPanelID, 'response');
  }
};

var getHeaders = function (inputs) {
  var headers = {};
  var headerKeys = [];
  var headerValues = [];

  var l = inputs.length - 2;
  for (var i = 0; i < l; i++) {
    var input = inputs[i];

    if (input.getAttribute('target') == 'Headers') {
      if (input.getAttribute('placeholder') == 'key') {
        headerKeys.push(input.value);
      }
      else {
        headerValues.push(input.value);
      }
    }
  }

  l = headerKeys.length;
  for (i = 0; i < l; i++) {
    headers[headerKeys[i]] = headerValues[i];
  }

  return headers;
};

var getUrl = function (route, inputs) {

  var segments = route.split('/');
  var url = '/' + segments[1];
  var params = [];
  var j = 0;

  var l = inputs.length;
  for ( var i = 0; i < l; i++) {
    var input = inputs[i];
    if (input.getAttribute('target') == "Params") {
      params.push(input.value);
    }
  }

  l = segments.length;
  for ( i = 0; i < l; i++) {
    var segment = segments[i];

    if (segment[0] == ':') {
      url += '/' + params[j];
      j++;
    }
  }

  return url;
};

var populateResponsePanel = function (res, panelID, time, url) {
  var panel = document.getElementById(panelID);
  var info = panel.getElementsByTagName('li');
  var data = panel.getElementsByTagName('textarea');

  info[0].innerHTML = 'URL:' + url;
  info[1].innerHTML = 'Status:' + res.status;
  info[2].innerHTML = 'Time:' + time + ' ms';


  data[0].value = prettifyJson(res.headers);
  data[1].value = prettifyJson(res.data);
};

var prettifyJson = function (ugly) {
  return JSON.stringify(ugly, undefined, 2);
};

