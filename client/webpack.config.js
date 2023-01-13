module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: 8800,
  },
  // https://www.youtube.com/watch?v=SH6Y_MQzFVw
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['css-loader'],
      },
    ],
  },
};
