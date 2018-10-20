'use strict';

const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlPlugin = require("html-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");

let config = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './app'
    },

    output: {
        path: __dirname + '/public',
        filename: '[name].[chunkhash].js',
    },

    resolve: {
        extensions: ['.js', '.scss']
    },

    devtool: 'source-map',

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime',
                        '@babel/plugin-syntax-dynamic-import']
                }
            }
        }, {
            test: /\.hbs$/,
            use: {
                loader: 'handlebars-loader',
                options: {
                    precompileOptions: {
                        rootRelative: './tableHelper.js',
                        knownHelpersOnly: false
                    }
                }
            }
        }, {
            test: /\.scss$/,
            use: [
                {loader: MiniCssExtractPlugin.loader},
                {
                    loader: 'css-loader',
                    options: {sourceMap: true}
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        plugins: [
                            require('autoprefixer')({
                                browsers: ['ie >= 8']
                            })
                        ]
                    }
                },
                {
                    loader: 'resolve-url-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        sourceMapContents: true
                    }
                }
            ]
        }, {
            test: /\.(png|jpg|svg|ttf|otf)$/,
            exclude: /\\node_modules\\/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:6].[ext]',
                    outputPath: './fonts/'
                }
            },
        }]
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true
                    }
                }
            })
        ],
    },

    plugins: [
        new CleanPlugin(['public']),

        new HtmlPlugin({
            filename: './index.html',
            chunks: ['scss/styles', 'app'],
            template: './template.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeEmptyAttributes: true
            }
        }),

        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash].css'
        }),
    ]
};

module.exports = () => {
    let development = config.mode === 'development';

    if (development) {
        config.devtool = 'cheap-module-eval-source-map';

        config.devServer = {
            host: 'localhost',
            port: '8080',
            open: true,
            hot: true
        };

        config.output.filename = '[name].js';
        config.output.chunkFilename = '[id].js';

        config.module.rules[2].use.shift();
        config.module.rules[2].use.unshift({
            loader: 'style-loader',
            options: {
                sourceMap: true
            }
        });

        config.plugins.splice(1, 2,
            new HtmlPlugin({
                filename: './index.html',
                chunks: ['app'],
                template: './template.html',

            }),

            new MiniCssExtractPlugin({
                filename: 'styles.css',
            })
        );
    }
    return config;
};


