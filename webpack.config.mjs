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
                { from: 'public/images', to: 'images' }
            ]
        })
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
                  'style-loader', // 將解析後的CSS轉換成styles標籤插入到HTML中
                  'css-loader', // 解析CSS文件中的@import和url(), 並處理它们
                  'sass-loader' // 編譯SCSS文件為CSS
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