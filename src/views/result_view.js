const PubSub = require('../helpers/pub_sub.js');
const ResultView = function(){

};

ResultView.prototype.createCharacterDetail = function(character){
  name = character.name;
  img = character.image;
  species = character.species;
  status = character.status;

  list = document.createElement('ul');
  list.classList = 'character-container';
  li = document.createElement('li');

  nameParagraph = document.createElement('p');
  nameParagraph.textContent = name;
  li.appendChild(nameParagraph);
  list.appendChild(nameParagraph);

  imgContainer = document.createElement('div');
  imgItem = document.createElement('img');
  imgItem.src = img;
  imgContainer.appendChild(imgItem);
  nameParagraph.appendChild(imgContainer);

  const characterSpecies = this.createElements('div','label','Species','span',species);
  list.appendChild(characterSpecies);

  const characterStatus = this.createElements('div','label','Status','span',status);
  list.appendChild(characterStatus);
  return list

};

ResultView.prototype.createElements = function(container,label,labelText,span,spanText,textContent){
  const elementContainer = document.createElement(container);
  const labelElement = document.createElement(label);
  labelElement.textContent = labelText;
  const spanElement = document.createElement(span);
  spanElement.textContent = spanText;
  elementContainer.appendChild(labelElement);
  elementContainer.appendChild(spanElement);
  return elementContainer;
};


module.exports = ResultView
