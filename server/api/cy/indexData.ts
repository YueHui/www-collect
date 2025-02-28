import { IdiomModel } from './types'

export default defineEventHandler(async (event) => {
    // 获取查询参数
    const query = getQuery(event)
    const page = Number(query.page) || 1
    const pageSize = Number(query.pageSize) || 50

    // 计算跳过的文档数量
    const skip = (page - 1) * pageSize

    // 并行执行查询总数和分页数据
    const [total, data] = await Promise.all([
        IdiomModel.countDocuments({ frequency: "常用" }),
        IdiomModel.find({ frequency: "常用" })
            .skip(skip)
            .limit(pageSize)
            .exec()
    ])

    if (data) {
        return {
            data,
            pagination: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize)
            }
        }
    } else {
        return {
            data: [],
            pagination: {
                total: 0,
                page,
                pageSize,
                totalPages: 0
            }
        }
    }
})