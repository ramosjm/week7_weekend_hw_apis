const PubSub = require('../helpers/pub_sub.js');
const ResultView = require('./result_view.js');

const ListView = function(container){
  this.container = container;
};

ListView.prototype.bindEvents = function(){
  PubSub.subscribe('Character:character-data-ready',(evt)=>{
    console.dir(evt.detail);
    this.renderCharacterDetailViews(evt.detail);
    this.populate(evt.detail);
  });
};

ListView.prototype.renderCharacterDetailViews = function(characters){
  console.dir(characters);
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

ListView.prototype.populate = function (characters){
  console.dir(characters);
  const status = this.getUniqueStatus(characters);
  const dropdownContainer = document.querySelector('#status-dropdown');
  status.forEach((status,index) =>{
    const option = document.createElement('option');
    option.textContent = status;
    option.value = index;
    dropdownContainer.appendChild(option);
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
