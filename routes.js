module.exports = function(app){
    var summoners = require('./controllers/summoners');
    var university = require('./controllers/university');
    app.get('/api/summoner/ranked/:ID', summoners.findRankedByName);
    app.get('/api/summoner/basic/:name', summoners.findBasicByName);
    app.get('/api/university/code/:code', university.findAllByCode);
}