const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')

const PORT = process.env.PORT || '3000'
const API_PORT = process.env.API_PORT || '3001'
const dev = process.env.NODE_ENV !== 'production'

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body',
  title: 'Record Time',
})

const envConfig = new webpack.DefinePlugin({
  'process.env.ABLY_PUBLIC_KEY': JSON.stringify(process.env.ABLY_PUBLIC_KEY || process.env.ABLY_API_KEY),
})

let plugins = []
const output = {
  publicPath: '/',
  path: path.join(__dirname, '/build'),
  filename: '[name].js',
}

let optimization = {}
if (dev) {
  plugins = [
    HTMLWebpackPluginConfig,
    envConfig,
    new webpack.HotModuleReplacementPlugin(),
  ]

  output.filename = '[name].js'
} else {
  const DefinePluginConfig = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  })

  plugins = [
    HTMLWebpackPluginConfig,
    new webpack.HashedModuleIdsPlugin(),
    envConfig,
    DefinePluginConfig,
  ]

  output.filename = '[name].[chunkhash].js'
  optimization = {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  }
}

module.exports = {
  devServer: {
    host: 'localhost',
    port: PORT,
    index: 'index.html',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: `http://localhost:${API_PORT}`,
      },
      '/assets': {
        target: `http://localhost:${API_PORT}`,
      },
    },
  },
  entry: ['react-hot-loader/patch', '@babel/polyfill', path.join(__dirname, '/src/index.jsx')],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        resolve: { extensions: ['.js', '.jsx'] },
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:10]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssPresetEnv({
                  /* use stage 3 features + css nesting rules */
                  stage: 3,
                  features: {
                    'nesting-rules': true,
                  },
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.(wav|mp3)$/i,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
  },
  output,
  optimization,
  mode: dev ? 'development' : 'production',
  plugins,
}
