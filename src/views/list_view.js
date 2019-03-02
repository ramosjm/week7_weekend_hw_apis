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
  characters.forEach((character))
};










module.exports = ListView;
