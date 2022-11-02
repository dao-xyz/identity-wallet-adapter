/* const {
    override,
    addBabelPlugins,
    addExternalBabelPlugins,
    addWebpackPlugin,
} = require('customize-cra');
const { DefinePlugin } = require('webpack');
 */

const webpack = require("webpack")

module.exports = config => {
    let loaders = config.resolve
    loaders.fallback = {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "events": require.resolve("events"),
        "path": require.resolve("path-browserify"),
        "buffer": require.resolve("buffer"),

        /*           "timers": require.resolve('timers-browserify'), */
        /*         "url": require.resolve('url'),
                "child_process": false,
                "fs": false,
                "assert": false */

    }

    config.plugins.push(new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
    }))
    /*   config.module.rules = [...config.module.rules,
      {
          test: /\.m?js/,
          resolve: {
              fullySpecified: false
          }
      }
      ] */

    /* config.plugins.push(new webpack.DefinePlugin({
        process: { env: {} }
    })) */
    /*  addWebpackPlugin(
         new DefinePlugin({
             process: { env: {} }
         }),
     ) */

    /*  
     
     */

    return config;
}