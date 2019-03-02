const PubSub = require('../helpers/pub_sub.js');
const ResultView = require('./result_view.js');

const ListView = function(container,dropdownContainer){
  this.container = container;
  this.dropdownContainer = dropdownContainer;
};

ListView.prototype.bindEvents = function(){
  PubSub.subscribe('Character:character-data-ready',(evt)=>{
    this.renderCharacterDetailViews(evt.detail);
    this.populateDropdown(evt.detail);
  });

  this.dropdownContainer.addEventListener('change',(evt)=>{
    const selectedIndex = evt.target.value;
    PubSub.publish('ListView:status-change',selectedIndex);
  });
};

ListView.prototype.renderCharacterDetailViews = function(characters){
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
  console.dir(characters);
  const status = this.getUniqueStatus(characters);
  status.forEach((status,index) =>{
    const option = document.createElement('option');
    option.textContent = status;
    option.value = status;
    this.dropdownContainer.appendChild(option);
  });
};

ListView.prototype.getUniqueStatus = function (characters) {
  let myArray = characters.map(character => character.status)
  return myArray.reduce(function (accumulator, currentStatus) {
    if (accumulator.indexOf(currentStatus) === -1) {
      accumulator.push(currentStatus);
    }
    return accumulator;
  }, []);
};


module.exports = ListView;
