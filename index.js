'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const util = require('util');
const http = require('http');
//var fs = require('fs');

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
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

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
	console.log(`http://${angularServer.host}:${angularServer.port}`);
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
	if(req.headers['content-length']){
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
			console.log(util.inspect(epRes.headers));
			if(epRes.headers['content-type']){
				res.setHeader('Content-Type', epRes.headers['content-type']);
			}
			// Temporary allow angular to access.
			//res.setHeader('Access-Control-Allow-Origin', `http://${angularServer.host}:${angularServer.port}`);

			res.send(data);
		});

		// epRes.on('error', function(){
		// 	res.writeHead(epRes.statusCode,{
		// 		'Content-Type': epRes.headers['Content-Type']
		// 	});
		// 	res.send(data);
		// });
	});
	if(data){
		epReq.write(data);
	}
	epReq.end();
};
//'http://'+middlewareServer.host+':'+middlewareServer.port+'
app.all('/api/*', [requireAuthentication, requestToEndpoint]);

var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var visitorConfig = JSON.parse(fs.readFileSync('visitor_config.json', 'utf8'));

app.get('/config',function(req,res){
	res.send(config);
});
app.get('/visitor-config',function(req,res){
	res.send(visitorConfig);
});
app.listen(3000);