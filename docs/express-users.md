./config/mysql-config.js

```typescript
//Database credentials 

var DB_USERNAME = "rishikesh"

var DB_PASSWORD = "rishikesh@321"

var DB_NAME = "nodejs"

var DB_HOST = "localhost"

// Database configuration object
var config = {
	"dbuser": DB_USERNAME,
	"dbpassword": DB_PASSWORD,
	"dbname": DB_NAME,
	"dbhost": DB_HOST,
}

//root subpath for endpoints
var ROOT = "/api"

config.root = ROOT

//Export now
module.exports = config
```

./app.js

```javascript
var express = require("express")

var app = express()

var mysql = require("mysql")

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
	connection.query("SELECT * from users", function(err, data){
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

	connection.query("SELECT * from users where id="+userId, function(err, data){
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


app.get("/", function(request, response){
	var fs = require("fs")

	fs.readFile("./home.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end(data)
	})
})

var server = app.listen(8080, function(){
	console.log("Server is running")
})
```
Also see [home.html](./examples/express/app1/home.html) to get list all users

Now visit [http://localhost:8080](http://127.0.0.1:8080/)