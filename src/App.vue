<script setup>

</script>

<template>
    <header>
        <h1>网站标题</h1>
        <nav>
            <a href="https://cy.collectapp.org" title="成语大全" target="_blank">成语大全</a>
            <a href="https://xz.collectapp.org" title="星座大全" target="_blank">星座大全</a>
            <NustLink to="/mailCode">邮编区号大全</NustLink>
            <NustLink to="/">首页</NustLink>
        </nav>
    </header>
    
    <main>
        <div class="main-container">
            <div class="left-column">
                <h2>左侧栏</h2>
                <p>这里是左侧内容区域</p>
            </div>
            <div class="right-column">
                <h2>右侧栏</h2>
                <p>这里是右侧内容区域</p>
            </div>
        </div>
    </main>
    
    <footer>
        <p>版权所有 &copy; 2025</p>
    </footer>
</template>

<style scoped>
header {
    background-color: #f8f9fa;
    padding: 1rem;
    text-align: center;
}

nav a {
    margin: 0 1rem;
    text-decoration: none;
    color: #007bff;
}

main {
    padding: 2rem;
    text-align: center;
}

footer {
    background-color: #f8f9fa;
    padding: 1rem;
    text-align: center;
    position: fixed;
    width: 100%;
    bottom: 0;
}

/* 添加响应式容器样式 */
header, main {
    width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
}

/* 添加媒体查询 */
@media (max-width: 768px) {
    nav {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    nav a {
        margin: 0;
    }
    
    main {
        padding: 1rem;
    }
}

@media (max-width: 480px) {
    h1 {
        font-size: 1.5rem;
    }
    
    footer {
        position: static;
        margin-top: 2rem;
    }
}

.main-container {
    display: flex;
    gap: 2rem;
    margin-bottom: 4rem;
}

.left-column {
    width: 300px; /* 固定宽度 */
    flex-shrink: 0; /* 防止左侧栏被压缩 */
    padding: 1rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.right-column {
    flex: 1; /* 占据剩余空间 */
    padding: 1rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    .main-container {
        flex-direction: column;
        gap: 1rem;
    }
    
    .left-column {
        width: 100%; /* 在移动端占满宽度 */
    }
}
</style>
