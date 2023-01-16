module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: 8800,
  },
  // https://www.youtube.com/watch?v=SH6Y_MQzFVw
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: 'style-loader',
          // },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              },
            },
          },
        ],
      },
    ],
  },
};
