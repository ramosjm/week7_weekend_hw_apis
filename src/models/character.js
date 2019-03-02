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
  console.log(this.data);
  PubSub.publish('Character:character-data-ready',this.data)
};


module.exports = Character;
