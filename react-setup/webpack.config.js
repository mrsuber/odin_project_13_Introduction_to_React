const path = require('path');

module.exports = {

  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader'
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']

      }
    ]
  },
  devServer:{
    contentBase:path.join(__dirname,'public'),
    compress: true,
    port: 9000,
    watchContentBase: true,
  }

};
