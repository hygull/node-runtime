/**
	{
		"date_of_creation": "23 Sept 2017",
		"aim_of_source": 'Performing GET/UPDATE using node.js',
		"coded_by": 'Rishikesh Agrawani',
	}
*/

var express = require("express")

var app = express()

var mysql = require("mysql")

var fs = require("fs")

var bodyParser = require("body-parser")

var config = require("./config/mysql-config.js")

var connection = mysql.createConnection({
		database: config.dbname,
		user: config.dbuser,
		password: config.dbpassword,
		host: config.dbhost,
})

//GET ALL USERS
app.get(config.root+"/users/", function(request, response){
	
/*
	mysql> SELECT * FROM users;
	+----+------------------+----------------------------+------------+------------------+------------+---------------------+---------------------+
	| id | fullname         | email                      | contact    | address          | password   | created_at          | updated_at          |
	+----+------------------+----------------------------+------------+------------------+------------+---------------------+---------------------+
	|  1 | Ryan Dahl        | ryan.dahl@gmail.com        | 8070509067 | Delhi, INDIA     | ryan@321   | 2017-09-22 13:37:05 | 2017-09-22 14:27:39 |
	|  2 | Misko Hevery     | misko.hevery@gmail.com     | 8023095677 | Bangalore, INDIA | misko@321  | 2017-09-22 13:58:49 | 2017-09-22 14:27:16 |
	|  3 | Rob Pike         | rob.pike@gmail.com         | 8023567352 | Nagpur, INDIA    | rob@321    | 2017-09-22 14:12:05 | 2017-09-22 14:22:09 |
	|  4 | Robert Griesemer | robert.griesemer@gmail.com | 7877093454 | Gurgaon, INDIA   | robert@321 | 2017-09-22 15:22:02 | 2017-09-22 15:22:02 |
	|  5 | Ken Thompson     | ken.thompson@gmail.com     | 7977093114 | Hyderabad, INDIA | ken@321    | 2017-09-22 15:22:02 | 2017-09-22 15:22:02 |
	|  6 | Dennis Ritchie   | dennis.ritchie@gmail.com   | 7832092454 | Faridabad, INDIA | dennis@321 | 2017-09-22 15:22:02 | 2017-09-22 15:22:02 |
	+----+------------------+----------------------------+------------+------------------+------------+---------------------+---------------------+
	6 rows in set (0.00 sec)

*/
	connection.query("SELECT * FROM users WHERE is_active=1;", function(err, data){
		if(err){
			response.writeHead(500, {"Content-Type": "application/json"})
			response.end(JSON.stringify({message: "Server Error", "status": 500}))
		} 
		response.writeHead(200, {"Content-Type": "application/json"})
		response.end(JSON.stringify(data))
	})
})


app.get(config.root+"/users/:userId", function(request, response){
	var  userId = request.params.userId
	console.log(typeof userId)

	connection.query("SELECT * from users WHERE id="+userId+" AND is_active=1;", function(err, data){
		if(err){
			response.writeHead(500, {"Content-Type": "application/json"})
			response.end(JSON.stringify({message: "Server Error", "status": 500}))
		} 
		var newUser = {}
		for (let user of data){
			console.log("User: ", user)
			newUser = user
			break
		}
		response.writeHead(200, {"Content-Type": "application/json"})
		response.end(JSON.stringify(newUser))
	})
})


app.get("/users/update/:userId", function(request, response){
	fs.readFile("./update_user.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end(data)
	})
})

app.get("/", function(request, response){
	fs.readFile("./home.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end(data)
	})
})


// app.use(bodyParser.urlencoded({extended:true}))
// for parsing application/json
app.use(bodyParser.json()); 

app.put(config.root+"/users/:userId", function(request, response){
	var  userId = request.params.userId

	if( !/^\d+$/.test(userId)){
		response.json({"status": 400, "message": "userId should be an integer"})
	}

	var data = request.body
	var totalKeys = Object.keys(data).length
	console.log("GOT", data)
	
	if(data){
		//Query preparation
		let query =  "UPDATE users SET "
		let i = 1
		for(let key in data){
			if(i === totalKeys){ //If it is last key
				if(typeof key == 'string'){
					query += (key + "='"+data[key].trim()+"'" )
				} else {//number
					query += (key + "="+data[key] )
				}
			} else {//If it is not the last key
				if(typeof key == 'string'){
					query += (key + "='"+data[key].trim()+"'," )
				} else {//number
					query += (key + "="+data[key]+"," )
				}
			}
			i += 1
		}
		query += " where id="+userId
		console.log("QUERY: ", query)

		//Updating data into users table
		connection.query(query, function(err, result){
			if(err){
				response.writeHead(500, {"Content-Type": "application/json"})
				response.end(JSON.stringify({message: "Server Error", "status": 500}))
				return
			} 
			// response.writeHead(200, {"Content-Type": "application/json"}) ...otherwise
			// Can't set headers after they are sent
			console.log("Query successfully executed")
			response.json({"status": 200, "message": "Details successfully updated"})
		})
	} else {
		// response.writeHead(400, {"Content-Type": "application/json"}) ...otherwise
		// Can't set headers after they are sent.
		response.json({"status": 400, "message": "Could not found data"})
	}	
})

//Start Server 
var server = app.listen(8080, function(){
	console.log("Server is running")
})