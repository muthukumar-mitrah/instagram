import upload from 'multer'
import fileUpload from '../schema/fileSchema.js'
import path from 'path'
import { fileURLToPath } from 'url'


const storage = upload.diskStorage({
    destination: (req, file, callback) => {
        console.log('file', file)
        callback(null, 'story')
    },
    filename: (req, file, callback) => {
        console.log('req fileeeeeeees', file)
        callback(null, file.originalname)
    }
})

const file_upload = upload({ storage }).single('files')

const uploadFileFunc = async (req, res) => {
    console.log('first')
    try {
        file_upload(req, res, async (err) => {
            console.log('req++++++++', req.file)
            if(err) {
                console.log('err fileeeeeee++++++++', err)
                res.send({ error: err.message })
            } else {
                if(!req.file) {
                    const file = new fileUpload({ ...req.body })
                    console.log('file333333333333333333', file)
                    const uploadFile = await file.save()
                    console.log('uploadFile', uploadFile)
                    res.json(uploadFile)
                }
                else {
                    console.log('kasjfkjaskdfjskajd')
                    res.status(400).send('something went wrong')
                }
            }
        })

    } catch(error) {
        res.status(500).send({ error })
    }
}

const getFileFunc = async (req, res, next) => {
    try {
        const files = await fileUpload.find()
        res.json(files)
    } catch(error) {
        res.status(500).json({ error: 'server unreachable' })
    }
}

const downloadfileFunc = async (req, res, next) => {
    const { id } = req.params
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const projectRoot = path.resolve(__dirname, '..'); // Go up one level from the current module
        console.log(projectRoot);
        console.log('root_path', projectRoot)
        const file = await fileUpload.findOne({ _id: id })
        console.log('file', file)
        if(file) {
            console.log('first')
            const d = path.join(projectRoot, 'story\\devv.jpg')
            console.log('d', d)
            res.send(file.path)
        } else {
            res.json({ error: 'something wrong' })
        }

    } catch(error) {
        console.log('error', error)
        res.status(500).send({ error })
    }
}



export { uploadFileFunc, getFileFunc, downloadfileFunc }