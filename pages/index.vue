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
// SEO 配置
useHeadSafe({
    title: '聚全网 - 成语大全_邮编区号查询_常用电话号码查询',
    meta: [
        {
            name: 'keywords',
            content: '成语大全,成语词典,邮政编码查询,邮编查询,区号查询,电话区号,常用电话号码,紧急电话,便民查询'
        },
        {
            name: 'description',
            content: '聚全网提供成语大全、邮政编码查询、电话区号查询、常用电话号码等便民查询服务，让您快速获取需要的信息。'
        },
        {
            name: 'og:title',
            content: '聚全网 - 便民查询服务平台'
        },
        {
            name: 'og:description',
            content: '提供成语、邮编、区号、常用电话等便民查询服务'
        }
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://collectapp.org'
        }
    ]
})
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