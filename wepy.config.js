const path = require('path');
const DefinePlugin = require('@wepy/plugin-define');

const IS_RELEASE = process.env.NODE_ENV === 'production';

module.exports = {
    wpyExt: '.wpy',
    eslint: true,
    cliLogs: !IS_RELEASE,
    build: {},
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
        modules: ['node_modules'],
    },
    compilers: {
        less: {
            compress: IS_RELEASE,
        },
        babel: {
            sourceMap: true,
            presets: ['@babel/preset-env'],
            plugins: ['@wepy/babel-plugin-import-regenerator'],
        },
    },
    plugins: [
        DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    appConfig: {
        noPromiseAPI: ['createSelectorQuery'],
    },
};
