import {IdiomModel} from './types'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    if(!body.searchText) return [];

    const cys = await IdiomModel.find({
        "name": { $regex: `^${body.searchText}`, $options: "i" }
    },'_id name')
        .skip(0)   // 跳过前面的文档
        .limit(10) // 限制返回的文档数量
        .exec();

    if (cys) {
        return cys
    } else {
        return []
    }
})