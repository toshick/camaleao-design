/**
 * storybook
 */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
// const webpack = require('webpack');
const rootPath = path.resolve(__dirname, '../');

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],

  webpackFinal: async (config, { configType }) => {
    config.resolve.alias['~'] = rootPath;
    config.resolve.alias['@'] = rootPath;

    config.module.rules.push({
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true, // used with ForkTsCheckerWebpackPlugin
          },
        },
        // {
        //   loader: 'css-loader',
        // },
      ],
    });
    config.plugins.push(new ForkTsCheckerWebpackPlugin());
    // Return the altered config
    return config;
  },
};
