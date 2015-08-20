var express = require('express');
var app = express();
var request = require('request');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));



app.get('/', function(req, res){
  res.sendFile('./index.html');
});

app.get('/get_website', function(req, res){
  var url = req.query.url;
  request.get(url, function(err, response, body){
    if(!err){
      res.send(body);
    }else{
      console.log(err);
      res.send('err');
    }
  });
});

app.listen(port, function(){
  console.log('listening on port ',port);
});
