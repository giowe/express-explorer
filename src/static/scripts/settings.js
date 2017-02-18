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
