const getLastParam = (container) => {
  const params = container.getElementsByClassName('param');
  const length = params.length;
  return params[length - 1];
};

const getParamCount = (container) => container.getElementsByClassName('param').length;

const addParam = (context, elementID, containerID) => {
  const container = document.getElementById(containerID);
  const childCount = container.childNodes.length;
  const selector = (childCount == 5) ? 2 : 1;
  const elem = container.childNodes[childCount - selector];
  const currentIndex = parseInt(elem.getAttribute('index'));

  if (getLastParam(container) == context.parentNode && ((getParamCount(container) < 10))) {

    const clone = elem.cloneNode(true);
    const newIndex = (currentIndex + 1).toString();

    clone.setAttribute('index', newIndex);
    setNewParamIds(clone.childNodes[1], newIndex);
    setNewParamIds(clone.childNodes[3], newIndex);
    clone.childNodes[5].style.visibility = "visible";

    container.appendChild(clone);
  }

};

const deleteParam = (context) => {
  const parent = context.parentNode;
  if (parseInt(parent.getAttribute('index')) > 0) parent.remove();
};

const setNewParamIds = (elem, newIndex) => {
  let oldID = elem.getAttribute('id');

  elem.value = '';

  while (!isNaN(parseInt(oldID[oldID.length - 1]))) {
    oldID = oldID.slice(0, -1);
  }

  const newID = oldID + newIndex;
  elem.setAttribute('id', newID);
};
