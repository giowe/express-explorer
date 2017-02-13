var getLastParam = function (container) {
  var params = container.getElementsByClassName('param');
  var length = params.length;
  return params[length - 1];
};

var getParamCount = function (container) {
  return container.getElementsByClassName('param').length;
};

var addParam = function (context, elementID, containerID) {
  var container = document.getElementById(containerID);
  var childCount = container.childNodes.length;
  var selector = (childCount == 5) ? 2 : 1;
  var elem = container.childNodes[childCount - selector];
  var currentIndex = parseInt(elem.getAttribute('index'));

  if (getLastParam(container) == context.parentNode && ((getParamCount(container) < 10))) {

    var clone = elem.cloneNode(true);
    var newIndex = (currentIndex + 1).toString();

    clone.setAttribute('index', newIndex);
    setNewParamIds(clone.childNodes[1], newIndex);
    setNewParamIds(clone.childNodes[3], newIndex);
    clone.childNodes[5].style.visibility = "visible";

    container.appendChild(clone);
  }

};

var deleteParam = function (context) {
  var parent = context.parentNode;
  if (parseInt(parent.getAttribute('index')) > 0) parent.remove();
};

var setNewParamIds = function (elem, newIndex) {
  var oldID = elem.getAttribute('id');

  elem.value = '';

  while (!isNaN(parseInt(oldID[oldID.length - 1]))) {
    oldID = oldID.slice(0, -1);
  }

  var newID = oldID + newIndex;
  elem.setAttribute('id', newID);
};
