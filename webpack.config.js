const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/** @type {import('webpack').Configuration} */
const config = {
  mode: "development",
  devtool: "source-map",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: `./[name].js`,
  },
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.s?css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")({ grid: true })],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        generator: {
          filename: `image/[name][ext]`,
        },
        type: "asset/resource",
      },
      {
        test: /\.(ttf|otf|woff)/,
        generator: {
          filename: `font/[name][ext]`,
        },
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        use: "html-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: "style.css",
    }),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "head",
      chunks: ["index"],
    }),
  ],
};

module.exports = config;
