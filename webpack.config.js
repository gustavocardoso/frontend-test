const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
// const WebpackPwaManifest = require('webpack-pwa-manifest')

require('babel-polyfill')

const path = require('path')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill', './src/js/index.js'],
  output: {
    filename: 'public/js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    compress: true,
    port: 9000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader', options: { minimize: true } }]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? 'public/css/[name].css' : 'public/css/[name].[hash].css',
      chunkFilename: devMode ? 'public/css/[id].css' : 'public/css/[id].[hash].css'
    }),
    new CopyPlugin([{ from: './src/assets/json/recipes.json', to: 'public/assets/json' }])
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
}
