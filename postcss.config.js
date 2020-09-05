module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8'],
    },
    'postcss-px2rem': {
      remUnit: 25,
      // 需要转换的属性 * 表示所有
      propList: ['*'],
      // 忽略的文件夹
      exclude: /(common.css|node_modules)/gi
    }
  }
}
