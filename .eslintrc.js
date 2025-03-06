module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended'
    ],
    rules: {
        'vue/no-multiple-template-root': 'off'
    }
}