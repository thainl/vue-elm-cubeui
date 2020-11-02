module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8'],
    },
    "postcss-pxtorem": {
      rootValue: 25,
      // 需要转换的属性 * 表示所有
      propList: ['*'],
      // 不转换的文件
      exclude: /common.css/gi
    }
  }
}
