import express from 'express'
import cors from 'cors'
import mongoDB from './database/mongoDb.js'
import router from './router.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(cors())  // fix cross origin issues
app.use(express.json())         // body parser
app.use(express.urlencoded({ extended: true }))
app.use('/story', express.static(__dirname + '/'))
app.use(express.static(path.join(__dirname, '/')));

app.use('/', router)      // connect routes

mongoDB()    // connect mongo db.

app.listen(7000, async () => {
    console.log("port number 7000")
})



