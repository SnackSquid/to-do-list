const contentDisplay = (() => {

  const makeDiv = (divClass, parentIdentifier) => {
    const parent = document.querySelector(parentIdentifier);
    const div = document.createElement('div');
    div.classList.add(divClass);
    parent.appendChild(div);
  }

  const makeIMG = (imageID, parentClass) => {
    const parent = document.querySelector(parentClass);
    const image = document.createElement('img');
    image.id = imageID;
    parent.appendChild(image);
}

})();

export default contentDisplay;