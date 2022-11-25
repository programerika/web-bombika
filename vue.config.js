const { defineConfig } = require("@vue/cli-service");
const _ = require("lodash");
module.exports = defineConfig({
  transpileDependencies: true,
  css: { extract: false },
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
  devServer: {
    proxy: {
      "^/api": {
        target: `http://${process.env.VUE_APP_API_URL}/`,
      },
    },
  },
  configureWebpack: {
    output: {
      libraryExport: "default",
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("css")
      .oneOf("normal")
      .use("postcss-loader")
      .tap((options) => {
        _.merge(options, postcssRemoveGlobalStyle);

        return options;
      });
  },
});

const postcssRemoveGlobalStyle = {
  postcssOptions: {
    plugins: [
      [
        "postcss-prefix-selector",
        {
          prefix: ".bombikaGlobalCss",
          transform(prefix, selector, prefixedSelector, filePath, rule) {
            if (selector.match(/^([*])/)) {
              return prefixedSelector;
            }

            return selector;
          },
        },
      ],
    ],
  },
};
