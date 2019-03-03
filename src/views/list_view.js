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
    this.populateDropdown(evt.detail);
  });

  PubSub.subscribe('Character:character-species-ready',(evt)=>{
    this.renderCharacterDetailViews(evt.detail);
  });

  this.statusContainer.addEventListener('change',(evt)=>{
    const selectedIndex = evt.target.value;
    PubSub.publish('ListView:status-change',selectedIndex);
  });

  this.speciesContainer.addEventListener('chane',(evt)=>{
    const selectedIndex = evt.target.value;
    PubSub.publish('ListView:species-change',selectedIndex);
  });

  PubSub.subscribe('Character:character-status-ready',(evt)=>{
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

ListView.prototype.populateDropdown = function (characters){
  console.log(characters);
  const status = this.getUniqueStatus(characters);
  status.forEach((status,index) =>{
    const option = document.createElement('option');
    option.textContent = status;
    option.value = status;
    this.statusContainer.appendChild(option);
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


module.exports = ListView;
