const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Character = function (urlSample){
 this.urlSample = urlSample;
 this.data = []
};

Character.prototype.getData = function () {
  const siteList = this.getUrlList(this.urlSample);
  Promise.all(siteList.map(function(url){
    const request = new RequestHelper(url);
    return request.get();
  }))
    .then (data => this.handleData(data));
  PubSub.subscribe('ListView:status-change',(evt)=>{
    const selectedIndex = evt.detail;
    this.publishStatusData(selectedIndex);
  });
  PubSub.subscribe('ListView:species-change',(evt)=>{
    const selectedIndex = evt.detail;
    this.publishSpeciesData(selectedIndex);
  });
};

Character.prototype.getUrlList = function (urlSample){
  const urlList = []
  for (i=1; i<=25; i++){
    const newUrl = urlSample+i;
    urlList.push(newUrl);
  };
  return urlList;
};

Character.prototype.handleData = function(data){
  const resultsArray = []
  data.forEach((dataItem)=>resultsArray.push(dataItem.results));
  this.data = resultsArray.flat(2);
  PubSub.publish('Character:character-data-ready',this.data)
};

Character.prototype.publishStatusData = function(selectedIndex){
  const selectedStatus = this.data.filter((character) => character.status === selectedIndex);
  PubSub.publish('Character:character-status-ready',selectedStatus);
};

Character.prototype.publishSpeciesData = function(selectedIndex){
  const selectedSpecies = this.data.filter((character)=> character.species ===selectedIndex);
  PubSub.publish('Character:character-species-ready',selectedSpecies);
};


module.exports = Character;
