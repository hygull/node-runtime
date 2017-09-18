const assert = require("chai").assert;

const app = require("../app")

var messages = ["Hello coders", "Hello programmers"]

for(var message of messages)
	describe("Hello App", function(){
		it("It should return 'Hello coders'", function(){
			assert.equal(app(), message)
		})
	})
