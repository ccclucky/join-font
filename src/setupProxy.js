// /*
//  * @Author: linjingcheng 1152691418@qq.com
//  * @Date: 2022-10-02 10:22:07
//  * @LastEditors: linjingcheng 1152691418@qq.com
//  * @LastEditTime: 2022-10-02 11:52:39
//  * @FilePath: \metabubble-join\src\setupProxy.js
//  * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
//  */
const { createProxyMiddleware } = require("http-proxy-middleware");
console.log("PROXY: ", process.env.PROXY_ENV);

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      // target: 'http://114.132.162.245:13333',
      target: "http://localhost:3333",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    }),
    createProxyMiddleware("/file", {
      target: "http://114.132.162.245:9000",
      changeOrigin: true,
      pathRewrite: {
        "^/file": "",
      },
    })
  );
};
