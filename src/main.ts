import http from 'http'
import app from './app'
import MongoDBConnect from './db/mongodb_connect'
import dotenv from 'dotenv'
import initializeSocket from './lib/utils/socketServer'
dotenv.config()

export const server: http.Server = http.createServer(app)

const port = process.env.PORT || 5550;

console.log(process.env.NODE_ENV)

server.listen(port, async () => {
    await MongoDBConnect()    
    console.log(`Example app listening at http://localhost:${port}`)
})

initializeSocket(server)