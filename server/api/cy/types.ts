import mongoose from "mongoose"

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Idiom = new Schema({
    id: ObjectId,
    name: String,
    emotion: String,
    frequency: String,
    pinyin: String,
    jbsy: String,
    xxsy: String,
    chuchu: String,
    liju: String,
    jyc: String,
    fyc: String,
});

export const IdiomModel = mongoose.model('Idiom', Idiom);

const Story = new Schema({
    id: ObjectId,
    name: String,
    content: String,
});

export const StoryModel = mongoose.model('Story', Story);