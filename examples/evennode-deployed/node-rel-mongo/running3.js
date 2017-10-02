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

try{
	var server = http.createServer(function(request, response){
		
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
						try{
							db.collection("users").insertMany(users, function(err, result){
								if(err){
									fs.readFile("./error.html", function(err, data){
										response.writeHead(200, {"Content-Type": "text/html"})
										response.end(data)
									})
								} else {
									fs.readFile("./home.html", function(err, data){
										response.writeHead(200, {"Content-Type": "text/html"})
										response.end(data)
									})
								}
							})
						} catch(err) {
							response.writeHead(200, {"Content-Type": "text/html"})
							response.end("" + err)
						}
					}	
				})
	})
}
catch(err) {
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end("" + err)
}

try{
	server.listen(process.env.PORT)
} catch(err) {
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end("" + err)
}
// server.listen(8080)