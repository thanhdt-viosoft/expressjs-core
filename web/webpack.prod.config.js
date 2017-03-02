var path = require('path');
var webpack = require('webpack');
var OptimizeJsPlugin = require("optimize-js-plugin");

module.exports = {
    entry: {
        app: './webpack/app.js'
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        comments: false
    },
    module: {
        loaders: [            
            { test: /\.s?css$/, loader: 'style!css!sass'},
            { test: require.resolve('angular'), loader: 'exports?window.angular' },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            },
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: "url-loader?limit=10000&name=images/[name].[ext]" },
            { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader?name=fonts/[name].[ext]' },
            { test: /\.html$/, loader: 'html-loader?minimize=true' },
            { test: /\.htm$/, loaders: ['file-loader?name=[name].[ext]', 'extract-loader', 'html-loader?minimize=true'] }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        alias: {
            angular: "angular/index.js",
            router:  "@angular/router/angular1/angular_1_router.js"
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            "angular": "angular"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false,
            sourceMap: false
        }),
        new OptimizeJsPlugin({
            sourceMap: false
        }),
        new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
        new webpack.optimize.MinChunkSizePlugin({minChunkSize: 100000})
    ]
}