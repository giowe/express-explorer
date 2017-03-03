import {panelHeight, animationTime} from './constants';

export const showMethodList = (id) => {
  const elem = document.getElementById(id);
  const father = elem.previousElementSibling;
  let description;

  if (father.getElementsByClassName) {
    description = father.getElementsByClassName('right')[0];
  }


  if (elem.style.display == 'none' || elem.style.display == '') {
    elem.style.display = 'block';
    if (description) description.innerHTML = `close testing panel`;
  }
  else {
    elem.style.display = 'none';
    if (description && father.classList.contains('method-container')) {
      description.innerHTML = `open testing panel`;
    }
  }

};

export const slideDown = (elem) => {
  const count = elem.getElementsByClassName('method-container').length;
  const height = ((44 * count) + panelHeight).toString() + 'px';
  elem.style.maxHeight = height;
  elem.style.opacity = '1';
};

export const slideUp = (elem) => {
  elem.style.maxHeight = '0';
  once(1, () => {
    elem.style.opacity = '0';
  });
};

export const once = (seconds, callback) => {
  let counter = 0;
  const time = window.setInterval(() => {
    counter++;
    if (counter >= seconds) {
      callback();
      window.clearInterval(time);
    }
  }, animationTime);
};



