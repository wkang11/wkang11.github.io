module.exports = function(app){
    var service = require('./services/apiService');
    app.get('/api/summoner/basic/:name', service.findBasicByName);
    app.get('/api/summoner/info/:ID', service.getSummonerByID);    
    app.get('/api/version', service.getVersionNumber);
    app.get('/api/champions', service.getAllChampions);
    
}
