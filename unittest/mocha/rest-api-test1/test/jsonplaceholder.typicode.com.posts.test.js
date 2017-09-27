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

var baseUrl = "https://jsonplaceholder.typicode.com";

/*
		TESTING - GETTING ALL POSTS
		METHOD  - GET
*/
describe("TESTING - GETTING ALL POSTS", function(){

	//To check the response status
	it("Response status is 200", function(done){
		//Making REST API call(GET) to fetch posts
 		request.get({url: baseUrl + "/posts" }, function(error, response, body){
 			expect(response.statusCode).to.equal(200);
 			
 			//console.log(response.statusCode);

 			//console.log(body);
 			/*
 				"[
 					{...}, 
 					{...}, 
 					{...}, 
 					{...}, 
 					{...}
 				]"
 			*/

 			//console.log(typeof body);
 			/*
				string
 			*/

 			//var posts = JSON.parse(body);
 			//console.log(typeof posts);
 			/*
				object
 			*/

 			//console.log(posts[0]);

 			done();
 		})
	})	

	//To check whether the responsed object is an array or not
	it("Responsed object is an array", function(done){
		//Making REST API call(GET) to fetch posts
 		request.get({url: baseUrl + "/posts" }, function(error, response, body){

 			var posts = JSON.parse(body);

 			assert.typeOf(posts, "array")

 			done();
 		})
	})	

	//To check whether the responsed object exactly contains 4 properties
	it("Responsed array's object exactly contains 4 properties", function(done){
		//Making REST API call(GET) to fetch posts
 		request.get({url: baseUrl + "/posts" }, function(error, response, body){
 			var posts = JSON.parse(body);
 			var len = Object.keys(posts[0]).length 
 			assert.equal(len, 4)
 			done();
 		})
	})	


	//To check whether the object contains all the keys => userId, id, title, body
	it("Responsed array's object contains all the keys", function(done){
		//Making REST API call(GET) to fetch posts
 		request.get({url: baseUrl + "/posts" }, function(error, response, body){
 			var posts = JSON.parse(body);
 			assert.containsAllKeys(posts[0], ["userId", "id", "title", "body"])
 			done();
 		})
	})	
})

/*

rle509@rle509:~/projects/NodeJS/repos/node-runtime/unittest/mocha/rest-api-test1$ npm run test

> rest-api-test1@1.0.0 test /home/rle509/projects/NodeJS/repos/node-runtime/unittest/mocha/rest-api-test1
> mocha



  TESTING - GETTING ALL POSTS
    ✓ Response status is 200 (1161ms)
    ✓ Responsed object is an array (755ms)
    ✓ Responsed array's object exactly contains 4 properties (775ms)
    ✓ Responsed array's object contains all the keys (679ms)


  4 passing (3s)


*/
