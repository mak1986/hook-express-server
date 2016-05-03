'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const util = require('util');
const http = require('http');
const hostile = require('hostile');

var fs = require('fs');
// Endpoints server
const epServer = {
	host: 'localhost',
	port: '4000',
	headers: {
		'Content-Type': 'application/vnd.api+json',
		'Accept': 'application/vnd.api+json',
	}
};
const angularServer = {
	host: 'localhost',
	port: '8080'
};

const middlewareServer = {
	host: 'localhost',
	post: '3000'
};

var data;
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
}));

// Add headers
app.use(function(req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', "*");
	//res.setHeader('Access-Control-Allow-Origin', `http://${angularServer.host}:${angularServer.port}`);

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');


	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});



var requireAuthentication = function(req, res, next) {
	if (req.method == 'OPTIONS') {
		res.statusCode = 200;
		res.send();
		return;
	}
	//console.log(`http://${angularServer.host}:${angularServer.port}`);
	// fs.writeFile("dump.txt", util.inspect(req), function(err) {
	// 	if (err) {
	// 		return console.log(err);
	// 	}

	// 	console.log("The file was saved!");
	// });
	// console.log(util.inspect(req, {
	// 	colors: true
	// }));

	// console.log(req.body);
	// var body = '';
	// req.on('data', function(chunk) {
	// 	console.log('got a chunk');
	// 	body += chunk;
	// });
	// req.on('end', function(chunk) {
	// 	console.log('ended');
	// 	if (chunk) {
	// 		body += chunk;
	// 	}
	// })
	//console.log(body);
	// console.log(util.inspect(req.headers, {
	// 	colors: true
	// }));
	//req.url
	epServer.path = req.url.replace(/^\/api(\/.*)/, '$1');
	epServer.method = req.method;
	if (req.headers['content-length']) {
		epServer.headers['Content-Length'] = req.headers['content-length'];
		data = JSON.stringify(req.body);
	}
	//console.log(epServer);
	req.epServer = epServer;

	next();
};

var requestToEndpoint = function(req, res) {

	//console.log(util.inspect(req.epServer,{colors:true}));
	var epReq = http.request(req.epServer, function(epRes) {
		//console.log(req.epServer);
		var data = '';

		epRes.on('data', function(chunk) {
			data += chunk;
		});

		epRes.on('end', function() {
			res.statusCode = epRes.statusCode;
			//console.log(util.inspect(epRes.headers));
			if (epRes.headers['content-type']) {
				res.setHeader('Content-Type', epRes.headers['content-type']);
			}
			// Temporary allow angular to access.
			//res.setHeader('Access-Control-Allow-Origin', `http://${angularServer.host}:${angularServer.port}`);

			if (req.epServer.path == '/site' && req.epServer.method == 'POST') {

				var jsonData = JSON.parse(data);
				var domain = jsonData.data.attributes.domain;

				hostile.set('127.0.0.1', 'www.' + domain, function(err) {
					if (err) {
						console.log(err);
					} else {
						console.log('set /etc/hosts successfully');
					}
				});
				if (!fs.existsSync('./images/'+jsonData.data.id)){
    				fs.mkdirSync('./images/'+jsonData.data.id);
				}

			}

			res.send(data);
		});

		// epRes.on('error', function(){
		// 	res.writeHead(epRes.statusCode,{
		// 		'Content-Type': epRes.headers['Content-Type']
		// 	});
		// 	res.send(data);
		// });
	});
	if (data) {
		epReq.write(data);
	}
	epReq.end();
};
//'http://'+middlewareServer.host+':'+middlewareServer.port+'
app.all('/api/*', [requireAuthentication, requestToEndpoint]);


var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var visitorConfig = JSON.parse(fs.readFileSync('visitor_config.json', 'utf8'));


app.get('/config', function(req, res) {

	res.send(config);
});

var responses = {};
app.get('/visitor-config', function(req, res) {
	var origin = req.headers.origin;
	origin = origin.substring(11).slice(0, -5);

	if (responses[origin]) {
		console.log(origin, responses);
		res.send(responses[origin]);
	
	} else {

		console.log(origin);
		epServer.path = '/site?filter[domain]=' + origin;
		var data = '';
		http.get(epServer, function(epRes) {
			epRes.on('data', function(chunk) {
				data += chunk;
			});
			epRes.on('end', function() {
				var jsonData = JSON.parse(data);
				//console.log(jsonData);
				visitorConfig.site.id = jsonData.data[0].id;
				responses[origin] = JSON.parse(JSON.stringify(visitorConfig));
				res.send(responses[origin]);
			});
		});
	}

});

app.get('/images/[0-9]+/accommodation_[0-9]+.jpg', function(req, res) {
	var img = fs.readFileSync('.' + req.originalUrl);
	res.writeHead(200, {
		'Content-Type': 'image/gif'
	});
	res.end(img, 'binary');
});


var walk = require('walk');


// Walker options
app.get('/count-images', function(req, res) {
	console.log(req.query);
	var id = req.query['id'];
	var files = 0;
	var walker = walk.walk('./images/' + id, {
		followLinks: false
	});
	walker.on('file', function(root, stat, next) {
		// Add this file to the list of files
		files++;
		next();
	});
	walker.on('end', function() {
		console.log(files);
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		res.end(files + '');
	});
});

app.get('/dist/main.js', function(req, res) {
	var mainJs = fs.readFileSync('dist/main.js');
	res.writeHead(200, {
		'Content-Type': 'text/javascript'
	});
	res.end(mainJs);
});



app.listen(3000);