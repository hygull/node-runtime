/**
	{
		"date_of_creation": "24 Sept 2017",
		"aim_of_source": 'Performing GET/UPDATE using node.js',
		"coded_by": 'Rishikesh Agrawani',
	}
*/

var express = require("express")

var app = express()

var mysql = require("mysql")

var port = 8080

var fs = require("fs")

var bodyParser = require("body-parser")

var config = require("./config/mysql-config.js")

var connection = mysql.createConnection({
		database: config.dbname,
		user: config.dbuser,
		password: config.dbpassword,
		host: config.dbhost,
})

//GET ALL ACTIVE USERS
app.get(config.root+"/users/", function(request, response){
	
/*

mysql> SELECT * FROM users;
+----+------------------+----------------------------+------------+------------------+------------+---------------------+---------------------+-----------+----------+
| id | fullname         | email                      | contact    | address          | password   | created_at          | updated_at          | is_active | is_admin |
+----+------------------+----------------------------+------------+------------------+------------+---------------------+---------------------+-----------+----------+
|  1 | Ryan Dahl        | ryan.dahl@gmail.com        | 7973134514 | Kondagaon, INDIA | ryan@321   | 2017-09-25 11:29:06 | 2017-09-25 15:23:55 |         1 |        0 |
|  2 | Misko Hevery     | misko.heverygmail.com      | 7832017454 | Kanpur, INDIA    | misko@321  | 2017-09-25 11:29:06 | 2017-09-25 15:24:18 |         1 |        0 |
|  3 | Robert Griesemer | robert.griesemer@gmail.com | 7877093454 | Gurgaon, INDIA   | robert@321 | 2017-09-25 11:29:06 | 2017-09-25 15:24:06 |         1 |        0 |
|  4 | Ken Thompson     | ken.thompson@gmail.com     | 7977093114 | Hyderabad, INDIA | ken@321    | 2017-09-25 11:29:06 | 2017-09-25 15:24:27 |         1 |        0 |
|  5 | Dennis Ritchie   | dennis.ritchie@gmail.com   | 7832092454 | Faridabad, INDIA | dennis@321 | 2017-09-25 11:29:06 | 2017-09-25 15:24:12 |         1 |        0 |
+----+------------------+----------------------------+------------+------------------+------------+---------------------+---------------------+-----------+----------+
5 rows in set (0.00 sec)

*/

//Get all active users
connection.query("SELECT * FROM users WHERE is_active=1;", function(err, data){
		if(err){
			response.writeHead(500, {"Content-Type": "application/json"})
			response.end(JSON.stringify({message: "Server Error", "status": 500}))
		} 
		response.writeHead(200, {"Content-Type": "application/json"})
		response.end(JSON.stringify(data))
	})
})


//GET ALL DEACTIVATED USERS
app.get(config.root+"/users/deactivated", function(request, response){
	
//Get all active users(JSON)
connection.query("SELECT * FROM users WHERE is_active=0;", function(err, data){
		if(err){
			response.writeHead(500, {"Content-Type": "application/json"})
			response.end(JSON.stringify({message: "Server Error", "status": 500}))
		} 
		response.writeHead(200, {"Content-Type": "application/json"})
		response.end(JSON.stringify(data))
	})
})


//Get a particular user(JSON)
app.get(config.root+"/users/:userId", function(request, response){
	var  userId = request.params.userId
	console.log(typeof userId)

	connection.query("SELECT * from users WHERE id="+userId+" AND is_active=1;", function(err, data){
		if(err){
			response.writeHead(500, {"Content-Type": "application/json"})
			response.end(JSON.stringify({message: "Server Error", "status": 500}))
		} 

		var newUser = {};

		for (let user of data){
			console.log("User: ", user)
			newUser = user
			break
		}
		response.writeHead(200, {"Content-Type": "application/json"})
		response.end(JSON.stringify(newUser))
	})
})

//Rendering update page for updating user details
app.get("/users/update/:userId", function(request, response){
	fs.readFile("./update_user.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end(data)
	})
})

//Rendering page to show deactivated users
app.get("/users/deactivated", function(request, response){
	fs.readFile("./deactivated_users.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end(data)
	})
})

//Rendering Home page to show all users(activated)
app.get("/", function(request, response){
	fs.readFile("./home.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end(data)
	})
})

//Rendering page to create new user
app.get("/register", function(request, response){
	fs.readFile("./post_user.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end(data)
	})
})

//Rendering page for user login
app.get("/login", function(request, response){
	fs.readFile("./login.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end(data)
	})
})


//Rendering page of aboutus
app.get("/about", function(request, response){
	fs.readFile("./about.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end(data)
	})
})

//Rendering page of contact 
app.get("/contact", function(request, response){
	fs.readFile("./contact.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end(data)
	})
})

//Rendering page of services 
app.get("/services", function(request, response){
	fs.readFile("./services.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end(data)
	})
})

