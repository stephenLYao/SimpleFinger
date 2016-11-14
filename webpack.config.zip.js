const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool : 'source-map',
  entry: [
    './src/SimpleFinger.js'
  ],
  output: {
    path: "./src",
    filename: 'SimpleFinger.min.js',
    publicPath: '/src'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
}
