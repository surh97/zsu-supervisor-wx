module.exports = {
  devServer: {
    port: 8990,
  },
  //webpack配置
  configureWebpack: {
    //关闭 webpack 的性能提示
    performance: {
      hints:false
    },
    //或者
    //警告 webpack 的性能提示
    performance: {
      hints:'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/zsu-wx/' : '/',
  // baseUrl: process.env.NODE_ENV === 'production' ? '/zsu-wx/' : '/',
  // chainWebpack: (config) => {
  //   config.module
  //     .rule('compile')
  //     .test(/\.ts$/)
  //     .include.add('node_modules | vue')
  //     .add('src')
  //     .end()
  //     .use('cache-loader')
  //     .loader('cache-loader')
  //     .end()
  //     .use('thread-loader')
  //     .loader('thread-loader')
  //     .options({
  //       workers: require('os').cpus().length - 1,
  //     })
  //     .end()
  //     .use('ts-loader')
  //     .loader('ts-loader')
  //     .options({
  //       happyPackMode: true,
  //       appendTsSuffixTo: [/\.vue$/],
  //       transpileOnly: true,
  //     });
  //   config.plugin('html').tap((args) => {
  //     args[0].chunksSortMode = 'none';
  //     args[0].title = '中山大学督导评教系统';
  //     args[0].favicon ='public/favicon.ico';
  //     return args;
  //   });
  // },
};
