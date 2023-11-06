module.exports = {
    entry: './src/main.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.csv$/,
                loader: 'csv-loader',
                options: {
                    dynamicTyping: true,
                    skipEmptyLines: true,
                }
            }
        ],
    },
    output: {
        path: `${__dirname}/public`,
        filename: 'bundle.js',
    },
};
