const Character = require('./models/character.js');

document.addEventListener('DOMContentLoaded',() => {
  console.log('Hiya');
  const api = new Character('https://rickandmortyapi.com/api/character/?page=4');

  api.getData();
})
