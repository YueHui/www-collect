<template>
    <Breadcrumb />

    <div class="p-6 rounded-lg shadow-lg bg-white mb-6 leading-7">
        古代汉语词汇中特有的一种长期相沿用的固定短语，来自于古代经典或著作、历史故事和人们的口头故事。 <br>
        成语的意思精辟，往往隐含于字面意义之中，不是其构成成分意义的简单相加。<br>
        它结构紧密，一般不能任意变动词序，抽换或增减其中的成分。<br>
        其形式以四字居多，也有一些三字和多字的，大多由四字组成。简单的说，成语就是，说出来大家都知道，可以引经据典，有明确出处和典故，并且使用程度相当高的用语。
    </div>

    <div class="flex flex-row">
        <div class="grid grid-cols-5 max-md:grid-cols-2 gap-2 leading-6 flex-grow">
            <NuxtLink 
                v-for="item in items" 
                :key="item._id" 
                :to="`cy/${item._id}`"
            >
                {{ item.name }}
            </NuxtLink>
        </div>
    </div>

    <Pagination 
        v-model="currentPage"
        :total-pages="totalPages"
    />
</template>

<script setup>
const currentPage = ref(1)
const pageSize = ref(50)

// SEO 配置
useHeadSafe({
    title: '成语大全_成语词典_成语解释大全 - 聚全网',
    meta: [
        {
            name: 'keywords',
            content: '成语大全,成语词典,成语解释,成语故事,成语出处,近义词,反义词,在线查询'
        },
        {
            name: 'description',
            content: '成语大全提供海量成语查询服务，包括成语的意思、读音、近义词、反义词、成语故事和出处。帮助您轻松学习和理解中国传统文化中的成语知识。'
        }
    ]
})

const { data: response } = await useFetch(`/api/cy/indexData`, {
    query: {
        page: currentPage,
        pageSize: pageSize
    }
})

// 监听页码变化，重新获取数据
watch(currentPage, async (newPage) => {
    await refreshNuxtData()
})

const items = computed(() => response.value?.data || [])
const totalPages = computed(() => response.value?.pagination?.totalPages || 0)
</script>

<style scoped>
.topbanner{text-align: left;}
a{display: inline-block; padding: 10px;}
</style>