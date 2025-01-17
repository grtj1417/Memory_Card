import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

export default {
    mode: 'development',
    entry: './src/main.jsx',
    output: {
        filename: 'index_bundle.js',
        path: path.resolve('./dist'),
        clean: true
    },
    target: 'web',
    devServer: {
        port: '4000',
        static: {
            directory: path.resolve('./public')
        },
        open: true,
        hot: true,
        liveReload: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/images/*.webp', to: 'images/[name][ext]' },
                { from: 'public/images/*.svg', to: 'images/[name][ext]' },
                { from: 'public/images/*.jpg', to: 'images/[name][ext]' },
                { from: 'public/images/*.png', to: 'images/[name][ext]' },
                { from: 'public/videos/*.mp4', to: 'videos/[name][ext]' }
            ],
        }),

    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
            {
                test: /\.webp$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[name].[hash:8].[ext]',
                        outputPath: 'images/'
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(mp3|wav|mp4)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: (url, resourcePath, context) => {
                                if (/\.(mp3|wav)$/.test(resourcePath)) {
                                    return `audio/${url}`;
                                }
                                if (/.mp4$/.test(resourcePath)) {
                                    return `videos/${url}`;
                                }
                                return url;
                            }
                        }
                    }
                ]
            },
        ]
    }
};
