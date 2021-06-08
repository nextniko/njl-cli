const { merge } = require('webpack-merge')
const path = require('path')
const { resolve } = require('path')

const webpackCommonConfig = require('./webpack.common.js')
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const workboxPlugin = require('workbox-webpack-plugin')
const webpackProdConfig = {
    mode:'production',
    // devtool:"cheap-module-source-map",
    optimization:{
        minimizer:[
            new OptimizeCssAssetsWebpackPlugin({})
        ]
    },
    plugins:[
        new workboxPlugin.GenerateSW({
            clientsClaim:true,
            skipWaiting:true,
            // swDest: './service-worker.js', // 输出 Service worker 文件
        }),
        
    ],
    output:{
        filename: "./js/[name]_[contenthash].js",
        chunkFilename:"./js/[name]_chunk_[contenthash].js",
        path: resolve(__dirname,'../dist'),
        // publicPath:baseURL?baseURL:'',
    },
}
const mergeConfig = merge(webpackCommonConfig,webpackProdConfig)
module.exports = mergeConfig