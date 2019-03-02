const Character = require('./models/character.js');
const ListView = require('./views/list_view.js');

document.addEventListener('DOMContentLoaded',() => {
  const characterData = new Character('https://rickandmortyapi.com/api/character/?page=');
  characterData.getData();

  const listContainer = document.querySelector("#content-container");
  const dropdownContainer = document.querySelector("#status-dropdown")
  const listView = new ListView(listContainer,dropdownContainer);
  listView.bindEvents();
});
