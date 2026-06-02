import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"

import dotenv from "dotenv"

dotenv.config()

// create a ratelimiter that allows 100 requests per 60 seconds
const ratelimit = new Ratelimit({
    // configure the redis client
    redis: Redis.fromEnv(),

    // limit each ip to 100 requests per 60 seconds
    limiter: Ratelimit.slidingWindow(100, "60 s")
})

export default ratelimit;