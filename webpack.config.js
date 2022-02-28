var webpack = require('webpack');
var WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;
const path = require('path');

module.exports = {
  entry: './src/js/react-timeslot-calendar.jsx',

  output: {
    path: path.join(__dirname, './build'),
    filename: 'build.min.js',
    libraryTarget: 'umd',
  },
  plugins: [
    new WebpackBundleSizeAnalyzerPlugin('./reports/plain-report.txt'),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
            },
          },
        ],
      },
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
    // loaders: [
    //   {
    //     test: /\.jsx?$/,
    //     exclude: /node_modules/,
    //     loader: 'babel-loader',
    // query: {
    //   presets: ['react', 'es2015'],
    // },
    //   },
    //   {
    //     test: /\.scss$/,
    //     use: [{
    //       loader: 'style-loader', // creates style nodes from JS strings
    //     }, {
    //       loader: 'css-loader', // translates CSS into CommonJS
    //     }, {
    //       loader: 'sass-loader', // compiles Sass to CSS
    //     }],
    //   },
    // ],
  },
};
