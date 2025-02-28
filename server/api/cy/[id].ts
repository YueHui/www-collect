import { IdiomModel, StoryModel } from './types'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    
    try {
        // 并行查询成语和故事数据
        const [idiom, story] = await Promise.all([
            IdiomModel.findOne({ _id: id }),
            IdiomModel.findOne({ _id: id })
                .then(doc => doc && StoryModel.findOne({ name: doc.name }))
        ])

        if (idiom) {
            return {
                ...idiom.toObject(),
                story: story ? story.toObject() : null
            }
        } else {
            return {}
        }
    } catch (error) {
        console.error('Error fetching idiom data:', error)
        return {}
    }
})