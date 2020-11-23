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
    resolve: {
        alias: {
            src: path.resolve('.', 'src')
        },
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        host: 'localhost',
        port: 3001,
        historyApiFallback: true
    },
    output: {
        publicPath: "http://localhost:3001/",
        chunkFilename: "[id].[contenthash].js"
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
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
            name: "microfrontendApp",
            library: { type: "var", name: "microfrontendApp" },
            filename: "remoteEntry.js",
            exposes: {
                "./MicrofrontendService": "./src/MicrofrontendService"
            },
            remotes: {
                rootApp: "rootApp"
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
            }
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        })
    ]
};