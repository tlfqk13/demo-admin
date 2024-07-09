const {defineConfig} = require('@vue/cli-service')
module.exports = {
  transpileDependencies: [],
  outputDir: "../../src/main/resources/static",
  devServer: {
    proxy: 'http://localhost:8080', // 서버 프로젝트 포트번호와 동일할 것
  },
};
