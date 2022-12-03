module.exports = {
  rules: [
    {
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader', // translates CSS into CommonJS
        },
        {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            lessOptions: {
              modifyVars: {
                'primary-color': '#77d392',
                'link-color': '#1DA57A',
                'border-radius-base': '6px',
              },
              javascriptEnabled: true,
            },
          },
        },
      ],
    },
  ],
};
