/*
	{
		"created_on": "30 September 2017",
		"updated_at"" "1 October 2017",
		"aim": "To create  a node server to serve the requests of users"
		"coded_by": "Rishikesh Agrawani"
	}
*/

var fs = require("fs")
var users = require("./data.js").users
var express = require("express")
var app = express()
var bodyParser = require("body-parser")

var config = JSON.parse(process.env.APP_CONFIG)
var MongoClient = require("mongodb").MongoClient
var ObjectId = require("mongodb").ObjectID
var mongoDbPassword = "rishikesh321"


// for parsing application/json
app.use(bodyParser.json()); 

//Rendering home page
app.get("/", function(request, response){
	fs.readFile("./home.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end(data)
	})
})

//Rendering update page for updating user details
app.get("/users/update", function(request, response){
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
app.get("/users/delete", function(request, response){
	fs.readFile("./delete_user.html", function(err, data){
		response.writeHead(200, {"Content-Type": "text/html"})
		response.end(data)
	})
})

app.get("/api/users/", function(request, response){
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
						db.collection("users").find({is_active: true}).toArray(function(err, result){
							if(err){
								fs.readFile("./error.html", function(err, data){
									response.writeHead(200, {"Content-Type": "text/html"})
									response.end(data + "" +err)
								})
							} else {								
									response.status(200)
									response.json(result)								
							}

							db.close()
						})
					} catch(err) {
						response.writeHead(200, {"Content-Type": "text/html"})
						response.end("" + err)
					}
				}	
			})
})

//Get a particular user(JSON)
app.get("/api/users/:userId", function(request, response){
	var  userId = request.params.userId
	console.log(typeof userId, userId)

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
				db.collection("users").find({_id: ObjectId(userId.trim())}).toArray(function(err, result){
					if(err) {
						//Rendering Error page while database connection problem
						fs.readFile("./error.html", function(err, data){
							response.writeHead(200, {"Content-Type": "text/html"})
							response.end(data)
						})
					} else {
						response.status(200)
						// console.log("Fetched user", result)

						if(result.length != 0)
						{	
							console.log("User found", result)
							response.json(result[0])
						}
						else{
							console.log("Could not found user")
							response.json({status: 400, message: "Could not found this user"})
						}
					}
				})
			}
	})
})

//Updating user (JSON) 
app.put("/api/users/", function(request, response){
	var data = request.body
	// console.log("GOT UPDATE DATA AS", data)
	try{
		if(data){
			var searchObj = { _id: ObjectId(data._id) };
			var updateData = data.update_data;

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
							db.collection("users").updateOne(searchObj, updateData, function(err, result){
								if(err){
									//Rendering Error page while database connection problem
									fs.readFile("./error.html", function(err, data){
										response.writeHead(200, {"Content-Type": "text/html"})
										response.end(data)
									})
								} else {
									response.status(200)
									response.json({"status": 400, message: "Successfully updated user" })
								}
								db.close()
							})
						} catch(err) {
							//Rendering Error page while database connection problem
							fs.readFile("./error.html", function(err, data){
								response.writeHead(200, {"Content-Type": "text/html"})
								response.end(data)
							})
						}
					}
				})

		} else {
			response.status(400)
			response.json({"status": 400, "message": "Could not found data"})
		}	
	} catch(err) {
		//Rendering Error page while database connection problem
		fs.readFile("./error.html", function(err, data){
			response.writeHead(200, {"Content-Type": "text/html"})
			response.end(data)
		})
	}
})


//Posting users(JSON)
app.post("/api/users/create", function(request, response){
	var data = request.body

	console.log("GOT(REGISTER)", data)	

	if(data){
		//Checking whether email exists or not
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
								db.collection("users").find({email: data.email}).toArray(function(err, result){
								if(err) {
									//Rendering Error page while database connection problem
									fs.readFile("./error.html", function(err, data){
										response.writeHead(200, {"Content-Type": "text/html"})
										response.end(data)
									})
								} else {
									response.status(200)
									// console.log("Fetched user", result)

									if(result.length != 0)
									{	
										console.log("User found(Register operation)", result)
										response.status(400)
										response.json({"status": 400, "message": "This email is already registered"})
									}
									else{
										//Save user
										db.collection("users").insertOne(data, function(err, result){
											if(err)
											{
												//Rendering Error page while database connection problem
												fs.readFile("./error.html", function(err, data){
													response.writeHead(200, {"Content-Type": "text/html"})
													response.end(data)
												})	
											} else{
												response.status(200)
												response.json({"status": 200, "message": "Successfully created new user"})				
											}
											db.close()
										})
									}
								}
							})
						} catch(err) {
							//Rendering Error page while database connection problem
							fs.readFile("./error.html", function(err, data){
								response.writeHead(200, {"Content-Type": "text/html"})
								response.end(data)
							})
						}
					}
				})
		
	} else {
		response.status(400)
		response.json({"status": 400, "message": "Could not found data"})
	}	
})


