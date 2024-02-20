import mongoose from 'mongoose'

const upload = mongoose.Schema({
    fieldname: { type: String },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    destination: { type: String },
    filename: { type: String },
    uri: { type: String }
})

const fileSchema = mongoose.Schema({
    fileName: { type: String },
    fileSize: { type: Number },
    height: { type: Number },
    originalPath: {},
    type: { type: String },
    uri: { type: String },
    width: { type: Number }
})

const fileUpload = mongoose.model('story', fileSchema)

export default fileUpload