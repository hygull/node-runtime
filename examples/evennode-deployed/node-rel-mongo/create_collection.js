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