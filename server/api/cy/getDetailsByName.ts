import {IdiomModel} from './types'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const data = await IdiomModel.find({
        name: {$in: body || []}
    },{
        name:1, customId:1,
    })
    return data || []
})