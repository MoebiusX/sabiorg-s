var mysql = require('mysql');
var express = require('express');

var router = express.Router();
var connected = false;
var solution = 'no solution';
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'manageME',
  database : 'mydb'
});

/* GET users listing. */
router.get('/', function(req, res, next) {

if (!connected) {
connection.connect(function(err) {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  connected = true;
});
}

/*connection.query('SELECT message FROM mytable', function (err, rows, fields) {
  if (err) throw err;
  solution = rows;
});*/


var result = [];

var  getInformationFromDB = function(callback) {
connection.query('SELECT * FROM mytable', function(err, res, fields)
	{
		solution=res;
	    if (err)  return callback(err);
	     if(res.length){
	    for(var i = 0; i<res.length; i++ ){     
	                    result.push(res[i]);
	        }
	     }
	   callback(null, result);
	});
};


 console.log("Call Function");
getInformationFromDB(function (err, result) {
  if (err) console.log("Database error!");
  else console.log(result);
});




//connection.end();

  res.send(solution);
});

module.exports = router;
