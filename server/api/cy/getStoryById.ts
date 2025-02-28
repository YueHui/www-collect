import {StoryModel} from './types'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const story = await StoryModel.findOne({_id: body.id});

    const next = await StoryModel.findOne({_id: {$gt: story?._id}}).sort({_id:1});
    const prev = await StoryModel.findOne({_id: {$lt: story?._id}}).sort({_id:-1});
    return {story, next, prev}
})