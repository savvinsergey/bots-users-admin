const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry:[
        'bootstrap-loader',
        path.join(__dirname, './app/app.js'),
        path.join(__dirname, './styles/styles.scss')
    ],
    output:{
        path: path.join(__dirname, '../../build/client'),
        filename: 'client.js'
    },

    module: {
        rules: [
            {
                test:/\.js$/ ,
                loader:'babel-loader',
                exclude: /(node_modules)/,
                query: {
                    presets: ['react','es2015','stage-3']
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }]
            },
            {
                test: /\.(eot|ttf|svg|png|gif|woff|woff2)?$/,
                loader: 'file-loader',
                query: {
                    limit: 10240,
                    name: 'static/[hash].[ext]'
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],

    devServer: {
        inline: true,
        contentBase: './build/client',
        host: 'localhost',
        port: 4000
    },

    devtool: 'source-map'
};
