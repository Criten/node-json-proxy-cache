var http = require('http');
var url = require('url');

var cache = "";

function get_request(path, callback) {
  var path = "http://localhost:3000" + path;
  var url_obj = url.parse(path);

  if(cache !== "") {
    callback.call(this, cache);
    return;
  }

  var options = {
    host: url_obj.hostname,
    port: url_obj.port,
    path: url_obj.path,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  };

  http.get(options, function(res) {
    var body = '';

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      cache = body;
      console.log(body);
      callback.call(this, body);
    });
  }).on('error', function() {
    console.log('wat');
  });
}

var server = http.createServer(function(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.writeHead(200, {"Content-Type": "application/json"});

  get_request(request.url, function(data) {
    response.end(data);
  });
});

server.listen(1337);



http.get('http://localhost:3000/menus/main.json?name=Hades', function(res) {

}).on('error', function() {
  console.log('got error');
});
