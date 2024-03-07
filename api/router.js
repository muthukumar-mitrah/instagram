import express from 'express'
import { deleteStory, getAllStories, uploadStory } from './controllers/storyController.js'
import multer from 'multer'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('success')
})  

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log('file', file)
    callback(null, 'uploads')
  },
  filename: (req, file, callback) => {
    console.log('req fileeeeeeees', file)
    callback(null, file.originalname)
  }
})

router.post('/uploadStory', multer({ storage }).single('media'), uploadStory)

router.get('/stories', getAllStories)

router.get('/delete/:id', deleteStory)

export default router