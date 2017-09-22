/**
	{
		"date_of_creation": "17 August 2017",
		"aim_of_source": 'Creating table(mysql) using node.js',
		"coded_by": 'Rishikesh Agrawani',
	}
*/

//Including http module
var http = require("http")
//Including mysql module(mysql node.js driver)
var mysql = require("mysql")

//Importing Databas credentials
var config = require("./config/mysql-config.js")

//Setting port
var port = 8080

//HTML text to display on the browser
var htmlText = "<center>"+
				"<h1 style='color:green'> Connection established and created new db & table(if it was not there) then inserted data</h1>"+
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
				console.log("Requested Url: "+request.url, typeof request.url)
				if(request.url != "/favicon.ico"){
					//Creating connection object
					var connection = mysql.createConnection({
						"host": config.dbhost,	
						"user": config.dbuser,	//db username
						"password": config.dbpassword,	//db password
						"database": config.dbname	//db name if it exists(otherwise create it)
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

									var q = "CREATE TABLE IF NOT EXISTS users(id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT, "+
											"fullname VARCHAR(50) NOT NULL, email text NOT NULL, contact VARCHAR(10) NOT NULL, "+
											"address text DEFAULT NULL, password VARCHAR(20) NOT NULL, "+
											"created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, "+
											"updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)"

									//Cretaing table 
									connection.query(q, function(err){
										if(err){
											//Error
											response.writeHead(500, {"Content-Type":"text/html"})
											console.log("Error while creating table")
											response.end(htmlErrorText+"<br><center><span style='color:black; font-weight:bold'>"+err+"</span></center>")
										} else {
											//Successful
											response.writeHead(200, {"Content-Type":"text/html"})
											console.log("Table creation successful(if it was not there) otherwise it got skipped")
											response.end(htmlText)

											//Inserting data into table
											let q = "INSERT INTO users(fullname, email, contact, password, address) VALUES('Misko Hevery', 'misko.hevery@gmail.com', '802309567', 'misko@321', 'Delhi, INDIA')"
											connection.query(q, function(err, data){
												//Error
												if(err){
													response.writeHead(500, {"Content-Type":"text/html"})
													console.log("Error while inserting data into users table")
													response.end(htmlErrorText+"<br><center><span style='color:black; font-weight:bold'>"+err+"</span></center>")
												}else{
													//Successful
													response.writeHead(200, {"Content-Type":"text/html"})
													console.log("Insertion successful")
													response.end(htmlText)
												}
											})
										}
									})
								}
							})
						}
					})
				}//if closed(request.url)
				else{
					// response.end(htmlText + "<br><center>Now browser is requesting for /favicon.ico</center>")
					console.log("Your browser internally requested /favicon.ico")
				}
			}
		)

//Our http server should listen on port 8080
server.listen(port)

//Printing log messages
console.log("Server started which is listening on port 8080")
console.log("Visit at http://127.0.0.1:"+port)
