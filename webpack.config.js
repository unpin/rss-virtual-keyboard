import { dirname } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const root = dirname(fileURLToPath(import.meta.url));
const PRODUCTION = process.env.NODE_ENV === 'production';

export default {
  entry: './src/index.js',
  output: {
    path: `${root}/dist`,
    filename: 'bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/assets/favicon.png',
      template: './src/index.html',
      minify: PRODUCTION,
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                'postcss-nesting',
              ],
            },
          },
        }],
      },
    ],
  },
};
