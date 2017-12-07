var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: [path.join(__dirname, './app/app.ts')],
    output: {
        path: path.join(__dirname, '../../build/server'),
        filename: 'server.js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    externals: [nodeExternals()],

    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    typeCheck: true
                }
            },
            {
                test: /\.ts?$/,
                loader: 'ts-loader'
            }
        ]
    },

    target: "node"
};

