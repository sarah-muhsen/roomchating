import express from "express"
import bootstrap from "./src/app.controller.js"
 import * as dotenv from "dotenv"
 import path from "node:path"

import { runIO } from "./src/modules/socket/socket.controller.js"
dotenv.config({path:path.join("./src/config/.env.dev")})
const app=express()
if (!process.env.PORT) {
    throw new Error("Environment variable PORT is not defined.");
}
bootstrap(app,express)
const port=process.env.PORT ||3000
const httpserver=app.listen(port,()=>{console.log(`the server is running in ${port}`);})

runIO(httpserver)

