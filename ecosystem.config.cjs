module.exports = {
    apps: [
        {
            name: 'cy-collect',
            script: '.output/server/index.mjs',
            env: {
                NODE_ENV: 'production',
                MONGODB_URI: 'mongodb://yuehui:Kong%40idiom@43.154.98.79:27071/idiom'
            }
        }
    ]
};