const showMethodList = (id, type) => {

  const methodList = document.getElementById(id);

  if (methodList.classList.contains('slide-up')) {
    methodList.classList.remove('slide-up');
    methodList.classList.add('slide-down-' + type);
  }
  else {
    methodList.classList.remove('slide-down-' + type);
    methodList.classList.add('slide-up');
  }

};

