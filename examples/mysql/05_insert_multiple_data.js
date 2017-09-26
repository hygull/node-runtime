/**
	{
		"date_of_creation": "22 Sept 2017",
		"aim_of_source": 'Inserting data(rows) into table (mysql) using node.js',
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
				"<h1 style='color:green'> Connection established and created new db & table(if it was not there) then inserted datas(rows)</h1>"+
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
											"fullname VARCHAR(50) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, contact VARCHAR(10) NOT NULL, "+
											"address text DEFAULT NULL, password VARCHAR(20) NOT NULL, "+
											"created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, "+
											"updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, "+
											"is_active TINYINT(1) DEFAULT 1, is_admin TINYINT(1) DEFAULT 0);"

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
											let q = "INSERT INTO users(fullname, email, contact, password, address) VALUES ?"
											var users = [
												['Ryan Dahl', 'ryan.dahl@gmail.com','7973134514', 'ryan@321', 'Kondagaon, INDIA'],
												['Misko Hevery', 'misko.heverygmail.com','7832017454', 'misko@321', 'Kanpur, INDIA'],
												['Robert Griesemer', 'robert.griesemer@gmail.com','7877093454', 'robert@321', 'Gurgaon, INDIA'],
												['Ken Thompson', 'ken.thompson@gmail.com','7977093114', 'ken@321', 'Hyderabad, INDIA'],
												['Dennis Ritchie', 'dennis.ritchie@gmail.com','7832092454', 'dennis@321', 'Faridabad, INDIA'],
											]

											connection.query(q, [users] ,function(err, result){
												if(err){
													//Error
													response.writeHead(500, {"Content-Type":"text/html"})
													console.log("Error while inserting data(3 rows) into users table")
													response.end(htmlErrorText+"<br><center><span style='color:black; font-weight:bold'>"+err+"</span></center>")
												}else{
													//Successful
													response.writeHead(200, {"Content-Type":"text/html"})
													console.log("Rows insertion successful")
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


/*

mysql> DESC `users`;
+------------+--------------+------+-----+-------------------+-----------------------------+
| Field      | Type         | Null | Key | Default           | Extra                       |
+------------+--------------+------+-----+-------------------+-----------------------------+
| id         | bigint(20)   | NO   | PRI | NULL              | auto_increment              |
| fullname   | varchar(50)  | NO   |     | NULL              |                             |
| email      | varchar(255) | NO   | UNI | NULL              |                             |
| contact    | varchar(10)  | NO   |     | NULL              |                             |
| address    | text         | YES  |     | NULL              |                             |
| password   | varchar(20)  | NO   |     | NULL              |                             |
| created_at | timestamp    | NO   |     | CURRENT_TIMESTAMP |                             |
| updated_at | timestamp    | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
| is_active  | tinyint(1)   | YES  |     | 1                 |                             |
| is_admin   | tinyint(1)   | YES  |     | 0                 |                             |
+------------+--------------+------+-----+-------------------+-----------------------------+
10 rows in set (0.00 sec)

mysql> SELECT * FROM `users`;
+----+------------------+----------------------------+------------+------------------+------------+---------------------+---------------------+-----------+----------+
| id | fullname         | email                      | contact    | address          | password   | created_at          | updated_at          | is_active | is_admin |
+----+------------------+----------------------------+------------+------------------+------------+---------------------+---------------------+-----------+----------+
|  1 | Ryan Dahl        | ryan.dahl@gmail.com        | 7973134514 | Kondagaon, INDIA | ryan@321   | 2017-09-26 11:51:04 | 2017-09-26 11:51:04 |         1 |        0 |
|  2 | Misko Hevery     | misko.heverygmail.com      | 7832017454 | Kanpur, INDIA    | misko@321  | 2017-09-26 11:51:04 | 2017-09-26 11:51:04 |         1 |        0 |
|  3 | Robert Griesemer | robert.griesemer@gmail.com | 7877093454 | Gurgaon, INDIA   | robert@321 | 2017-09-26 11:51:04 | 2017-09-26 11:51:04 |         1 |        0 |
|  4 | Ken Thompson     | ken.thompson@gmail.com     | 7977093114 | Hyderabad, INDIA | ken@321    | 2017-09-26 11:51:04 | 2017-09-26 11:51:04 |         1 |        0 |
|  5 | Dennis Ritchie   | dennis.ritchie@gmail.com   | 7832092454 | Faridabad, INDIA | dennis@321 | 2017-09-26 11:51:04 | 2017-09-26 11:51:04 |         1 |        0 |
+----+------------------+----------------------------+------------+------------------+------------+---------------------+---------------------+-----------+----------+
5 rows in set (0.00 sec)

*/