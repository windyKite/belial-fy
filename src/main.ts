import * as https from 'https'
import * as querystring from 'querystring'
const md5 = require('md5')

export const translate = (word) => {
  const appid = ''
  const secret = ''
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
    hostname: 'https://fanyi-api.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate' + query,
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    console.log('状态码:', res.statusCode);
    console.log('请求头:', res.headers);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();

}