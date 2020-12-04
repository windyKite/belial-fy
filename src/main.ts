import * as https from 'https'
import * as querystring from 'querystring'
const md5 = require('md5')
import { appid, secret } from './private'

export const translate = (word) => {
  const salt = Math.random()
  const sign = md5(appid + word + salt + secret)

  const query: string = querystring.stringify({
    q: word,
    from: 'en',
    to: 'zh',
    appid,
    salt,
    sign,
  })

  const options = {
    hostname: 'api.fanyi.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate?' + query,
    method: 'GET'
  };

  const request = https.request(options, (response) => {
    let chunks = [];
    response.on('data', (chunk) => {
      chunks.push(chunk);
    });

    response.on('end', () => {
      const string = Buffer.concat(chunks).toString();
      type baiduResult = {
        error_code?: string;
        error_msg?: string;
        from: string;
        to: string;
        trans_result: { src: string; dst: string }[]
      }
      const object: baiduResult = JSON.parse(string)
      console.log(object.trans_result[0].dst);
    })
  });


  request.on('error', (e) => {
    console.error(e);
  });

  request.end();
}