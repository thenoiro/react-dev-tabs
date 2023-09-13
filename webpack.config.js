const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = __dirname;

module.exports = {
  mode: 'development',
  entry: path.resolve(root, './dev/index.js'),
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React-Dev-Tabs',
      inject: 'body',
      favicon: path.resolve(root, './static/favicon.ico'),
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-dev-tabs': path.resolve(root, './build'),
      '@': [path.resolve(root, './dev')],
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", {
                runtime: "automatic",
              }],
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    port: 3141,
    hot: true,
    open: false,
  },
};
