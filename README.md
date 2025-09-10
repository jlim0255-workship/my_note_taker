# my_note_taker

A basic MERN stack project
Link: https://www.youtube.com/watch?v=F9gB5b4jgOI 

Overview:
The web app support CRUD (Create, Retrieve, Update, Delete) operations on note. Although we have a better way taking notes through different tools (smartphones mostly), this project serves as a introduction to full stack development, where they don't include or teach in my academic years (until Q3 2025). Takes about 4 days to complete, but will revise the methods, the patterns implemented here when doing future projects.

First deployed app!
I used the free version package from render.com. 
if the site gets inactive in 15 minutes, the server goes down, and the next visit takes some time :(

Tech stack:
MERN:
    (MongoDB, Express, React, Node)

Other packages and lib resources:
    -react-hot-toast: for cool toast effect
    -upstash/redis : for rate limiting
    -react lucide: ready UI
    -mongoose: for database schema
    -axios/express: for backend requests
    -postman: external tool for backend testing
    -render: free web app hoisting and deployment

Conclusion:
A bit exhaustive for my first web app done and deployed in such short time, try to make it better in the future!
Its a break through for me, # no more local host

Contribution Backlog:

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

Frontend: 1:51:27

-D2 End: 2: 03: 37 -> Homepage front end -> 11:40 pm

-D3 Start
Homepage
CORS thing: 2:13
front end getting stuff from back end

Stop at create page 2:32:15
Day 3 log out 11:25pm

Day 4 start: 2:22pm last dev commit