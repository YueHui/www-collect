<template>
    <div class="grid-container">
        <!-- 示例项目 -->
        <NuxtLink class="grid-item" to="/cy">
            <h3>成语大全</h3>
        </NuxtLink>
        <NuxtLink class="grid-item" to="/mailCode">
            <h3>邮编区号大全</h3>
        </NuxtLink>
        <NuxtLink class="grid-item" to="/phoneNumbers">
            <h3>常用电话号码</h3>
        </NuxtLink>
        
    </div>
</template>

<script setup>

</script>

<style scoped>
.index-page {
padding: 20px;
}

.grid-container {
display: grid;
grid-template-columns: repeat(4, 1fr); /* 4列等宽 */
gap: 20px; /* 项目之间的间距 */
padding: 20px;
}

.grid-item {
background-color: #f5f5f5;
border-radius: 8px;
padding: 20px;
text-align: center;
transition: transform 0.3s ease;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.grid-item:hover {
transform: translateY(-5px);
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 响应式布局 */
@media (max-width: 1024px) {
.grid-container {
    grid-template-columns: repeat(3, 1fr); /* 3列 */
}
}

@media (max-width: 768px) {
.grid-container {
    grid-template-columns: repeat(2, 1fr); /* 2列 */
}
}

@media (max-width: 480px) {
.grid-container {
    grid-template-columns: 1fr; /* 1列 */
}
}
</style>