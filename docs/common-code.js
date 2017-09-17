/**
	{
		"date_of_creation": " August 2017",
		"aim_of_source": '',
		"coded_by": 'Rishikesh Agrawani',
	}
*/

//Including http module
var http = require("http")

//Setting port & ip of localhost
var port = 8080
var hostname = "127.0.0.1"

//HTML text to display on the browser
var htmlText = "<center>"+
				"<h1 style='color:green'> Node.js is JavaScript Runtime</h1>"+
				"<a href='https://nodejs.org/en/'>Visit here</a> to download"+
				"</center>"

//Printing simple log message
console.log("Starting Node server")

//Creting server
server = http.createServer(
			function(request, response){
				response.writeHead(200, {"Content-Type":"text/html"})
				response.end(htmlText)
			}
		)

//Our http server should listen on port 8080
server.listen(port, hostname, function(){
	console.log(`Server is running at http://${hostname}:${port}`)
})

//Printing log messages
console.log("Server started which is listening on port 8080")
