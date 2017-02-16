const showMethodList = (id) => {
  const elem = document.getElementById(id);
  const father = elem.previousElementSibling;
  let description;
  let text;

  if (father.getElementsByClassName) {
    description = father.getElementsByClassName('right')[0];
  }

  if (elem.style.opacity == 0) {
    slideDown(elem);
    text = 'close';
  }
  else {
    slideUp(elem);
    text = 'open';
  }

  if (description && father.classList.contains('method-container')) {
    description.innerHTML = `${text} testing panel`;
  }
};

const slideDown = (elem) => {
  const count = elem.getElementsByClassName('method-container').length;
  const height = ((44 * count) + 380).toString() + 'px';
  elem.style.maxHeight = height;
  elem.style.opacity = '1';
};

const slideUp = (elem) => {
  elem.style.maxHeight = '0';
  once(1, () => {
    elem.style.opacity = '0';
  });
};

const once = (seconds, callback) => {
  let counter = 0;
  const time = window.setInterval(function () {
    counter++;
    if (counter >= seconds) {
      callback();
      window.clearInterval(time);
    }
  }, 700);
};


