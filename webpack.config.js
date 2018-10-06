var path = require('path')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const VueLoaderPlugin = require('vue-loader/lib/plugin');


var config = {
    entry:{
        main:'./main'
    },
    output:{
        path:path.join(__dirname,'./dist'),
        publicPath:'/dist/',
        filename:'main.js'
    },
    module:{
        rules: [
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options:{
                    loaders:{
                        css:[
							'vue-style-loader',
							'mini-css-extract-plugin',
							'css-loader'
						]
                    }
                }
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },
            {
              test: /\.css$/,
              use: [
                MiniCssExtractPlugin.loader,
                "css-loader"
              ]
            },
            {
                test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            	loader:'url-loader?limit=1024'
            }
          ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
          }),
        new VueLoaderPlugin()
    ]
}

module.exports = config;