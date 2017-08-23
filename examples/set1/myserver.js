/**
	{
		"date_of_creation": "23 August 2017",
		"aim_of_source": 'Creating a simple http server',
		"coded_by": 'Rishikesh Agrawani',
		"output_link": "images/set1myserver2017-08-23at7.23.27 PM.png"
	}
*/

//Including http module
var http = require("http")

//Setting port
var port = 8080

//HTML text to display on the browser
var htmlText = "<center>"+
				"<h1 style='color:green'> Node.js is JavaScript Runtime</h1>"+
				"<a href='https://nodejs.org/en/'>Click here</a> to download"+
				"</center>"

//Printing simple log message
console.log("Starting Node server")

//Creting server
server = http.createServer(
			function(requset, response){
				response.writeHead(200, {"Content-Type":"text/html"})
				response.end(htmlText)
			}
		)

//Our http server should listen on port 8080
server.listen(port)

//Printing log messages
console.log("Server started which is listening on port 8080")
console.log("Visit at http://127.0.0.1:"+port)