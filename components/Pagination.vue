<template>
    <div class="flex items-center justify-center space-x-1 my-4">
        <button 
            @click="$emit('update:modelValue', currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            上一页
        </button>
        
        <button 
            v-for="page in displayPages" 
            :key="page"
            @click="$emit('update:modelValue', page)"
            :class="[
                'px-4 py-2 border rounded-lg hover:bg-gray-50',
                currentPage === page ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
            ]"
        >
            {{ page }}
        </button>
        
        <button 
            @click="$emit('update:modelValue', currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            下一页
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    }
})

defineEmits(['update:modelValue'])

const currentPage = computed(() => props.modelValue)

const displayPages = computed(() => {
    const pages = []
    const maxDisplayPages = 5
    let start = Math.max(1, currentPage.value - 2)
    let end = Math.min(props.totalPages, start + maxDisplayPages - 1)
    
    if (end - start + 1 < maxDisplayPages) {
        start = Math.max(1, end - maxDisplayPages + 1)
    }
    
    for (let i = start; i <= end; i++) {
        pages.push(i)
    }
    return pages
})
</script> 