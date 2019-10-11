const path = require('path');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
const DefinePlugin = require('@wepy/plugin-define');
const PluginUglifyjs = require('@wepy/plugin-uglifyjs');

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
            plugins: [new LessPluginAutoPrefix({ browsers: ['Android >= 4.2', 'Chrome > 40', 'iOS >= 6'] })],
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

if (IS_RELEASE) {
    module.exports.plugins = module.exports.plugins.concat([
        PluginUglifyjs({
            compress: true,
            output: {
                comments: false,
            },
        }),
    ]);
}
