<template>
    <Breadcrumb />

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