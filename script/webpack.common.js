const webpack = require('webpack')
const path = require('path')
const { resolve } = require('path')
const fs = require('fs')
// html生成模版
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
// 判断执行环境
// process.on('unhandledRejection', err => {
//     throw err;
// });

// const args = process.argv.slice(2);
const commonCssLoader = [
    CssPlugin.loader,
    {
        loader:'css-loader',
        options:{
            importLoaders:2,
            modules:true
        }
    },
    {
        loader:"postcss-loader",
    }
]
const dllPlugin = [
]
const files = fs.readdirSync(path.resolve(__dirname,'../dll'))
files.forEach(file=>{
    if(/.*\.dll.js/.test(file)){
        dllPlugin.push(new AddAssetHtmlWebpackPlugin({
            filepath:path.resolve(__dirname,'../dll',file)
        }))
    }
    if(/.*\.manifest.json/.test(file)){
        dllPlugin.push(new webpack.DllReferencePlugin({
            manifest:path.resolve(__dirname,'../dll',file)
        }))
    }
})
const webpackCommonConfig = {
    entry:{
        main:path.resolve(__dirname,"../src/main.js"),
        // vueMain:"./src/vue-script/main.js",
        // njlMain:"./src/njl-script/main.js",
        // reactMain:"./src/react-script/main.tsx",
        // test:"./src/test.js"
    },
    resolve: {
        alias:{
            $css:resolve(__dirname,'src/css'),
            '@':resolve(__dirname,'src')
        },
        extensions:['.js','.json','css','tsx','vue','jsx'],
        modules:['node_modules']
    },
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                use:"ts-loader",
                // exclude:/node_modules/,
                include:resolve(__dirname,'../src')
            },
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                use:[
                    {
                        loader:"babel-loader"
                    }
                ],
                
            },
            {
                test:/\.css$/,
                use:[
                    ...commonCssLoader
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    ...commonCssLoader,
                    "sass-loader",
                ]
            },
            {
                test:/\.(jpg|png|gif|jpe?g)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        outputPath:"img/",
                        name:'[name]_[hash].[ext]',
                        limit:2048,
                    }
                }
            },
            {
                test:/\.(eot|ttf|svg)$/,
                use:{
                    loader:'file-loader',
                }
            }
        ]
    },
    optimization:{
        splitChunks: {
            chunks: 'all',
            minSize: 3000,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            name:true,
            automaticNameDelimiter:"_",
            cacheGroups:{
                defaultVendors:{
                    test:/[\\/]node_modules[\\/]/,
                    priority:-10,
                    reuseExistingChunk:true,
                    filename:"./js/vendors/[name]_[contenthash].js"
                },
                // default:{
                //     minChunks:2,
                //     priority:-20,
                //     reuseExistingChunk:true,
                //     filename:"./js/defaults/d[name]_[contenthash].js"
                // },
                // common:{
                //     chunks:"all",
                //     test:/[\\/]node_modules[\\/]/,
                //     priority:-20,
                //     reuseExistingChunk:true,
                //     filename:"./js/commons/commons_[name].js"
                // }
            }
        },
        usedExports:true
    },
    
    plugins:[
        // 默认创建空的HTML 引入打包输出的资源
        new HtmlWebpackPlugin({
            title:"njl-cli",
            filename:"index.html",
            // 模板html
            template:"./public/index.html",
            minify:{
                // 移除空格
                collapseWhitespace:true,
                // 移除注释
                removeComments:true
            }
        }),
        new CleanWebpackPlugin(),
        new CssPlugin({
            filename:"css/[name].[chunkhash:10].css",
            chunkFilename:"css/[name].[chunkhash:10]_chunk.css"
        }),
        ...dllPlugin,
    ],
    performance:false,
    
}
module.exports = webpackCommonConfig