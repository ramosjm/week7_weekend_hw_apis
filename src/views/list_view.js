const PubSub = require('../helpers/pub_sub.js');
const ResultView = require('./result_view.js');

const ListView = function(container,statusContainer,speciesContainer){
  this.container = container;
  this.statusContainer = statusContainer;
  this.speciesContainer = speciesContainer;
};

ListView.prototype.bindEvents = function(){
  PubSub.subscribe('Character:character-data-ready',(evt)=>{
    this.renderCharacterDetailViews(evt.detail);
    const status = this.getUniqueStatus(evt.detail);
    this.populateDropdown(status,evt.detail,this.statusContainer);
    const species = this.getUniqueSpecies(evt.detail);
    this.populateDropdown(species,evt.detail,this.speciesContainer);
  });

  this.statusContainer.addEventListener('change',(evt)=>{
    const selectedIndex = evt.target.value;
    PubSub.publish('ListView:status-change',selectedIndex);
  });

  this.speciesContainer.addEventListener('change',(evt)=>{
    const selectedIndex = evt.target.value;
    PubSub.publish('ListView:species-change',selectedIndex);
  });

  PubSub.subscribe('Character:character-status-ready',(evt)=>{
    this.renderCharacterDetailViews(evt.detail);
  });

  PubSub.subscribe('Character:character-species-ready',(evt)=>{
    this.renderCharacterDetailViews(evt.detail);
  });
};

ListView.prototype.renderCharacterDetailViews = function(characters){
  this.container.innerHTML = '';
  characters.forEach((character)=>{
    const characterItem = this.createCharacterListItem(character);
    this.container.appendChild(characterItem);
  });
};

ListView.prototype.createCharacterListItem = function (character){
  const resultView = new ResultView();
  const characterDetail = resultView.createCharacterDetail(character);
  return characterDetail;
};

ListView.prototype.populateDropdown = function (items,characters,container){
  items.forEach((item,index) =>{
    const option = document.createElement('option');
    option.textContent = item;
    option.value = item;
    container.appendChild(option);
  });
};

ListView.prototype.getUniqueStatus = function (characters) {
  let characterStatuses = characters.map(character => character.status)
  return characterStatuses.reduce(function (accumulator, currentStatus) {
    if (accumulator.indexOf(currentStatus) === -1) {
      accumulator.push(currentStatus);
    }
    return accumulator;
  }, []);
};

ListView.prototype.getUniqueSpecies = function (characters) {
  let characterSpecies = characters.map(character => character.species)
  return characterSpecies.reduce(function (accumulator, currentSpecies) {
    if (accumulator.indexOf(currentSpecies) === -1) {
      accumulator.push(currentSpecies);
    }
    return accumulator;
  }, []);
};




module.exports = ListView;
