// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  // extraPostCSSPlugins: [
  //   require('tailwindcss')({ config: '[custom_path]/tailwind.config.js' }),
  //   require('autoprefixer'),
  // ],
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
});
