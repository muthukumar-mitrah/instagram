import mongoose from 'mongoose'

mongoose.set('strictQuery', true)  // this is optional

const mongoDB = () => mongoose.connect("mongodb://localhost:27017/instagram")

export default mongoDB