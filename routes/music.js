var express = require('express');
var router = express.Router();
var Request = require("request");
// TODO: GET INITIAL STATS

/* GET home page. */
router.get('/', function(req, res, next) {
    Request.get("http://localhost:3000/api/v1/status", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        myBody = JSON.parse(body);
        var mediaCount=myBody.mediaCount;
        var nAlbums=myBody.nAlbums;
        res.render('music',  {title: 'Sabiorg', mediaCount: mediaCount, nAlbums: nAlbums});
    });
});

router.post('/', function(req, res, next) {
    var fpath = req.body.folderPath;
    var Request = require("request");

    Request.get("http://localhost:3000/api/v1/users", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        res.send("Analyzing files under "+fpath+" "+body);
        var myJson = JSON.parse(body);
    });

});

module.exports = router;
