module.exports = {
    entry: [
        './src/index.js',
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            query: { presets: ['react', 'es2015'] },
        }, {
            test: /\.css$/,
            loader: 'style!css!',
        }],
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
    },
    devServer: {
        contentBase: './',
    },
};
