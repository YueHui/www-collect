import {IdiomModel} from './types'

export default defineEventHandler(async (event) => {
    const pageSize = 100, current:any = getQuery(event).current || 1;
    const skip = (current - 1) * pageSize;
    const limit = pageSize;

    const cys = await IdiomModel.find()
        .skip(skip)   // 跳过前面的文档
        .limit(limit) // 限制返回的文档数量
        .exec();

    const total = await IdiomModel.countDocuments();

    if (cys) {
        return {
            list: cys,
            total,
            pageSize,
            current,
        }
    } else {
        return {}
    }
})