//Rendering page to confirm user deactivation 
app.get("/users/delete/:userId", function(request, response){
	fs.readFile("./delete_user.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end(data)
	})
})

// app.use(bodyParser.urlencoded({extended:true}))

// for parsing application/json
app.use(bodyParser.json()); 

//Updating user (JSON) 
app.put(config.root+"/users/:userId", function(request, response){
	var  userId = request.params.userId

	if( !/^\d+$/.test(userId)){
		response.json({"status": 400, "message": "userId should be an integer"})
		return
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
			response.status(200)
			response.json({"status": 200, "message": "Details successfully updated"})
		})
	} else {
		response.status(400)
		response.json({"status": 400, "message": "Could not found data"})
	}	
})

//Deleting users, I am not supposed to delete users just deactivate them(JSON)
app.delete(config.root + "/users/:userId", function(request, response){
	var  userId = request.params.userId

	if( !/^\d+$/.test(userId)){
		response.status(400)
		response.json({"status": 400, "message": "userId should be an integer"})
		return
	}

	var query = "UPDATE users SET is_active=0 WHERE id="+userId+";"
	console.log("Deleting " + userId)
	console.log(query)

	connection.query(query, function(err, result){
		if(err){
			response.status(500);
			console.log(500);
			response.json({"status": 500, "message": "Server Error"});
			return
		} else {
			response.status(200);
			console.log(result);
			response.json({"status": 200, "message": "User successfully deactivated"});
		}
	})
})


//Recovering users(JSON)
app.put(config.root + "/users/recover/:userId", function(request, response){
	var  userId = request.params.userId

	if( !/^\d+$/.test(userId)){
		response.status(400)
		response.json({"status": 400, "message": "userId should be an integer"})
		return
	}

	var query = "UPDATE users SET is_active=1 WHERE id="+userId+";"
	console.log("Recovering " + userId)
	console.log(query)

	connection.query(query, function(err, result){
		if(err){
			response.status(500);
			console.log(500);
			response.json({"status": 500, "message": "Server Error"});
			return
		} else {
			response.status(200);
			console.log(result);
			response.json({"status": 200, "message": "User successfully activated"});
		}
	})
})

//Posting users(JSON)
app.post(config.root+"/users/create", function(request, response){
	var data = request.body
	var totalKeys = Object.keys(data).length
	console.log("GOT", data)
	

	if(data){
		//Query preparation
		//Checking whether email exists or not
		let query = "SELECT email from `users` WHERE email = '" + data["email"] + "'"
		connection.query(query, function(err, result){
			if(err) {
				response.writeHead(500, {"Content-Type": "application/json"})
				response.end(JSON.stringify({message: "Server Error", "status": 500}))
				return
			}

			if(result.length != 0){
				console.log("User is already registered")
				response.status(404)
				response.json({"status": 404, "message": "This email is already registered"})
				return
			} 
			query =  "INSERT INTO users("
			let columns = ""
			let values = "VALUES("

			let i = 1
			for(let key in data){
				if(i === totalKeys){ //If it is last key
					if(typeof key == 'string'){
						columns += key
						values += ("'"+data[key].trim()+"'")
					} else {//number
						values += data[key].trim()	
					}
				} else {//If it is not the last key...even it is not required
					if(typeof key == 'string'){
						columns += key+","
						values += ("'"+data[key].trim()+"',")
					} else {//number
						query += data[key]+"," 
					}
				}
				i += 1
			}
			query += columns + ") " + values + ")"
			console.log("QUERY: ", query)

			//Updating data into users table
			connection.query(query, function(err, result){
				if(err){
					response.writeHead(500, {"Content-Type": "application/json"})
					response.end(JSON.stringify({message: "Server Error", "status": 500}))
					return
				} 
				console.log("Query successfully executed")
				response.status(200)
				response.json({"status": 200, "message": "Account successfully created"})
			})
		})

		
	} else {
		response.status(400)
		response.json({"status": 400, "message": "Could not found data"})
	}	
})


//Login 
app.post(config.root+"/login", function(request, response){
	var data = request.body
	console.log("GOT", data)
	
	if(data){
		//Query preparation
		let query =  "SELECT * FROM users WHERE email='"+data.email+ "' AND password='"+data.password+"';"

		//Updating data into users table
		connection.query(query, function(err, result){
			if(err){
				response.writeHead(500, {"Content-Type": "application/json"})
				response.end(JSON.stringify({message: "Server Error", "status": 500}))
				return
			} 

			console.log(result)
			console.log("Query successfully executed")

			if(result.length == 0){
				console.log("Could not found the user")
				response.status(200)
				response.json({"status": 404, "message": "Please check your email/password"})
			} else {
				console.log("User found")
				response.status(200)
				response.json({"status": 200, "message": "Successfully logged in"})
			}
		})
	} else {
		response.status(400)
		response.json({"status": 400, "message": "Could not found data"})
	}	
})


//Starting Server 
var server = app.listen(port, function(){
	console.log("Server is running " + port)
})