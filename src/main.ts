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
  console.log(query)

  const options = {
    hostname: 'api.fanyi.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate?' + query,
    method: 'GET'
  };

  const request = https.request(options, (response) => {
    console.log('状态码:', response.statusCode);
    console.log('请求头:', response.headers);

    response.on('data', (d) => {
      console.log('d')
      process.stdout.write(d);
    });

  });


  request.on('error', (e) => {
    console.log('1')
    console.error(e);
  });

  request.end();

}