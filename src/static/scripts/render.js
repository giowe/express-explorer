import JSONFormatter from 'json-formatter-js';
import XMLViewer from 'xml-viewer';

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

export const renderXML = (xml, panel) => {
  const viewer = new XMLViewer(xml);
  viewer.appendTo(panel);
};

export const renderHTML = (html, panel) => {

};


