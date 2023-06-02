const contentDisplay = (() => {

  const makeDiv = (divClass, parentClass) => {
    const parent = document.querySelector(parentClass);
    const div = document.createElement('div');
    div.classList.add(divClass);
    parent.appendChild(div);
  }

})();

export default contentDisplay;