import JSONFormatter from 'json-formatter-js';

export const renderText = (text, panel, height) => {
  const staticViewer = document.createElement('p');
  staticViewer.textContent = `"${text}"`;
  staticViewer.style.minHeight = `${height}px`;
  panel.appendChild(staticViewer);
};

export const renderJSON = (json, panel) => {
  const frm = new JSONFormatter(json);
  panel.appendChild(frm.render());
};

export const renderHTML = (html, panel) => {

};

export const renderXML = (xml,panel) => {

};
