<template>
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <!-- 总数显示 -->
        <div class="text-gray-600">
            共 {{ total }} 条记录
        </div>

        <!-- 翻页控件 -->
        <div class="flex items-center gap-4">
            <!-- 上一页 -->
            <NuxtLink 
                :to="{
                    query: {
                        ...route.query,
                        page: Math.max(1, currentPage - 1)
                    }
                }"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''"
            >
                上一页
            </NuxtLink>

            <!-- 页码显示 -->
            <div class="flex items-center gap-2">
                <template v-for="page in displayPages" :key="page">
                    <NuxtLink 
                        v-if="page !== '...'"
                        :to="{
                            query: {
                                ...route.query,
                                page
                            }
                        }"
                        class="px-3 py-1 rounded-lg"
                        :class="currentPage === page 
                            ? 'bg-green-500 text-white' 
                            : 'hover:bg-gray-100'"
                    >
                        {{ page }}
                    </NuxtLink>
                    <span v-else class="px-2">...</span>
                </template>
            </div>

            <!-- 下一页 -->
            <NuxtLink 
                :to="{
                    query: {
                        ...route.query,
                        page: Math.min(totalPages, currentPage + 1)
                    }
                }"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                :class="currentPage === totalPages ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''"
            >
                下一页
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()

const props = defineProps({
    total: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    },
    currentPage: {
        type: Number,
        default:  1
    },
    // 显示的页码数量
    maxDisplayPages: {
        type: Number,
        default: 5
    }
})

// 计算要显示的页码
const displayPages = computed(() => {
    const pages = []
    const { currentPage, totalPages, maxDisplayPages } = props
    
    // 如果总页数小于等于最大显示页数，直接显示所有页码
    if (totalPages <= maxDisplayPages) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
        return pages
    }
    
    // 否则，显示部分页码和省略号
    pages.push(1)
    
    let start = Math.max(2, currentPage - Math.floor(maxDisplayPages / 2))
    let end = Math.min(totalPages - 1, start + maxDisplayPages - 3)
    
    if (start > 2) pages.push('...')
    
    for (let i = start; i <= end; i++) {
        pages.push(i)
    }
    
    if (end < totalPages - 1) pages.push('...')
    if (totalPages > 1) pages.push(totalPages)
    
    return pages
})
</script>
