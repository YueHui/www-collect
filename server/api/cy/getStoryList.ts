import {StoryModel} from './types'

export default defineEventHandler(async (event) => {

    const data = await StoryModel.find({}).exec();

    if (data) {
        return data
    } else {
        return {}
    }
})