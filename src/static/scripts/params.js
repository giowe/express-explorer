import {updateSettings, getSettings} from './settings';

export const getLastParam = (container) => {
  const params = container.getElementsByClassName('param');
  const length = params.length;
  return params[length - 1];
};

export const getParamCount = (container) => container.getElementsByClassName('param').length;

export const addParam = (context, elementID, containerID, limit = true) => {
  const container = document.getElementById(containerID);
  const childCount = container.childNodes.length;
  const selector = (childCount == 5) ? 2 : 1;
  const elem = container.childNodes[childCount - selector];
  const currentIndex = parseInt(elem.getAttribute('index'));

  if ((getParamCount(container) < 5)) {
    if (!limit || getLastParam(container) == context.parentNode) {
      const clone = elem.cloneNode(true);
      const newIndex = (currentIndex + 1).toString();

      clone.setAttribute('index', newIndex);
      setNewParamIds(clone.childNodes[1], newIndex);
      setNewParamIds(clone.childNodes[3], newIndex);
      clone.childNodes[5].style.visibility = "visible";

      container.appendChild(clone);
    }
  }

};

export const deleteParam = (context) => {
  const parent = context.parentNode;
  const settings = JSON.parse(getSettings());
  delete settings[parent.getElementsByTagName('input')[0].value];
  window.localStorage.setItem('default-settings', JSON.stringify(settings));
  if (parseInt(parent.getAttribute('index')) > 0) parent.remove();
};

export const setNewParamIds = (elem, newIndex) => {
  let oldID = elem.getAttribute('id');

  elem.value = '';

  while (!isNaN(parseInt(oldID[oldID.length - 1]))) {
    oldID = oldID.slice(0, -1);
  }

  const newID = oldID + newIndex;
  elem.setAttribute('id', newID);
};

export const fillParamsFromObject = (params, data) => {

  data = JSON.parse(data);
  const keys = Object.keys(data);

  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    if (param.getAttribute('placeholder') == 'key') {
      param.value = keys[parseInt(i / 2)];
    }
    else {
      param.value = data[keys[parseInt(i / 2)]];
    }
  }

};
