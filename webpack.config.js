const { USE_WEBDISCUS }  = process.env;

module.exports = {
  mode: 'production',
  entry: './src/app.js',
  output: {
    path: __dirname + '/dist',
    filename: "[name].js"
  },
  optimization: {
    minimizer: [ new (require('terser-webpack-plugin'))({
      terserOptions: {
        mangle: false,
        module: false,
        output: null,
        format: true,
        toplevel: true,
        keep_classnames: true,
        keep_fnames: true,
      }
    })],
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [{
          loader: 'html-loader',
          options: {
            esModule: false,
          }
        }, USE_WEBDISCUS ? {
          loader: '@webdiscus/pug-loader',
          options: {
            method: 'render',
          },
        } : {
          loader: 'pug-html-loader',
          options: {
            doctype: 'html',
          }
        }],
      }
    ]
  }
}