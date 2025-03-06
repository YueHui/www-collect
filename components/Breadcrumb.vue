<template>
    <nav class="flex mb-4 text-gray-600" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
                <NuxtLink to="/" class="inline-flex items-center hover:text-gray-900">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    首页
                </NuxtLink>
            </li>
            <li v-for="(crumb, index) in breadcrumbs" :key="index" :aria-current="index === breadcrumbs.length - 1 ? 'page' : undefined">
                <div class="flex items-center">
                    <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <NuxtLink 
                        v-if="index < breadcrumbs.length - 1" 
                        :to="crumb.path"
                        class="ml-1 hover:text-gray-900 md:ml-2"
                    >
                        {{ crumb.name }}
                    </NuxtLink>
                    <span v-else class="ml-1 text-gray-500 md:ml-2">{{ crumb.name }}</span>
                </div>
            </li>
        </ol>
    </nav>
</template>

<script setup>
const route = useRoute()
const props = defineProps({
    currentName: {
        type: String,
        default: ''
    }
})

// 面包屑路径映射
const pathMap = {
    'cy': '成语大全',
    'xz': '星座大全',
    'mailCode': '邮编区号',
    'phoneNumbers': '常用电话号码',
    'poems': '古诗词大全'
}

const breadcrumbs = computed(() => {
    const paths = route.path.split('/').filter(Boolean)
    return paths.map((path, index) => {
        const fullPath = '/' + paths.slice(0, index + 1).join('/')
        // 如果是最后一个路径且有传入currentName，则使用currentName
        if (index === paths.length - 1 && props.currentName) {
            return {
                name: props.currentName,
                path: fullPath
            }
        }
        return {
            name: pathMap[path] || path,
            path: fullPath
        }
    })
})
</script> 