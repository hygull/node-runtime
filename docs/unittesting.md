# Mocha - testing framework

Visit [official webiste](https://mochajs.org/)

# Chai - insertion library

Visit [official webiste](http://chaijs.com/)

**Chai** is optional, as node.js has assertion library by default

visit [here](http://chaijs.com/api/assert/) to check **Chai Assertion library**

# How to do

*	Create any folder named **test1**

*	cd test1

*	npm init 

Give simple description, author name etc, specify app.js as root, then accept defaults

*	npm install mocha chai --save-dev

*	Create app.js

*	Create test directory(by default mocha is gonna look for directory called test)

*	Create test/appTesting.js

```javascript
/* app.js */

module.exports = function(){
	return "Hello coders"
}
```


```javascript
/* test/appTesting.js */

const assert = require("chai").assert;

const app = require("../app")

describe("Hello App", function(){
	it("It should return 'Hello coders'", function(){
		assert.equal(app(), "Hello coders")
	})
})
```


* Finally run **npm run test** from test1 folder

```typescript
MacBook-Pro-2:test1 admin$ npm run test

> test1@1.0.0 test /Users/admin/projects/Node/node-runtime/unittest/mocha/test1
> Mocha



  Hello App
    ✓ It should return 'Hello coders'


  1 passing (6ms)

MacBook-Pro-2:test1 admin$ 
```