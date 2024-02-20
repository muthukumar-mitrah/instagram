import express from 'express'
import { downloadfileFunc, getFileFunc, uploadFileFunc } from './controllers/fileController.js'

const router = express.Router()

router.get('/', (req, res, next) => {
    res.send('success')
})

router.post('/story', uploadFileFunc)

router.get('/get_story', getFileFunc)

router.get('/download_story/:id', downloadfileFunc)



export default router