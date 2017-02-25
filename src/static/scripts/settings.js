import {getRequestHeaders} from './headers';
import {addParam} from './params';

export const openSettings = (panelID) => {
  const panel = document.getElementById(panelID);
  panel.classList.remove('slide-from-right');
  panel.classList.add('slide-from-left');
};

export const closeSettings = (panelID) => {
  const panel = document.getElementById(panelID);
  panel.classList.remove('slide-from-left');
  panel.classList.add('slide-from-right');
};

export const getSettings = () => window.localStorage.getItem('default-settings');

export const setSettings = () => {
  const inputs = document.getElementById('settingsPanel').getElementsByTagName('input');
  window.localStorage.setItem('default-settings', JSON.stringify(getRequestHeaders(inputs)));
};

export const generateSettingsPanel = () => {
  const settings = getSettings();


};
