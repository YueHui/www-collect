<template>
    <NuxtLoadingIndicator />
    <Container>
        <NuxtPage />
    </Container>
    <Analytics />
</template>

<script setup>
import { Analytics } from '@vercel/analytics/nuxt'
</script>
