export const config = {
  target: 'node16',
  entry: {
    index: './src/index.mjs',
  },
  output: {
    path: 'dist',
  },
  chain(chain) {
    chain.module
      .rule('string-replace')
      .test(/groovy-beautify/)
      .use('string-replace')
      .loader('string-replace-loader')
      .options({
        search: /4/g,
        replace: '2',
      });
  },
};