//GET ALL DEACTIVATED USERS
app.get("/api/users/deactivated/all", function(request, response){
	console.log("Request for deactivated users")

	MongoClient.connect("mongodb://" + config.mongo.user + ":" + mongoDbPassword + "@" + config.mongo.hostString,
				function(err, db){
					if(err){
						//Rendering Error page while database connection problem
						fs.readFile("./error.html", function(err, data){
							response.writeHead(200, {"Content-Type": "text/html"})
							response.end(data)
						})
					} else {
						//Get all active users(JSON)
						db.collection("users").find({is_active: false}).toArray(function(err, result){
							if(err){
								response.writeHead(500, {"Content-Type": "application/json"})
								response.end(JSON.stringify({message: "Server Error", "status": 500}))
							}  else {
								console.log("LIST", result)
								response.writeHead(200, {"Content-Type": "application/json"})
								response.end(JSON.stringify(result))
							}
						})
					}
				})
})

//Deleting users, I am not supposed to delete users just deactivate them(JSON)
app.delete("/api/users/", function(request, response){
	var data = request.body;
	var searchObj = { _id: ObjectId(data._id) };
	var updateData = { $set: data.update_data};

	console.log("DEACTIVATION ", data)

	if(data){
		MongoClient.connect("mongodb://" + config.mongo.user + ":" + mongoDbPassword + "@" + config.mongo.hostString,
					function(err, db){
						if(err){
							//Rendering Error page while database connection problem
							fs.readFile("./error.html", function(err, data){
								response.writeHead(200, {"Content-Type": "text/html"})
								response.end(data)
							})
						} else {
							db.collection("users").updateOne(searchObj, updateData, function(err, result){
								if(err) {
									response.status(400)
									response.json({message: "Server Error", status: 400})
								} else {
									response.status(200)
									response.json({message: "Successfully deactivated the user", status: 200})
								}
							})
						}
					})
	} else {
		//Rendering Error page while database connection problem
		fs.readFile("./error.html", function(err, data){
			response.writeHead(200, {"Content-Type": "text/html"})
			response.end(data)
		})
	}
})

//Recovering users(JSON)
app.put( "/api/users/recover/one", function(request, response){
	var data = request.body;
	var searchObj = { _id: ObjectId(data._id) };
	var updateData = { $set: data.update_data};

	console.log("ACTIVATION ", data)

	if(data){
		MongoClient.connect("mongodb://" + config.mongo.user + ":" + mongoDbPassword + "@" + config.mongo.hostString,
					function(err, db){
						if(err){
							//Rendering Error page while database connection problem
							fs.readFile("./error.html", function(err, data){
								response.writeHead(200, {"Content-Type": "text/html"})
								response.end(data)
							})
						} else {
							db.collection("users").updateOne(searchObj, updateData, function(err, result){
								if(err) {
									response.status(400)
									response.json({message: "Server Error", status: 400})
								} else {
									response.status(200)
									response.json({message: "Successfully activated the user", status: 200})
								}
							})
						}
					})
	} else {
		//Rendering Error page while database connection problem
		fs.readFile("./error.html", function(err, data){
			response.writeHead(200, {"Content-Type": "text/html"})
			response.end(data)
		})
	}
})

//To drop and create new collection
app.get("/create/collection/", function(request, response){
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
						db.dropCollection("users", function(err, delOk){
							if(err){
								fs.readFile("./error.html", function(err, data){
									response.writeHead(200, {"Content-Type": "text/html"})
									response.end(data)
									return
								})
							}
							console.log("Droped collection")
							db.close()
						})
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
							db.close()
						})
					} catch(err) {
						response.writeHead(200, {"Content-Type": "text/html"})
						response.end("" + err)
					}
				}	
			})
})

try{
	app.listen(process.env.PORT )
} catch(err) {
	response.writeHead(200, {"Content-Type": "text/html"})
	response.end("" + err)
}
