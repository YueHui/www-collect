<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- 搜索区域 -->
        <div class="flex gap-4 mb-8">
            <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="搜索古诗词、作者、诗句..." 
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                @keyup.enter="handleSearch"
            >
            <button 
                @click="handleSearch" 
                class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
                搜索
            </button>
        </div>

        <!-- 分类标签 -->
        <div class="flex flex-wrap gap-3 mb-8">
            <span 
                v-for="tag in categories" 
                :key="tag"
                :class="[
                    'px-4 py-2 rounded-full cursor-pointer transition-colors',
                    selectedCategory === tag 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
                @click="selectCategory(tag)"
            >
                {{ tag }}
            </span>
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="bg-red-50 text-red-700 p-4 rounded-lg mb-8 text-center">
            {{ error }}
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-12">
            <div class="w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
            <p class="mt-4 text-gray-600">加载中...</p>
        </div>

        <!-- 诗词列表 -->
        <div v-else class="space-y-6">
            <div v-if="poems.length === 0" class="text-center py-12 text-gray-600">
                暂无相关诗词
            </div>
            <div v-else v-for="poem in poems" :key="poem._id" 
                class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                <NuxtLink :to="`/poems/${poem._id}`" class="block">
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ poem.title }}</h3>
                    <p class="text-sm text-gray-600 mb-4">{{ poem.dynasty }} · {{ poem.author }}</p>
                    
                    <!-- 诗词内容 -->
                    <div class="space-y-2 mb-4">
                        <p v-for="(line, index) in formatPoemContent(poem.content)" :key="index" class="text-gray-700 leading-relaxed">
                            {{ line }}
                        </p>
                    </div>

                    <!-- 标签 -->
                    <div v-if="poem.tags && poem.tags.length" class="flex flex-wrap gap-2">
                        <span v-for="tag in poem.tags.slice(0, 2)" :key="tag" class="px-2 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                            {{ tag }}
                        </span>
                    </div>
                </NuxtLink>
            </div>
        </div>

        <!-- 分页 -->
        <Pagination 
            v-if="!loading && poems.length > 0"
            class="mt-8"
            :total="total"
            :total-pages="totalPages"
            :current-page="currentPage"
            :max-display-pages="5"
        />
    </div>
</template>

<script setup>
// SEO 配置
useHeadSafe({
    title: '古诗词大全_唐诗宋词元曲_中国古典诗词查询',
    meta: [
        {
            name: 'keywords',
            content: '古诗词,唐诗,宋词,元曲,诗词大全,古典诗词,诗词查询,诗词赏析'
        },
        {
            name: 'description',
            content: '聚全网提供全面的古诗词查询服务，包括唐诗、宋词、元曲等中国古典诗词，支持按作者、朝代、题材等多种方式查询。'
        },
        {
            name: 'og:title',
            content: '古诗词大全 - 中国古典诗词查询平台'
        },
        {
            name: 'og:description',
            content: '提供全面的古诗词查询服务，包括唐诗、宋词、元曲等中国古典诗词'
        }
    ]
})

const route = useRoute()

// 状态管理
const searchQuery = ref('')
const selectedCategory = ref('全部')
const currentPage = computed(() => Number(route.query.page) || 1)
const totalPages = ref(1)
const poems = ref([])
const loading = ref(false)
const error = ref(null)
const total = ref(0)

// 处理诗词内容换行
const formatPoemContent = (content) => {
    if (!content) return []
    let splitArray = content.split(/([。；）)？])/);
    console.log(splitArray)
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

// 分类列表
const categories = ['全部', '唐诗', '宋词', '元曲', '诗经', '楚辞']

// 搜索处理
const handleSearch = () => {
    navigateTo({
        query: {
            ...route.query,
            page: 1,
            search: searchQuery.value
        }
    })
}

// 分类选择
const selectCategory = (category) => {
    selectedCategory.value = category
    navigateTo({
        query: {
            ...route.query,
            page: 1,
            category: category === '全部' ? undefined : category
        }
    })
}

// 获取诗词列表
const fetchPoems = async () => {
    loading.value = true
    error.value = null
    
    try {
        const params = new URLSearchParams({
            page: currentPage.value.toString(),
            category: selectedCategory.value === '全部' ? '' : selectedCategory.value,
            search: searchQuery.value
        })

        const response = await fetch(`/api/poems?${params}`)
        if (!response.ok) {
            throw new Error('获取数据失败')
        }

        const data = await response.json()
        poems.value = data.items
        total.value = data.total
        totalPages.value = data.totalPages
    } catch (err) {
        error.value = err.message
        console.error('获取诗词列表失败:', err)
    } finally {
        loading.value = false
    }
}

// 初始加载
onMounted(() => {
    fetchPoems()
})

// 监听路由参数变化
watch(
    () => route.query,
    () => {
        fetchPoems()
    },
    { deep: true }
)
</script>

<style scoped>
/* 移除所有自定义样式，使用 Tailwind 类 */
</style>