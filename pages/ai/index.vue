<template>
    <div>
        <h2>文生图类</h2>
        <div class="grid-container">
            <a class="grid-item" href="https://jimeng.jianying.com/" target="_blank">即梦AI</a>
        </div>
    </div>
</template>

<style>
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
</style>