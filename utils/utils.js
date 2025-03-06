// 处理诗词内容换行
export function formatPoemContent(content){
    if (!content) return []
    let splitArray = content.split(/([。；）)？])/);
    // 按句号、分号和右括号分割，但保留这些符号
    return splitArray.reduce((acc, curr, index, array) => {
        if(acc.length>0 && curr.indexOf('(')>-1 ){
            acc[acc.length - 1] += curr
        } else if (curr === '。' || curr === '；' || curr === '）' || curr === ')' || curr === '？') {
            if (acc.length > 0) {
                acc[acc.length - 1] += curr
            }
        }else if(acc.length>0 && acc[acc.length-1].endsWith('；') && acc[acc.length-1].indexOf('(')>-1){
            acc[acc.length - 1] += curr
        }else if (curr.trim()) {
            // 不是特殊符号且不是空字符串，作为新行添加
            acc.push(curr)
        }
        return acc
    }, []).map(line => line.trim())
}