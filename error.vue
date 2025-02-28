<template>
    <Container>
        <div class="text-center">
            <h2 class="text-8xl">{{ error.statusCode }}</h2>
            <NuxtLink to="/" class="text-3xl">返回首页</NuxtLink>
        </div>
    </Container>
</template>

<script setup lang="ts">
import type {NuxtError} from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})

const handleError = () => clearError({redirect: '/'})
</script>

