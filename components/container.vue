<template>
    <div class="min-h-screen flex flex-col">
        <!-- 顶部导航栏 -->
        <header class="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <!-- 左侧 Logo -->
                    <NuxtLink to="/" class="flex items-center space-x-2">
                        <span class="text-2xl font-bold text-green-600">聚全网</span>
                    </NuxtLink>

                    <!-- 右侧导航 -->
                    <nav class="hidden md:flex items-center space-x-8">
                        <NuxtLink 
                            v-for="item in navItems" 
                            :key="item.path"
                            :to="item.path"
                            class="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            active-class="text-green-600"
                        >
                            {{ item.name }}
                        </NuxtLink>
                    </nav>

                    <!-- 移动端菜单按钮 -->
                    <button 
                        class="md:hidden p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-100"
                        @click="toggleMobileMenu"
                    >
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- 移动端菜单 -->
            <div v-show="isMobileMenuOpen" class="md:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1">
                    <NuxtLink 
                        v-for="item in navItems" 
                        :key="item.path"
                        :to="item.path"
                        class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-green-600 hover:bg-gray-100"
                        active-class="text-green-600 bg-gray-100"
                    >
                        {{ item.name }}
                    </NuxtLink>
                </div>
            </div>
        </header>

        <!-- 主要内容区域 -->
        <main class="flex-grow pt-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <slot></slot>
            </div>
        </main>

        <!-- 改进的页脚设计 -->
        <footer class="bg-gray-50 border-t border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                <!-- 版权信息 -->
                <div class=" border-gray-200">
                    <div class="flex flex-col md:flex-row justify-between items-center">
                        <p class="text-gray-600">
                            版权所有 &copy; 2025 聚全网 保留所有权利
                        </p>
                        <!-- <div class="mt-4 md:mt-0 flex space-x-6">
                            <a href="#" class="text-gray-600 hover:text-green-600">
                                隐私政策
                            </a>
                            <a href="#" class="text-gray-600 hover:text-green-600">
                                使用条款
                            </a>
                            <a href="#" class="text-gray-600 hover:text-green-600">
                                关于我们
                            </a>
                        </div> -->
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
const isMobileMenuOpen = ref(false)

const navItems = [
    { name: '成语大全', path: '/cy' },
    { name: '古诗词', path: '/poems' },
    { name: '邮编区号', path: '/mailCode' },
    { name: '常用电话', path: '/phoneNumbers' }
]

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<style scoped>
/* 移除之前的所有样式，使用 Tailwind 类替代 */
</style>
