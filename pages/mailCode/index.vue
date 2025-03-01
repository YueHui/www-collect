<template>
    <Breadcrumb />
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- 筛选区域 -->
        <div class="flex gap-4 mb-4">
            <select v-model="selectedProvince" class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">选择省份</option>
                <option v-for="province in provinces" :key="province" :value="province">
                    {{ province }}
                </option>
            </select>

            <select v-model="selectedCity" class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" :disabled="!selectedProvince">
                <option value="">选择城市</option>
                <option v-for="city in cities" :key="city" :value="city">
                    {{ city }}
                </option>
            </select>

            <select v-model="selectedArea" class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" :disabled="!selectedCity">
                <option value="">选择地区</option>
                <option v-for="area in areas" :key="area" :value="area">
                    {{ area }}
                </option>
            </select>

            <button @click="resetFilters" class="px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">
                重置
            </button>
        </div>

        <div class="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">省</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">市</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">区</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">邮编</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">区号</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="item in filteredData" :key="item.id" class="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.province }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.city }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.area }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{{ item.post_code }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{{ item.area_code }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import data from '@/datas/youbian.json'

// SEO 配置
useHeadSafe({
    title: '全国邮编区号查询 - 聚全网',
    meta: [
        {
            name: 'description',
            content: '全国邮政编码和电话区号查询系统，提供最新最全的中国各省市区邮编、电话区号信息，快速精准查询。'
        },
        {
            name: 'keywords',
            content: '邮政编码查询,邮编查询,区号查询,电话区号,邮编大全,区号大全'
        }
    ]
})

const selectedProvince = ref('')
const selectedCity = ref('')
const selectedArea = ref('')

// 获取所有省份
const provinces = computed(() => {
    return [...new Set(data.map(item => item.province))].sort()
})

// 根据选中的省份获取城市
const cities = computed(() => {
    if (!selectedProvince.value) return []
    return [...new Set(
        data.filter(item => item.province === selectedProvince.value)
            .map(item => item.city)
    )].sort()
})

// 根据选中的省份和城市获取地区
const areas = computed(() => {
    if (!selectedProvince.value || !selectedCity.value) return []
    return [...new Set(
        data.filter(item => 
            item.province === selectedProvince.value && 
            item.city === selectedCity.value
        ).map(item => item.area)
    )].sort()
})

// 监听省份变化，重置城市和地区
watch(selectedProvince, () => {
    selectedCity.value = ''
    selectedArea.value = ''
})

// 监听城市变化，重置地区
watch(selectedCity, () => {
    selectedArea.value = ''
})

// 过滤后的数据
const filteredData = computed(() => {
    return data.filter(item => {
        if (selectedProvince.value && item.province !== selectedProvince.value) return false
        if (selectedCity.value && item.city !== selectedCity.value) return false
        if (selectedArea.value && item.area !== selectedArea.value) return false
        return true
    })
})

// 重置筛选
function resetFilters() {
    selectedProvince.value = ''
    selectedCity.value = ''
    selectedArea.value = ''
}
</script>

<style>
/* 确保表格容器有最大宽度限制 */
.container {
    max-width: 1280px;
}
</style>