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
