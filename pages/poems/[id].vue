<template>
    <Breadcrumb :current-name="poem && poem.title" />
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- 错误提示 -->
        <div v-if="error" class="bg-red-50 text-red-700 p-4 rounded-lg mb-8 text-center">
            获取数据失败，请稍后重试
        </div>

        <!-- 诗词内容 -->
        <div v-else-if="poem" class="bg-white rounded-lg shadow-lg p-8">
            <!-- 标题和作者 -->
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ poem.title }}</h1>
                <p class="text-lg text-gray-600">{{ poem.years }} · {{ poem.author }}</p>
            </div>

            <!-- 诗词正文 -->
            <div class="space-y-4 mb-8">
                <div class="text-lg text-gray-800 leading-relaxed">
                    <p v-for="(line, index) in formatPoemContent(poem.content)" 
                       :key="index"
                       class="mb-2">
                        {{ line }}
                    </p>
                </div>
            </div>

            <!-- 注释和翻译 -->
            <div class="space-y-6 border-t border-gray-200 pt-6">
                <!-- 注释 -->
                <div v-if="poem.annotation" class="prose">
                    <h2 class="text-xl font-semibold text-gray-900 mb-4">注释</h2>
                    <div class="text-gray-700" v-html="poem.annotation"></div>
                </div>

                <!-- 翻译 -->
                <div v-if="poem.translation" class="prose">
                    <h2 class="text-xl font-semibold text-gray-900 mb-4">译文</h2>
                    <div class="text-gray-700" v-html="poem.translation"></div>
                </div>

                <!-- 赏析 -->
                <div v-if="poem.appreciation" class="prose">
                    <h2 class="text-xl font-semibold text-gray-900 mb-4">赏析</h2>
                    <div class="text-gray-700" v-html="poem.appreciation"></div>
                </div>
            </div>

            <!-- 标签 -->
            <div v-if="poem.tags && poem.tags.length" class="mt-8 pt-6 border-t border-gray-200">
                <div class="flex flex-wrap gap-2">
                    <span v-for="tag in poem.tags" 
                          :key="tag" 
                          class="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                        {{ tag }}
                    </span>
                </div>
            </div>

            <!-- 上一篇下一篇导航 -->
            <div class="mt-8 pt-6 border-t border-gray-200">
                <div class="flex justify-between items-center">
                    <NuxtLink 
                        v-if="prevPoem" 
                        :to="`/poems/${prevPoem._id}`"
                        class="flex items-center text-green-600 hover:text-green-700"
                    >
                        <span class="mr-2">←</span>
                        <span>{{ prevPoem.title }}</span>
                    </NuxtLink>
                    <div v-else class="text-gray-400">已是第一篇</div>

                    <NuxtLink 
                        v-if="nextPoem" 
                        :to="`/poems/${nextPoem._id}`"
                        class="flex items-center text-green-600 hover:text-green-700"
                    >
                        <span>{{ nextPoem.title }}</span>
                        <span class="ml-2">→</span>
                    </NuxtLink>
                    <div v-else class="text-gray-400">已是最后一篇</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { formatPoemContent } from '~/utils/utils'
const route = useRoute()
const id = route.params.id
const config = useRuntimeConfig()

// 使用 useAsyncData 进行服务端渲染
const { data, error, refresh } = await useAsyncData(
    `poem-${id}`,
    async () => {
        try {
            // 使用 $fetch 替代 fetch，它会自动处理基础 URL
            return await $fetch(`/api/poems/${id}`)
        } catch (err) {
            console.error('获取诗词详情失败:', err)
            throw err
        }
    },
    {
        server: true,
        lazy: false
    }
)

// 计算属性获取数据
const poem = computed(() => data.value?.poem || null)
const prevPoem = computed(() => data.value?.prevPoem || null)
const nextPoem = computed(() => data.value?.nextPoem || null)

// SEO 配置
useHead(() => ({
    title: poem.value 
        ? `${poem.value.title} - ${poem.value.author}的诗词 - 古诗词大全`
        : '古诗词大全',
    meta: [
        {
            name: 'keywords',
            content: poem.value
                ? `${poem.value.title},${poem.value.author},${poem.value.years},古诗词,诗词赏析`
                : '古诗词,诗词大全'
        },
        {
            name: 'description',
            content: poem.value
                ? poem.value.content.substring(0, 100)
                : '古诗词查询和赏析平台'
        }
    ]
}))

// 监听路由变化，重新获取数据
watch(
    () => route.params.id,
    () => {
        if (route.params.id) {
            refresh()
        }
    }
)
</script>