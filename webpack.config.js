const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { withZephyr } = require("zephyr-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  console.log("🔍 [REMOTE] Build mode:", argv.mode);
  console.log("🔍 [REMOTE] Is production:", isProduction);

  const baseConfig = {
    entry: "./src/index.ts",
    mode: argv.mode || "development",
    devServer: {
      port: 3001,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      hot: true,
    },
    output: {
      publicPath: "auto",
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-typescript"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "remotetodo",
        filename: "remoteEntry.js",
        exposes: {
          "./TodoApp": "./src/TodoApp.tsx",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: "^18.2.0",
          },
          "react-dom": {
            singleton: true,
            requiredVersion: "^18.2.0",
          },
          "react-router-dom": {
            singleton: true,
            requiredVersion: "^6.30.1",
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        title: "Remote Todo App",
      }),
    ],
  };

  return withZephyr()(baseConfig);
};
