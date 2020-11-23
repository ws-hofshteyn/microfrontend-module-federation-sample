const path = require("path");
const webpack = require("webpack");
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const deps = require("./package.json").dependencies;

module.exports = {
    entry: {
        main: ['@babel/polyfill', path.resolve('.', 'src', 'index.js')]
    },
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "public"),
        host: 'localhost',
        port: 3000,
        historyApiFallback: true
    },
    output: {
        publicPath: "http://localhost:3000/",
        chunkFilename: "[id].[contenthash].js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react"],
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "rootApp",
            library: { type: "var", name: "rootApp" },
            filename: "remoteEntry.js",
            remotes: {
                microfrontendApp: "microfrontendApp",
            },
            exposes: {
                "./App": "./src/App",
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"]
                },
                "react-router-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"]
                },
            }
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        })
    ],
};