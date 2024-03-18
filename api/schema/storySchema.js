import mongoose from 'mongoose'

const storySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    photoUrl: { type: String, required: false },
    musicUrl: { type: String, required: false },
    text: { type: String, required: false },
    time: { type: Date, default: Date.now },
    timestamp: { type: Date, default: new Date().setDate(new Date().getDate() + 1) },
    path: { type: String, required: false }
});

const Story = mongoose.model('MyStory', storySchema)

export default Story;
