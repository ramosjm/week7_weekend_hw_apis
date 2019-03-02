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
  nameParagraph.textContent = name;
  li.appendChild(nameParagraph);
  list.appendChild(nameParagraph);

  characterSpecies = document.createElement('div');

  speciesLabel = document.createElement('label');
  speciesLabel.textContent = 'Species';
  speciesParagraph = document.createElement('span');
  speciesParagraph.textContent = species;
  characterSpecies.appendChild(speciesLabel);
  characterSpecies.appendChild(speciesParagraph);
  list.appendChild(characterSpecies);

  characterStatus = document.createElement('div');

  statusLabel = document.createElement('label');
  statusLabel.textContent = 'Status';
  statusParagraph = document.createElement('span');
  statusParagraph.textContent = status;
  characterStatus.appendChild(statusLabel);
  characterStatus.appendChild(statusParagraph);
  list.appendChild(characterStatus);

  return list

};


module.exports = ResultView
