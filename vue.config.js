const {resolve} = require('path');
const {seller, goods, ratings} = require('./data.json');
module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    before(app, server) {
      app.get('/api/seller', (req, res)=> {
        res.json({
          errno: 0,
          data: seller,
        })
      });
      app.get('/api/goods', (req, res)=> {
        res.json({
          errno: 0,
          data: goods,
        })
      });
      app.get('/api/ratings', (req, res)=> {
        res.json({
          errno: 0,
          data: ratings,
        })
      })
    },
    port: 2889,
    open: true,
  },
  publicPath: '/',
  lintOnSave: false,
  // chainWebpack(config) {
  //   config.resolve.alias
  //     .set('components', resolve(__dirname, 'src/components'))
  //     .set('assets', resolve(__dirname, 'src/assets'))
  // }
}
