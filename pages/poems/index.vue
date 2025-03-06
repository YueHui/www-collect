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
            <NuxtLink 
                v-for="tag in categories" 
                :key="tag"
                :to="{
                    query: {
                        ...route.query,
                        category: tag === '全部' ? undefined : tag,
                        page: 1
                    }
                }"
                :class="[
                    'px-4 py-2 rounded-full cursor-pointer transition-colors',
                    (route.query.category || '全部') === tag 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
            >
                {{ tag }}
            </NuxtLink>
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="bg-red-50 text-red-700 p-4 rounded-lg mb-8 text-center">
            获取数据失败，请稍后重试
        </div>

        <!-- 诗词列表 -->
        <div class="space-y-6">
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
                        <p v-for="(line, index) in formatPoemContent(poem.content)" 
                           :key="index" 
                           class="text-gray-700 leading-relaxed">
                            {{ line }}
                        </p>
                    </div>

                    <!-- 标签 -->
                    <div v-if="poem.tags && poem.tags.length" class="flex flex-wrap gap-2">
                        <span v-for="tag in poem.tags.slice(0, 2)" 
                              :key="tag" 
                              class="px-2 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                            {{ tag }}
                        </span>
                    </div>
                </NuxtLink>
            </div>
        </div>

        <!-- 分页 -->
        <Pagination 
            v-if="poems.length > 0"
            class="mt-8"
            :total="total"
            :total-pages="totalPages"
            :current-page="currentPage"
        />
    </div>
</template>

<script setup>
import { formatPoemContent } from '~/utils/utils'
const route = useRoute()

// 状态管理
const searchQuery = ref(route.query.search || '')
const selectedCategory = ref(route.query.category || '全部')
const categories = ['全部', '唐诗', '宋词', '元曲', '诗经', '楚辞']

// 使用 useAsyncData 进行服务端渲染
const { data, error, refresh } = await useAsyncData(
    'poems-list',
    async () => {
        const params = new URLSearchParams({
            page: route.query.page || '1',
            category: route.query.category || '',
            search: route.query.search || ''
        })
        return await $fetch(`/api/poems?${params}`)
    },
    {
        server: true,
        lazy: false,
        watch: [() => route.query]  // 监听路由参数变化
    }
)

// 计算属性
const poems = computed(() => data.value?.items || [])
const total = computed(() => data.value?.total || 0)
const totalPages = computed(() => data.value?.totalPages || 1)
const currentPage = computed(() => Number(route.query.page) || 1)

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

// SEO 配置
useHead({
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
</script>

<style scoped>
/* 移除所有自定义样式，使用 Tailwind 类 */
</style>