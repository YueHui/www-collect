import mongoose from 'mongoose'

const poemSchema = new mongoose.Schema({
    title: String,
    author: String,
    dynasty: String,
    content: String,
    category: String,
    translation: String,
    annotation: String,
    appreciation: String,
    tags: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

export const PoemModel = mongoose.model('Poem', poemSchema) 