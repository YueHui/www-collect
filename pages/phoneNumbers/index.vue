<template>
    <Breadcrumb />
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- 搜索区域 -->
        <div class="flex gap-4 mb-4">
            <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="搜索电话号码或描述..."
                class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
            >
            <select 
                v-model="selectedCategory" 
                class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">全部类别</option>
                <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                </option>
            </select>
            <button 
                @click="resetFilters" 
                class="px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50"
            >
                重置
            </button>
        </div>

        <div class="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">ID</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">类别</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">名称</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">电话号码</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="item in filteredData" :key="item.id" class="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.cate }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{{ item.name }}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">{{ item.tel }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import data from '@/datas/numbers.json'

// SEO 配置
useHeadSafe({
    title: '常用电话号码查询 - 聚全网',
    meta: [
        {
            name: 'description',
            content: '提供全国常用电话号码查询服务，包括紧急电话、公共服务、银行电话等重要联系方式，快速便捷地查询各类常用电话号码。'
        },
        {
            name: 'keywords',
            content: '常用电话号码,紧急电话,公共服务电话,银行电话,查号台,便民服务'
        }
    ]
})

const searchQuery = ref('')
const selectedCategory = ref('')

// 获取所有类别
const categories = computed(() => {
    return [...new Set(data.map(item => item.cate))].sort()
})

// 过滤后的数据
const filteredData = computed(() => {
    return data.filter(item => {
        // 类别筛选
        if (selectedCategory.value && item.cate !== selectedCategory.value) return false
        
        // 搜索筛选
        if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase()
            return item.cate.toLowerCase().includes(query) ||
                   item.name.toLowerCase().includes(query) ||
                   item.tel.toLowerCase().includes(query)
        }
        
        return true
    })
})

// 重置筛选
function resetFilters() {
    searchQuery.value = ''
    selectedCategory.value = ''
}
</script>

<style>
/* 确保表格容器有最大宽度限制 */
.container {
    max-width: 1280px;
}
</style>