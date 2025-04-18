import express from "express"
import bootstrap from "./src/app.controller.js"
 import * as dotenv from "dotenv"
 import path from "node:path"



dotenv.config({path:path.join("./src/config/.env.prod")})
const app=express()
if (!process.env.PORT) {
    throw new Error("Environment variable PORT is not defined.");
}

const port=process.env.PORT ||8000
bootstrap(app,express)
app.listen(port,()=>{console.log(`the server is running in ${port}`);})
