<template>
    <div class="grid-container">
        <!-- 添加简短的介绍文字，有助于 SEO -->
        <div class="intro-text mb-8 text-gray-600 text-center col-span-full">
            聚全网为您提供成语大全、古诗词鉴赏、邮编区号查询等便民服务。
            海量数据库，精准查询，让您轻松获取所需信息。
        </div>

        <!-- 示例项目 -->
        <NuxtLink class="grid-item" to="/cy">
            <h3>成语大全</h3>
            <p class="text-sm text-gray-600 mt-2">海量成语详解、典故出处</p>
        </NuxtLink>
        <NuxtLink class="grid-item" to="/mailCode">
            <h3>邮编区号大全</h3>
            <p class="text-sm text-gray-600 mt-2">全国邮政编码快速查询</p>
        </NuxtLink>
        <NuxtLink class="grid-item" to="/phoneNumbers">
            <h3>常用电话号码</h3>
            <p class="text-sm text-gray-600 mt-2">紧急联系方式便捷查询</p>
        </NuxtLink>
        <NuxtLink class="grid-item" to="/poems">
            <h3>古诗词大全</h3>
            <p class="text-sm text-gray-600 mt-2">唐诗宋词元曲精选鉴赏</p>
        </NuxtLink>
        <NuxtLink class="grid-item" to="/ai">
            <h3>AI大全</h3>
            <p class="text-sm text-gray-600 mt-2">AI大全</p>
        </NuxtLink>
    </div>
</template>

<script setup>
// SEO 配置
useHead({
    title: '聚全网 - 成语大全_古诗词_邮编区号查询_常用电话号码查询',
    meta: [
        {
            name: 'keywords',
            content: '成语大全,成语词典,古诗词大全,唐诗宋词,诗词鉴赏,邮政编码查询,邮编查询,区号查询,电话区号,常用电话号码,紧急电话,便民查询'
        },
        {
            name: 'description',
            content: '聚全网提供成语大全、古诗词鉴赏、邮政编码查询、电话区号查询、常用电话号码等便民查询服务。包含海量成语、唐诗宋词、邮编区号等数据，让您快速获取需要的信息。'
        },
        {
            name: 'og:title',
            content: '聚全网 - 成语_古诗词_便民查询服务平台'
        },
        {
            name: 'og:description',
            content: '提供成语、古诗词、邮编、区号、常用电话等便民查询服务，海量数据，精准查询。'
        },
        // 添加更多的 meta 标签
        {
            name: 'author',
            content: '聚全网'
        },
        {
            name: 'robots',
            content: 'index, follow'
        },
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:site_name',
            content: '聚全网'
        },
        // 添加结构化数据
        {
            name: 'structured-data',
            content: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "聚全网",
                "description": "成语大全、古诗词、邮编区号等便民查询服务平台",
                "url": "https://collectapp.org",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://collectapp.org/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            })
        }
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://collectapp.org'
        },
        {
            rel: 'alternate',
            href: 'https://collectapp.org',
            hreflang: 'zh-CN'
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

.intro-text {
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto 2rem;
    padding: 0 1rem;
}

.grid-item p {
    opacity: 0.8;
    font-size: 0.9rem;
    margin-top: 0.5rem;
}
</style>