const PubSub = require('../helpers/pub_sub.js');
const ResultView = function(){

};

ResultView.prototype.createCharacterDetail = function(character){
  name = character.name
  species = character.species
  status = character.status

  list = document.createElement('ul');
  li = document.createElement('li');

  nameParagraph = document.createElement('p');
  nameParagraph.textContent = name
  li.appendChild(nameParagraph);

  speciesLabel = document.createElement('label');
  speciesLabel.textContent = 'species'
  speciesParagraph = document.createElement('li');
  speciesParagraph.textContent = species
  list.appendChild(speciesLabel);
  list.appendChild(speciesParagraph);

  statusLabel = document.createElement('label');
  statusLabel.textContent = 'status'
  statusParagraph = document.createElement('li');
  statusParagraph.textContent = status
  list.appendChild(statusLabel);
  list.appendChild(statusParagraph);

  return list

};


module.exports = ResultView
