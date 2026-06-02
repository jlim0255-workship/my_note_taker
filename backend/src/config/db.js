import mongoose from "mongoose"


export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECTED SUCCESSFULLY!")

    } catch (error) {
        console.error("Error connecting to MongoDB", error)
        process.exit(1) // exit(1): exit with failure, 0 mean success

    }
}

import {neon} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const {PGHOST, PGUSER, PGPASSWORD, PGDATABASE} = process.env;

// creates a sql connection using env variables
export const sql = neon(
    `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)

// this sql function we export is used as a tagged template literal, which allow us to write sql queries safely