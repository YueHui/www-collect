import { defineEventHandler, getQuery } from 'h3'
import { PoemModel } from './types'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const category = query.category as string || ''
    const search = query.search as string || ''
    const pageSize = 12

    try {
        // 构建查询条件
        const conditions: any = {}
        
        // 添加分类条件
        if (category) {
            conditions.category = category
        }
        
        // 添加搜索条件
        if (search) {
            conditions.$or = [
                { title: new RegExp(search, 'i') },
                { author: new RegExp(search, 'i') },
                { content: new RegExp(search, 'i') }
            ]
        }

        // 计算跳过的文档数量
        const skip = (page - 1) * pageSize

        // 并行执行查询总数和分页数据
        const [total, items] = await Promise.all([
            PoemModel.countDocuments(conditions),
            PoemModel.find(conditions)
                .skip(skip)
                .limit(pageSize)
                .sort({ createdAt: -1 })
                .exec()
        ])

        return {
            items,
            total,
            totalPages: Math.ceil(total / pageSize)
        }
    } catch (error) {
        console.error('获取诗词列表失败:', error)
        throw createError({
            statusCode: 500,
            message: '获取诗词列表失败'
        })
    }
})