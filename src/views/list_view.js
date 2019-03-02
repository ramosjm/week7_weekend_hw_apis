const PubSub = require('../helpers/pub_sub.js');
const ResultView = require('./result_view.js');

const ListView = function(container){
  this.container = container;
};

ListView.prototype.bindEvents = function(){
  PubSub.subscribe('Character:character-data-ready',(evt)=>{
    console.dir(evt.detail);
    this.renderCharacterDetailViews(evt.detail);
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


module.exports = ListView;
