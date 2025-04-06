module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-pxtorem': {
            //根元素字體大小
            rootValue: 16,
            //匹配CSS中的属性，* 代表啟用所有属性
            propList: ['*'],
            //轉换成rem後保留的小數點位數
            unitPrecision: 5,
            //小於12px的样式不被替换成rem
            minPixelValue: 12,
            //忽略一些文件，不進行轉换，比如我想忽略 依赖的UI框架
            exclude: ['node_modules'],
        },
    },
}
