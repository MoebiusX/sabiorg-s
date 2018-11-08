var express = require('express');
var router = express.Router();
var Request = require("request");
var myBody;
var myAlbum;
var recordsPerPage = 22;
var pages = [];

router.get('/', function(req, res, next) {
    var p;
    p=req.query.p;
    console.log(p);

    if (typeof p == 'undefined'){
        p=0;
    }
    if (p == -1) {
        p=0;
    }
    p=p*1;

    Request.get("http://localhost:3000/api/v1/album", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        // res.send("Analyzing files under "+fpath+" "+body);
        myBody = JSON.parse(body);
        myAlbum = myBody.album;

        for (var i=0; i<myAlbum.length; i++){
            if (myAlbum[i].pic) {
                let buff = new Buffer(myAlbum[i].pic.imageBuffer.data);
                let base64data = buff.toString('base64');
                myAlbum[i].pic = "data:image/jpeg;base64," + base64data;
            }

        }


        // var tmpAlbum=myBody.album;
        // myAlbum = tmpAlbum.map(function(tmpAlbum) {
        //     return tmpAlbum['title'];
        // });

        var pageCount = Math.ceil(myAlbum.length / recordsPerPage);

        if (p == pageCount) {
            p = p-1;
        }
        pages = [];
        var totalPage = 10;
        var maxPage = totalPage;
        var minPage = 0;
        if ((p-(totalPage)) > 0)
            minPage = p-(totalPage);
        else
            minPage = 0;

        if ((p+(totalPage)) < pageCount)
            maxPage = p+(totalPage);
        else
            maxPage = pageCount;

        for (var j=minPage;  (j<maxPage); j++) {
            pages.push(j);
        }

        for (var j=0;  (j<pageCount && j<maxPage); j++) {
            pages[j]=j;
        }
        var initRecord = p*recordsPerPage;
        var endRecord = initRecord + recordsPerPage;
        myAlbum = myAlbum.slice(initRecord, endRecord);
        var kp = p;

        res.render('album',  { title: 'Sabiorg', myAlbum, pages, kp});

    });

});

router.get('/:id', function(req, res, next) {

    Request.get("http://localhost:3000/api/v1/images", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        // res.send("Analyzing files under "+fpath+" "+body);
        myBody = JSON.parse(body);
        var pic = myBody.image[0];
            var base64String = "";
            for (var i = 0; i < pic.imageBuffer.data.length; i++) {
                base64String += String.fromCharCode(pic.imageBuffer.data[i]);
            }
            let buff = new Buffer(pic.imageBuffer.data);
            let base64data = buff.toString('base64');
            var myPic = "data:image/jpeg;base64," + base64data;
        res.render('albumItem',  { title: "My Album", myPic: myPic});

    });


});




// for (var k=0; k<uAlbums.length; k++) {
//     console.log(uAlbums[k]);
// }


module.exports = router;