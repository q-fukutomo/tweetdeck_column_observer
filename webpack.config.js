const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { url: false },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  resolve: {
    // Webpackで利用するときの設定
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    // extensions: ['*', '.js', '.vue', '.json'],
  },

  devServer: {
    static: 'dist',
  },

  entry: {
    background: './src/background/background.js',
    content: './src/content/content.js',
    options: './src/options/options.js',
    popup: './src/popup/popup.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['popup'],
      filename: 'popup.html',
      template: './src/popup/popup.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['options'],
      filename: 'options.html',
      template: './src/options/options.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/manifest.json' },
        { from: 'src/img', to: 'img' },
        { from: 'src/content/content.css', to: 'css' },
      ],
    }),
  ],
};
