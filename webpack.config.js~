var webpack = require('webpack');
var path = require('path');
//plugins
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
//my PATH
var PATH = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'), 
}

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(PATH.src, 'scripts', 'app.js')
  ],
  output: {
    path: path.resolve(PATH.dist, 'scripts'),
    filename: 'bundle.js'
    // publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new uglifyJsPlugin({compress: {warnings: false}}),
    new HtmlwebpackPlugin({
      title: 'Webpack-demos',
      template:  path.resolve(PATH.src, 'index.html'),
      inject: 'body',
    }),
    new OpenBrowserPlugin({url: 'http://localhost:8080'}),
    new CommonsChunkPlugin('init.js'),
    devFlagPlugin,
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader?presets[]=es2015&presets[]=react'],
      include: path.join(PATH.src, 'scripts')
    },
    { test: /\.scss$/,
      loader: 'style-loader!css-loader?moudle!sass-loader',
      include: path.join(PATH.src, 'styles')
    },
    { test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192',
      include: path.join(PATH.src, 'images')
    },
    ]
  }
};
