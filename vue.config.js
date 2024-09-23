// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' // 移除路径前缀
                }
            }
        },
        host: '0.0.0.0', // 设置主机地址
        port: 8082, // 设置端口
        open: true // 自动打开浏览器
    },
    publicPath: '/', // 公共路径
    outputDir: 'dist', // 输出目录

};