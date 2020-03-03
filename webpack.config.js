/*
 * @Author: miao yu
 * @Date: 2020-03-03 17:49:43
 * @LastEditors: miao yu
 * @LastEditTime: 2020-03-03 17:49:44
 * @Description: 
 */
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};