const Character = require('./models/character.js');
const ListView = require('./views/list_view.js');

document.addEventListener('DOMContentLoaded',() => {
  console.log('Hiya');
  const characterData = new Character('https://rickandmortyapi.com/api/character/?page=');
  characterData.getData();

  const listContainer = document.querySelector("#content-container");
  const listView = new ListView(listContainer);
  listView.bindEvents(); 
});
