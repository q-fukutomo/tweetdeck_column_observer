const path = require('path');
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
    ],
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
