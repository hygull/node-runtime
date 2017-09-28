/*
	{
		"date_of_creation": "27 Sept. 2017",
		"aim": "Rest Api Unit Testing"
	}
*/

var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var assert = require("chai").assert;
var util = require("util");

function genericTester(){
	var config = require("./config/config.js")
	var baseUrl = ""

	if(config.usingWebNow) {
		baseUrl += config.webConfig.protocol + "://" + config.webConfig.host
	} else {
		baseUrl += config.localhostConfig.protocol + "://" + config.localhostConfig.host + ":" +config.localhostConfig.port
	}

	describe("TESTING RESTFUL APIS:-", function(){
		for(method in config.endpoints) {
			if(method == "GET"){
				let configGetObj = config.endpoints[method]

				for(let describeMessage in configGetObj){
					describe(describeMessage, function(){
						let configArr = configGetObj[describeMessage]
						for(let arr of configArr){
							let endpoint = arr[0] //endpoint
							let message = arr[1] //message for it

							it(message, function(done){
								//Making REST API call(GET) to fetch posts
						 		request.get({url: baseUrl + endpoint }, function(error, response, body){
						 			expect(response.statusCode).to.equal(200);	
						 		})

						 		done();
							})
						}
					})
				}
			} 
		}
	})	
}

genericTester()


