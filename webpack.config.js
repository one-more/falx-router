var path = require('path');

module.exports = {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
        library: 'falx-router',
        libraryTarget:'umd'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    externals: {
        falx: "falx"
    },
    devServer: {
        contentBase: path.join(__dirname, "dist")
    },
};