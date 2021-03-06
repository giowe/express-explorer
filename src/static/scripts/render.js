import JSONFormatter from 'json-formatter-js';

export const renderText = (text, panel, height) => {
  const staticViewer = document.createElement('div');
  staticViewer.innerText = text;
  staticViewer.className = 'clearable';
  staticViewer.style.minHeight = `${height}px`;
  panel.appendChild(staticViewer);
};

export const renderJSON = (json, panel) => {
  const frm = new JSONFormatter(json);
  panel.appendChild(frm.render());
  const textContainer = frm.element.getElementsByClassName('json-formatter-string')[0];
  frm.element.classList.add('clearable');
  textContainer.innerHTML = textContainer.innerHTML.slice(1, -1);
};
