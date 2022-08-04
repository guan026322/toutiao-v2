const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3006,
    open: true,
    host: 'localhost'
  },
  lintOnSave: false

})
