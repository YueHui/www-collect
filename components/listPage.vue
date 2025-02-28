<template>
    <div class="main-container">
        <div class="left-column">
            <nav>
                <NuxtLink to="/cy">成语大全</NuxtLink>
                <NuxtLink to="/xz">星座大全</NuxtLink>
                <NuxtLink to="/mailCode">邮编区号大全</NuxtLink>
            </nav>
        </div>
        <div class="right-column">
            <h2>右侧栏</h2>
            <p>这里是右侧内容区域</p>
        </div>
    </div>
</template>

<style scoped>
.main-container {
    display: flex;
    gap: 2rem;
}

.left-column {
    width: 200px; /* 固定宽度 */
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