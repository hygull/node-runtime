module.exports = {
	usingWebNow: true,

	webConfig: {
				protocol: "https",
				host: "jsonplaceholder.typicode.com",
			},
	localhostConfig: {
				protocol: "http",
				host: "127.0.0.1",
				port: "8080"
			},

	endpoints: {
		"GET": {
			//route, message related to REST API response
			/*	POSTS */
			"POSTS": [
				["/posts", "GETTING LIST OF ALL POSTS - status is 200"],
				["/posts/1", "GETTING A POST WITH ID 1 - status is 200"],
			],
			/* COMMENTS */
			"COMMENTS": [
				["/comments", "GETTING LIST OF ALL COMMENTS - status is 200"],
				["/comments/5", "GETTING A COMMENT WITH ID 5 - status is 200"],
			],

			/* ALBUMS */
			"ALBUMS": [
				["/albums", "GETTING LIST OF ALL ALBUMS - status is 200"],
				["/albums/4", "GETTING A ALBUM WITH ID 4 - status is 200"]
			],

			/* PHOTOS */
			"PHOTOS": [
				["/photos", "GETTING LIST OF ALL PHOTOS - status is 200"],
				["/photos/7", "GETTING A PHOTO WITH ID 7 - status is 200"]
			],

			/* TODOS */
			"TODOS": [
				["/todos", "GETTING LIST OF ALL TODOS - status is 200"],
				["/todos/9", "GETTING A TODO WITH ID 9 - status is 200"]
			],

			/* USERS */
			"USERS": [
				["/users", "GETTING LIST OF ALL USERS - status is 200"],
				["/users/10", "GETTING A USER WITH ID 10 - status is 200"]
			]
		},

		"POST": {

		},

		"PUT": {

		},

		"DELETE": {

		}
	}
}