const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = (env: any) => {
  // https://webpack.js.org/guides/environment-variables/ Use env.<YOUR VARIABLE> here:
  console.log('KEYPOST_APP_HOST: ', env.KEYPOST_APP_HOST);
  console.log('production: ', env.production || false);

  return {
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
      // https://github.com/jantimon/html-webpack-plugin#options
      new HtmlWebpackPlugin({
        title: 'tutorial', 
        template: 'src/custom.html',
        filename: 'custom.html'}),
      new HtmlWebpackPlugin({
        title: 'Keypost Home',
        template: 'src/index.html',
        filename: 'index.html'})
    ],

    devServer: {
      static: path.join(__dirname, "dist"),
      compress: true,
      port: 4000,
    },
  };
};
