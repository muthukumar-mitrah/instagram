import mongoose from 'mongoose'

const connectionString = "mongodb+srv://rmuthukumar48:JDptKYxhoHIMClOA@instagram-api.r1rbrzx.mongodb.net/?retryWrites=true&w=majority&appName=instagram-api"

mongoose.set('strictQuery', true)  // this is optional


const mongoDB = () => mongoose.connect(connectionString)

export default mongoDB