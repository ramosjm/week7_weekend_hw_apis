const Character = require('./models/character.js');

document.addEventListener('DOMContentLoaded',() => {
  console.log('Hiya');
  const characterData = new Character('https://rickandmortyapi.com/api/character/?page=');
  characterData.getData();
})
