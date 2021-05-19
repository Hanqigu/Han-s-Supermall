module.exports = {
    configureWebpack: {
        resolve: {
            // extensions在vue3里已经自动配置了，所以没太大必要进行修改
            // extensions: [],
            alias: {
                // 在vue3中，src已经自动与@关联了，所以不需要再配置
                // '@': 'src',
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            },
        },
    },
};