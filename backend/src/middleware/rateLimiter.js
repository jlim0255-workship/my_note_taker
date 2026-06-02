import ratelimit from "../config/upstash.js"

// rate limiter middleware is to limit the number of requests from a user in a given time frame
// to prevent abuse and overloading the server
// we can use upstash redis to store the request count for each user
const rateLimiter = async (req, res, next) => {

    try{
        // we can limit based on per user id / ip address
        const {success} = await ratelimit.limit("my-limit-key")

        if (!success) {
            return res.status(429).json({
                message:"Too many requests, please try again later"
            })
        }

        next() // allow the request to proceed

    }catch(error){
        console.log("Rate limit error", error)
        next(error)

    }

}

export default rateLimiter