/**
	{
		"date_of_creation": "17 Sepember 2017",
		"aim_of_source": 'Creating database(mysql) using node.js',
		"coded_by": 'Rishikesh Agrawani',
		"output_img_link": "0004mysql02createdb2017-09-17at4.41.57PM.png"
	}
*/

//Including http module
var http = require("http")
//Including mysql module(mysql node.js driver)
var mysql = require("mysql")

//Setting port
var port = 8080

//HTML text to display on the browser
var htmlText = "<center>"+
				"<h1 style='color:green'> Connection established and created new database(if it was not there)</h1>"+
				"<a href='https://nodejs.org/en/'>Click here</a> to download"+
				"</center>"

//HTML erro text to display on the browser
var htmlErrorText = "<center>"+
				"<h1 style='color:red'> Error while accessing db</h1>"+
				"<a href='https://nodejs.org/en/'>Click here</a> to download"+
				"</center>"

//Printing simple log message
console.log("Starting Node server")

//Creating server
server = http.createServer(
			function(request, response){
				//Creating connection object
				var connection = mysql.createConnection({
					host: "localhost",	
					"user": "rishikesh",	//db username
					"password": "rishikesh@321"	//db password
				})

				//Creating and testing database connection
				connection.connect(function(err){
					if(err){
						//Error
						response.writeHead(500, {"Content-Type":"text/html"})
						console.log("Error while creating connection")
						response.end(htmlErrorText)
					} else {
						//Successful
						response.writeHead(200, {"Content-Type":"text/html"})
						console.log("Connection successful")
						console.log("Now creating database")

						//Creating database
						connection.query("CREATE DATABASE IF NOT EXISTS nodejs", function(err){
							if(err){
								//Error
								response.writeHead(500, {"Content-Type":"text/html"})
								console.log("Error while creating database")
								response.end(htmlErrorText)
							} else {
								//Successful
								response.writeHead(200, {"Content-Type":"text/html"})
								console.log("Database creation successful(if it was not there) otherwise it got skipped")
								response.end(htmlText)
							}
						})

						response.end(htmlText)
					}
				})
			}
		)

//Our http server should listen on port 8080
server.listen(port)

//Printing log messages
console.log("Server started which is listening on port 8080")
console.log("Visit at http://127.0.0.1:"+port)
