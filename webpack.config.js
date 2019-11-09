const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    liveReload: false,
    noInfo: true,
    port: 9000
  },
  entry: {
    simple: './src/widgets/simple-widget.ts',
    complex: './src/widgets/complex-widget.ts'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { context: 'node_modules/vss-web-extension-sdk/lib/', from: 'VSS.SDK.min.js' },
      { context: 'src', from: 'vss-extension.json' },
      { context: 'src', from: 'logo.png' }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[id].bundle.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'simple-widget.html',
      template: "src/widgets/simple-widget.html",
      hash: true,
      inject: "body",
      minify: {
        collapseWhitespace: true
      },
      chunks: ['simple']
    }),
    new HtmlWebpackPlugin({
      filename: 'complex-widget.html',
      template: 'src/widgets/complex-widget.html',
      hash: true,
      inject: "body",
      minify: {
        collapseWhitespace: true
      },
      chunks: ['complex']
    }),
    new HtmlMinifierPlugin({}),
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  }
};
