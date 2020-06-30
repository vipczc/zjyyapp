const path = require('path')
const fs = require('fs')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const resolve = dir => {
  return path.join(__dirname, dir)
}

// cdn预加载使用
const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'js-cookie': 'Cookies',
}

const cdn = {
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.6/dist/vue.min.js',
      'https://unpkg.com/vue-router@3.0.2/dist/vue-router.min.js',
      'https://unpkg.com/vuex@3.1.0/dist/vuex.min.js',
      'https://unpkg.com/axios/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js',
    ]
}
// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']

const env = process.env.NODE_ENV || 'development'
const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testing';

// fs.writeFileSync(
//   path.join(__dirname, './config/env.js'),
//   `export default '${env}'`
// )

if( env != 'development' ){
  fs.writeFileSync(
    path.join(__dirname, env),
    `export default '${env}'`
  )
}else{
  fs.writeFileSync(
    path.join(__dirname, env),
    `export default '${env}'`
  )
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'

const BASE_URL = env === 'production' ? 'http://sfile.9mededu.com/zj2y_app/dist/' :  env === 'testing' ? 'http://sfile.9mededu.com/zj2y_app/dist/' : '/'

const config = {
  // baseUrl: '/',
  devServer: {
    host: '0.0.0.0',
    port: 8002,
    open: true,
    // hot: true,
    // https: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://39.104.19.41:8080/',
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
    // proxy: {
    //   '/api': {
    //     target: 'http://39.104.19.41:8080',
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  },
  outputDir: './public/dist',
  filenameHashing: true,
  publicPath: BASE_URL,
  assetsDir: './', // 静态资源目录
  configureWebpack: config => {
    const myConfig = {}
    if (env === 'production') {
      config.optimization.splitChunks.cacheGroups = {
        'vender-base': {
          name: 'vender-base',
          test: 'vender-base',
          chunks: 'all'
        },
        'vender-exten': {
          name: 'vender-exten',
          test: 'vender-exten',
          chunks: 'all'
        }
      }
      // 1. 生产环境npm包转CDN
      myConfig.externals = externals

      myConfig.plugins = []
      //构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip && myConfig.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 8192,
          minRatio: 0.8
        })
      )
      myConfig.performance = {
        hints:false
      }
      myConfig.optimization = {
        minimizer: [
          new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,
            include: /\/includes/,
            exclude: /\/excludes/,
            cache: true,
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
              warnings: false,
              mangle: true, // Note `mangle.properties` is `false` by default.
              toplevel: false,
              ie8: false,
              keep_fnames: false
            }
          })
        ]
      }
    }
    return myConfig
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
      .set('_static', resolve('static'))
      .set('_api', resolve('src/api'))
      config.output.filename('[name].[hash].js').end();
      config.output.chunkFilename('js/[name].[hash].js').end();
      // config.plugin('extract-css').tap(args => [{
      //   filename: `css/[name].[hash].css`,
      //   chunkFilename: `css/[name].[hash].css`
      // }])
      config.plugin('html').tap(args => {
        args[0].favicon = resolve('public/favicon.ico')
        args[0].chunksSortMode = 'none'
        if (isProduction) {  args[0].cdn = cdn } //添加CDN参数到htmlWebpackPlugin配置中
        return args
      })
      if (env === 'production' || env === 'testing') { // 生产环境下代码拆分打包
        config.entry('vender-base').add(resolve('src/vendors/vendors.base.js')).end()
        config.entry('vender-exten').add(resolve('src/vendors/vendors.exten.js')).end()
      }
  },
  css: {
    sourceMap: env === 'development',
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      },
      css: {
        localIdentName: '[name]-[hash]',
        camelCase: 'only'
      }
    }

  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 关闭ESLINT
  lintOnSave: false
}

module.exports = config