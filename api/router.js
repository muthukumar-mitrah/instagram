import express from 'express'
import { deleteStory, getAllStories, uploadStory } from './controllers/storyController.js'
import multer from 'multer'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('instagram api is running success!!')
})

const destFn = (file, callback) => {
  if(file.fieldname === 'media') {
    callback(null, 'uploads/audios');
  }
  if(file.fieldname === 'file') {
    callback(null, 'uploads/images');
  }
  return
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    destFn(file, cb)
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },

});

const uploadd = multer({ storage: storage })

const cpUpload = uploadd.fields([
  { name: 'media', maxCount: 1 },
  { name: 'file', maxCount: 1 },
]);

router.post('/uploadStory', cpUpload, uploadStory)

router.get('/stories', getAllStories)

router.delete('/delete/:id', deleteStory)

export default router