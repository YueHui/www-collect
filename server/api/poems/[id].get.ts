import { PoemModel } from './types'

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params.id
        
        // 并行查询当前诗词和上下篇诗词
        const [poem, prevPoem, nextPoem] = await Promise.all([
            // 当前诗词
            PoemModel.findById(id),
            // 上一篇：查找 _id 小于当前 id 的第一篇
            PoemModel.findOne({ _id: { $lt: id } })
                .sort({ _id: -1 })
                .select('_id title'),
            // 下一篇：查找 _id 大于当前 id 的第一篇
            PoemModel.findOne({ _id: { $gt: id } })
                .sort({ _id: 1 })
                .select('_id title')
        ])
        
        // 如果没找到诗词
        if (!poem) {
            throw createError({
                statusCode: 404,
                message: '未找到该诗词'
            })
        }

        return {
            poem,
            prevPoem,
            nextPoem
        }
    } catch (err) {
        console.error('获取诗词详情失败:', err)
        
        // 如果是无效的 ID 格式
        if (err.name === 'CastError') {
            throw createError({
                statusCode: 400,
                message: '无效的诗词ID'
            })
        }

        throw createError({
            statusCode: 500,
            message: '服务器内部错误'
        })
    }
}) 