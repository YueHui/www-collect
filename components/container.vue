
<template>
    <header>
        <NuxtLink to="/">聚全网</NuxtLink>
    </header>
    
    <main>
        <slot></slot>
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

nav {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

nav a {
    margin: 0;
    text-decoration: none;
    color: #007bff;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s;
}

nav a:hover {
    background-color: #f0f0f0;
}

main {
    padding : 2rem;
}

footer {
    background-color: #f8f9fa;
    padding: 1rem;
    text-align: center;
    width: 100%;
    bottom: 0;
}

/* 添加响应式容器样式 */
header,
main,
footer {
    width: 1200px;
    margin: 0 auto;
    padding: 1rem;
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

</style>
