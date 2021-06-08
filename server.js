const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./script/webpack.prod')
const complier = webpack(config)

const app = express()
app.use(webpackDevMiddleware(complier,{
    publicPath:config.output.publicPath
}))
app.listen(3000,()=>{

})