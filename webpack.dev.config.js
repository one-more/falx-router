const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './test/src/index.js'
    },
    output: {
        path: path.join(__dirname, 'test/dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(html)$/,
                loader: 'html-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'test/dist'),
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './test/src/index.html'
        })
    ]
};