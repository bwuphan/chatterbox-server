/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var objectId = 0;
var firstMessage = {
  text: 'hello',
  username: 'Admin'
};
var dataBody = {'results': ['']};

// var defaultCorsHeaders = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10,
// };
var headers = {
    'Content-Type':'application/json',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  }
let writeResponse = function(statusCode, response, headers) {
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(dataBody));
}
let requestMethods = {
  'GET': function(request, response) {
    writeResponse(200, response, headers)
  },
  'POST': function(request, response) {
    request.on('data', function(chunk) {
      objectId++;
      chunk = JSON.parse(chunk)
      chunk['objectId'] = objectId;
      dataBody.results.push(chunk);
    });
    request.on('end', function() {
      console.log('POST')
      writeResponse(201, response, headers)
    });
  },
  'OPTIONS': function(request, response){
    writeResponse(200, response, headers)
  }
}

var requestHandler = function(request, response) {
  var requestHeaders = request.headers;
  var method = request.method;
  if(method in requestMethods){
    requestMethods[method](request, response);
  } else {
    response.writeHead(404, headers);
    response.end(JSON.stringify("Error"));
  }
};


exports.requestHandler = requestHandler;
exports.headers = headers;

/*

var dataBody = {'results': []}, previousPost = [];

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
};

var requestHandler = function(request, response) {
  var dataFile = require('./test-data.js');
  var jsonData = dataFile.data;
  var requestURL = request.url;
  var requestHeaders = request.headers;
  var method = request.method;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';
  if (requestURL === '/classes/messages' && request.method === 'POST'){
    // .writeHead() writes to the request line and headers of the response,
    // which includes the status and all headers.
    request.on('data', function(chunk){
      console.log('chunk' + chunk);
      dataBody.results.push(JSON.parse(chunk));
    });

    request.on('end', function(message){
      console.log('POST')
      response.writeHead(201, headers);
      response.end(JSON.stringify(dataBody));
    });

  } else if (requestURL === '/classes/messages' && request.method === 'GET') {
    console.log('GET')
    response.writeHead(200, headers);
    response.end(JSON.stringify(dataBody));
  } else {
    console.log('404')
    response.writeHead(404, headers);
    response.end();
  }
};
*/

// console.log('request response', request, response);
//
// They include information about both the incoming request, such as
// headers and URL, and about the outgoing response, such as its status
// and content.
//
// Documentation for both request and response can be found in the HTTP section at
// http://nodejs.org/documentation/api/

// Do some basic logging.
//
// Adding more logging to your server can be an easy way to get passive
// debugging help, but you should always be careful about leaving stray
// console.logs in your code.


// The outgoing status.

// See the note below about CORS headers.

// Tell the client we are sending them plain text.
//
// You will need to change this if you are sending something
// other than plain text, like JSON or HTML.

// .writeHead() writes to the request line and headers of the response,
// which includes the status and all headers.


// Make sure to always call response.end() - Node may not send
// anything back to the client until you do. The string you pass to
// response.end() will be the body of the response - i.e. what shows
// up in the browser.
//
// Calling .end "flushes" the response's internal buffer, forcing
// node to actually send all the data over to the client.

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

// if (url === "/classes/messages" && method === 'GET') {

//     console.log('Serving request type ' + request.method + ' for url ' + request.url);
//     // response.end(JSON.stringify(body));


// } else if (url=== "/classes/messages" && method === 'POST') {

//   request.on('error', function(err){
//     console.log(err)
//   })
//   request.on('data', function(chunk) {
//     dataBody.push(JSON.stringify(chunk));
//   }).request.on('end', function(chunk){
//     dataBody = Buffer.concat(dataBody);
//     returnData = JSON.stringify(dataBody);
//     response.end(returnData)
//   });

// } else {

//   console.log('ERROR');

// }

/*



*/
