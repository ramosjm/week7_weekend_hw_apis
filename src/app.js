const Character = require('./models/character.js');
const ListView = require('./views/list_view.js');

document.addEventListener('DOMContentLoaded',() => {
  const characterData = new Character('https://rickandmortyapi.com/api/character/?page=');
  characterData.getData();

  const listContainer = document.querySelector('#content-container');
  const statusContainer = document.querySelector('#status-dropdown');
  const speciesContainer = document.querySelector('#species-dropdown');
  const listView = new ListView(listContainer,statusContainer,speciesContainer);
  listView.bindEvents();
});
