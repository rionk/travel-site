const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const postCSSPlugins = [
    // require('postcss-import'),
    // require('postcss-mixins'),
    // require('postcss-simple-vars'),
    // require('postcss-nested'),
    require('autoprefixer'),
]

module.exports = {
    entry: {
        index : [
            "@babel/polyfill",
            "./app/assets/scripts/App.js"
        ]
    },
    output: {
        path:  path.resolve(__dirname, 'app'),
        filename: "[name].bundle.js"
    },
    mode: "development",
    devtool: 'inline-source-map',
    target: "web",
    devServer : {
        before: function (app, server){
            server._watch('./app/**/*.html')
        },
        contentBase: path.resolve(__dirname, "app"), // 정적파일 제공 경로
        publicPath : "/" , // 브라우저 접근 경로(기본값: / ),
        hot: true,
        port: 9000,
        host: '0.0.0.0',
        historyApiFallback: true   //  spa 개발시 404가 발생하면 index.html 리다이렉트
    },
    module: {
        rules : [
            {
                test: /\.(scss|css)$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    //"style-loader", // Creates `style` nodes from JS strings
                    "css-loader?url=false",  // Translates CSS into CommonJS
                    "sass-loader",  // Compiles Sass to CSS,
                    {
                        loader:'postcss-loader',
                        options: {
                            postcssOptions : {
                                plugins: postCSSPlugins
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins : [
        /*new HtmlWebpackPlugin({
            title: "Clear View Escapes",
            template : "./app/index.html",
            filename:  "index.html",
            //chunks: ['name']
        }),*/
        new MiniCssExtractPlugin ({
            filename: "./assets/styles/main.css"
        })
    ]
}
