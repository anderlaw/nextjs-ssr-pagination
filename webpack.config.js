const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'MyComponentLibrary',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/, // 匹配所有 .scss 文件
        use: [
          MiniCssExtractPlugin.loader, // 提取 CSS 到单独的文件
          'css-loader', // 将 CSS 转换成 CommonJS 模块
          'sass-loader', // 将 SCSS 编译成 CSS
        ],
        // use: [
        //   'style-loader', // 将 CSS 注入到 DOM 中
        //   'css-loader', // 解析 CSS
        //   'sass-loader' // 编译 Sass 到 CSS
        // ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css', // 输出的 CSS 文件名
    }),
  ],
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
};