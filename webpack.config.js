var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        main: './html/main.js',
        index: './html/index.js',
        dashboard: './html/dashboard.js'
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        loaders: [
            { test: /\.s?css$/, loader: 'style!css!sass'},
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|assets)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            },
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: "url-loader?name=images/[name].[ext]" },
            { test: /\.(ttf|otf|eot|svg|woff2?)(\?[a-z0-9]+)?$/, loader: 'file-loader?name=fonts/[name].[ext]' },
            { test: /\.html$/, loaders: ['file-loader?name=[name].[ext]', 'extract-loader', 'html-loader?minimize=true'] }
        ]
    },
    plugins: [
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
        new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
        new webpack.optimize.MinChunkSizePlugin({minChunkSize: 100000})
    ]
}