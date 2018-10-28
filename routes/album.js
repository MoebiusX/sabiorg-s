var express = require('express');
var router = express.Router();
var Request = require("request");
var myBody;
var myAlbum;
router.get('/', function(req, res, next) {
    Request.get("http://localhost:3000/api/v1/album", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        // res.send("Analyzing files under "+fpath+" "+body);
        myBody = JSON.parse(body);
        myAlbum=myBody.album;
        res.render('album',  { myAlbum});
    });

});

router.get('/:id', function(req, res, next) {

        res.render('albumItem',  { album:"My Album"});
});




// for (var k=0; k<uAlbums.length; k++) {
//     console.log(uAlbums[k]);
// }


module.exports = router;