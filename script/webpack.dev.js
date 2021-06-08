const { resolve } = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common.js')
const webpackDevConfig = {
    mode:"development",
    devtool:"source-map",
    devServer:{
        contentBase:resolve(__dirname,'../dist'),
        // compress:true,
        port:8900,
        hot:true,
        historyApiFallback:{
            rewrites:[
                {
                    from:/\.*/,
                    to:"/index.html"
                }
            ]
        },
        // clientLogLevel:'none',
        // quiet:true,
        // watchOption:{
        //     // 忽略文件
        //     ignored:/node_modules/
        // },
        // overlay:false,
        proxy:{
            '/dellee':{
                target:'http://www.dell-lee.com',
                // 发送请求时 请求路径重写:将/api/xx -->/xx 去掉api
                pathRewrite:{
                    '^/dellee':''
                }
            }
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
}
const mergeConfig = merge(webpackCommonConfig,webpackDevConfig)
module.exports = mergeConfig