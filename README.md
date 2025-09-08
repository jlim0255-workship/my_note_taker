# my_note_taker

A basic MERN stack project
Link: https://www.youtube.com/watch?v=F9gB5b4jgOI 

D1: 11:32pm log out -> 13:23

D2: 9:34am
Introduced the REST API
- Get: get a post
- Post: create a post
- Put: update a post
- Delete: delete a post


- Nodemon: so we don't have to update the get request manually: get the latest output without killing the terminal (just update local host)

- Endpoint (the app.post/get/put/delete, followed with the URL)
- a combination of URL + HTTP method that lets 
- the client interact with a specific resource

-REMEMBER TO ADD ".js" in tjhe import statement

- Middleware
Function that runs in the middle between the request and the response (ex: user auth, rate limiting)

- Rate Limiting 1:32:23
Is a way to control how often someone can do something on a website or app:

- how many times they can refresh a page, 
- make a request to an API, 
- or try to login (to prevent overloading the server)

- Status code: 429 too many requests