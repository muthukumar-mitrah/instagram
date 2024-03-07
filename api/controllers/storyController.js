import Story from '../schema/storySchema.js'

const uploadStory = async (req, res) => {
    const { userId, photoUrl, musicUrl, text } = req.body;

    console.log('req.body', req.body)
    try {
        const newStory = new Story({ userId, photoUrl, musicUrl, text });
        await newStory.save();
        res.status(201).json({ message: 'Story uploaded successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllStories = async (req, res, next) => {
    try {
        const stories = await Story.find()
        res.json(stories);
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteStory = async (req, res, next) => {
    try {
        await Story.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json('User deleted successfully!')
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



export { uploadStory, getAllStories, deleteStory }