const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Character = function (){

};

Character.prototype.getData = function () {
    const p1 = ('https://rickandmortyapi.com/api/character/?page=4');
    const p2 = ('https://rickandmortyapi.com/api/character/?page=2');
    const p3 = ('https://rickandmortyapi.com/api/character/?page=1');
    const array = [p1,p2,p3];
    Promise.all(array.map(function(url){
      const request = new RequestHelper(url);
      return request.get();
      console.log(request);
    }))
      .then (data =>console.log(data));
};

module.exports = Character;
