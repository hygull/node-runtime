/*
	{
		"created_on": "30 September 2017",
		"aim": "To create  a node server to serve the requests of users"
		"coded_by": "Rishikesh Agrawani"
	}
*/

var http = require("http")
var fs = require("fs")
var users = require("./data.js").users

var server = http.createServer(function(request, response){
	try{
		var config = JSON.parse(process.env.APP_CONFIG)
		var MongoClient = require("mongodb").MongoClient
		var mongoDbPassword = "rishikesh321"

		
		//Connecting to database
		MongoClient.connect("mongodb://" + config.mongo.user + ":" + mongoDbPassword + "@" + config.mongo.hostString,
			function(err, db){
				if(err){
					//Rendering Error page while database connection problem
					fs.readFile("./error.html", function(err, data){
						response.writeHead(200, {"Content-Type": "text/html"})
						response.end(data)
					})
				} else {
					//Rendering Home page
					fs.readFile("./home.html", function(err, data){
						response.writeHead(200, {"Content-Type": "text/html"})
						response.end(data)
					})
				}

				db.close()
			})
	} catch(err) {
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end("" + err)
	}
})

server.listen(process.env.PORT)
// server.listen(8080)