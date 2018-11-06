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
        myAlbum=myBody.album;

        var pageCount = Math.ceil(myAlbum.length / recordsPerPage);

        if (p == pageCount) {
            p = p-1;
        }
        pages = [];
        var totalPage = 10;
        var maxPage = totalPage;
        var minPage = 0;
        // if ((p-(totalPage/2)) > 0)
        //     minPage = p-(totalPage/2);
        // else
        //     minPage = 0;
        //
        // if ((p+(totalPage)) < pageCount)
        //     maxPage = p+(totalPage);
        // else
        //     maxPage = pageCount;
        //
        // for (var j=minPage;  (j<maxPage); j++) {
        //     pages.push(j);
        // }

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


        res.render('albumItem',  { album:"My Album"});
});




// for (var k=0; k<uAlbums.length; k++) {
//     console.log(uAlbums[k]);
// }


module.exports = router;