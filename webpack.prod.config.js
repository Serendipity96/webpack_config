var webpack =require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require("mini-css-extract-plugin")
var merge = require('webpack-merge')
var webpackBaseConfig = require('./webpack.config.js')
const { VueLoaderPlugin } = require('vue-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

webpackBaseConfig.plugins = []
module.exports = merge(webpackBaseConfig,{
    output:{
        publicPath:'/dist/',
        filename:'[name].[hash].js'
    },
    plugins:[
        // 提取 css
        new MiniCssExtractPlugin({
			filename:'[name].[hash].css'
        }),
        // node 生产环境
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:'"production"'
            }
        }),
        
        // 提取模板 保存入口 html 文件
        new HtmlWebpackPlugin({
            filename:'../index_prod.html',
            template:'./index.ejs',
            inject:false
        }),
        new VueLoaderPlugin()
    ],
    optimization: {
        minimizer: [
          // 压缩 js
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: false,
            },
          })
        ]
      }
})