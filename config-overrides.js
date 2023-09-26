/*
 * @Author: linjingcheng 1152691418@qq.com
 * @Date: 2022-10-02 20:37:36
 * @LastEditors: linjingcheng 1152691418@qq.com
 * @LastEditTime: 2022-10-02 20:42:07
 * @FilePath: \metabubble-join\config-overrides.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const {
    override,
    addDecoratorsLegacy,
    disableEsLint,
    addWebpackAlias
} = require("customize-cra");
const path = require("path");
module.exports = function override(config, env) {
    //do stuff with the webpack config...
    return config;
}