import test from 'ava'
import request from 'supertest-as-promised'
import { jsdom } from 'jsdom'
import app from '../src'

test('/', async (t) => {
  const response = await request(app.listen()).get('/')

  t.is(response.status, 200)
})

test('/favicon.ico', async (t) => {
  const response = await request(app.listen()).get('/favicon.ico')

  t.is(response.status, 200)
})

test('/ip', async (t) => {
  const response = await request(app.listen()).get('/ip')
  const re = /^127\.0\.0\.1:([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
  t.is(response.status, 200)
  t.regex(response.body.origin, re)
})

test('/user-agent', async (t) => {
  const response = await request(app.listen()).get('/user-agent')
  const re = /^node-superagent\/.*$/
  t.is(response.status, 200)
  t.regex(response.body['user-agent'], re)
})

test('/headers', async (t) => {
  const response = await request(app.listen()).get('/headers').set('test', 'httpbin')
  t.is(response.status, 200)
  t.is(response.body.headers.test, 'httpbin')
})

test('/get?test=true', async (t) => {
  const response = await request(app.listen())
  .get('/get?test=httpbin')

  t.is(response.status, 200)
  t.is(response.body.args.test, 'httpbin')
})

test('/get header', async (t) => {
  const response = await request(app.listen())
  .get('/get')
  .set('test', 'httpbin')

  t.is(response.status, 200)
  t.is(response.body.headers.test, 'httpbin')
})

test('/get origin', async (t) => {
  const response = await request(app.listen()).get('/get')
  const re = /^127\.0\.0\.1:([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
  t.is(response.status, 200)
  t.true(re.test(response.body.origin))
})

test('/get url', async (t) => {
  const response = await request(app.listen()).get('/get')
  const re = /^http:\/\/127\.0\.0\.1:([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
  t.is(response.status, 200)
  t.regex(response.body.url, re)
})

test('/post?test=true', async (t) => {
  const response = await request(app.listen())
  .post('/post?test=httpbin')

  t.is(response.status, 200)
  t.is(response.body.args.test, 'httpbin')
})

test('/post header', async (t) => {
  const response = await request(app.listen())
  .post('/post')
  .set('test', 'httpbin')

  t.is(response.status, 200)
  t.is(response.body.headers.test, 'httpbin')
})

test('/post origin', async (t) => {
  const response = await request(app.listen()).post('/post')
  const re = /^127\.0\.0\.1:([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
  t.is(response.status, 200)
  t.true(re.test(response.body.origin))
})

test('/post url', async (t) => {
  const response = await request(app.listen()).post('/post')
  const re = /^http:\/\/127\.0\.0\.1:([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
  t.is(response.status, 200)
  t.regex(response.body.url, re)
})

test('/patch?test=true', async (t) => {
  const response = await request(app.listen())
  .patch('/patch?test=httpbin')

  t.is(response.status, 200)
  t.is(response.body.args.test, 'httpbin')
})

test('/patch header', async (t) => {
  const response = await request(app.listen())
  .patch('/patch')
  .set('test', 'httpbin')

  t.is(response.status, 200)
  t.is(response.body.headers.test, 'httpbin')
})

test('/patch origin', async (t) => {
  const response = await request(app.listen()).patch('/patch')
  const re = /^127\.0\.0\.1:([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
  t.is(response.status, 200)
  t.true(re.test(response.body.origin))
})

test('/patch url', async (t) => {
  const response = await request(app.listen()).patch('/patch')
  const re = /^http:\/\/127\.0\.0\.1:([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
  t.is(response.status, 200)
  t.regex(response.body.url, re)
})

test('/put?test=true', async (t) => {
  const response = await request(app.listen())
  .put('/put?test=httpbin')

  t.is(response.status, 200)
  t.is(response.body.args.test, 'httpbin')
})

test('/put header', async (t) => {
  const response = await request(app.listen())
  .put('/put')
  .set('test', 'httpbin')

  t.is(response.status, 200)
  t.is(response.body.headers.test, 'httpbin')
})

test('/put origin', async (t) => {
  const response = await request(app.listen()).put('/put')
  const re = /^127\.0\.0\.1:([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
  t.is(response.status, 200)
  t.true(re.test(response.body.origin))
})

test('/put url', async (t) => {
  const response = await request(app.listen()).put('/put')
  const re = /^http:\/\/127\.0\.0\.1:([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
  t.is(response.status, 200)
  t.regex(response.body.url, re)
})

test('/delete?test=true', async (t) => {
  const response = await request(app.listen())
  .delete('/delete?test=httpbin')

  t.is(response.status, 200)
  t.is(response.body.args.test, 'httpbin')
})

test('/delete header', async (t) => {
  const response = await request(app.listen())
  .delete('/delete')
  .set('test', 'httpbin')

  t.is(response.status, 200)
  t.is(response.body.headers.test, 'httpbin')
})

test('/delete origin', async (t) => {
  const response = await request(app.listen()).delete('/delete')
  const re = /^127\.0\.0\.1:([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
  t.is(response.status, 200)
  t.true(re.test(response.body.origin))
})

test('/delete url', async (t) => {
  const response = await request(app.listen()).delete('/delete')
  const re = /^http:\/\/127\.0\.0\.1:([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
  t.is(response.status, 200)
  t.regex(response.body.url, re)
})

// TODO
// test('/encoding/utf8', async (t) => {
// })

test('/gzip', async (t) => {
  const response = await request(app.listen()).get('/gzip').set('accept-encoding', 'gzip')
  t.is(response.status, 200)
  t.is(response.headers['content-encoding'], 'gzip')
})

test('/deflate', async (t) => {
  const response = await request(app.listen()).get('/deflate').set('accept-encoding', 'deflate')
  t.is(response.status, 200)
  t.is(response.headers['content-encoding'], 'deflate')
})

test('/status/:code 200', async (t) => {
  const response = await request(app.listen()).get('/status/200')
  t.is(response.status, 200)
})

test('/status/:code 418', async (t) => {
  const response = await request(app.listen()).get('/status/418')
  t.is(response.status, 418)
})

test('/status/:code 400', async (t) => {
  const response = await request(app.listen()).get('/status/400')
  t.is(response.status, 400)
})

test('/status/:code 500', async (t) => {
  const response = await request(app.listen()).get('/status/500')
  t.is(response.status, 500)
})

test('/response-headers?key=val', async (t) => {
  const response = await request(app.listen()).get('/response-headers?test=httpbin')
  t.is(response.status, 200)
  t.is(response.body.test, 'httpbin')
  t.is(response.headers.test, 'httpbin')
})

test('/redirect/:n', async (t) => {
  t.plan(2)
  let rand = Math.floor(Math.random() * 5) + 2 // 2 ~ 6
  console.log(rand)
  const response = await request(app.listen()).get(`/redirect/${rand}`).redirects(rand)
  t.is(response.status, 200)
  t.is(response.redirects.length, rand)
})

test('/redirect-to?url=foo', async (t) => {
  t.plan(3)
  const response1 = await request(app.listen())
  .get('/redirect-to?url=http://example.com')
  t.is(response1.status, 302)

  const response2 = await request(app.listen())
  .get('/redirect-to?url=http://example.com').redirects(1)
  t.is(response2.status, 200)
  let document = jsdom(response2.text)
  t.is(document.title, 'Example Domain')
})

test('/relative-redirect/:n', async (t) => {
  t.plan(2)
  let rand = Math.floor(Math.random() * 5) + 2// 2 ~ 6
  const response = await request(app.listen())
  .get(`/relative-redirect/${rand}`)
  .redirects(rand)
  t.is(response.status, 200)
  t.is(response.redirects.length, rand)
})

// test('/absolute-redirect/:n', async (t) => {
//   t.plan(2)
//   let rand = Math.floor(Math.random() * 10) // 0 ~ 9
// })

test('/cookies', async (t) => {
  t.plan(2)
  const response = await request(app.listen())
  .get('/cookies')
  .set('cookie', 'test=httpbin; gg=11')

  t.is(response.status, 200)
  t.is(response.body.cookies.test, 'httpbin')
})

test('/cookies/set?name=value', async (t) => {
  t.plan(3)
  const response = await request(app.listen())
  .get('/cookies/set?test=httpbin')

  t.is(response.status, 200)
  t.is(response.body.cookies.test, 'httpbin')
  t.truthy(response.headers['set-cookie'].indexOf('test=httpbin'))
})

// test('/cookies/delete?name', async (t) => {
//   t.plan(2)
//   const response = await request(app.listen())
//     .get('/cookies/delete?test')

//   t.is(response.status, 200)
//   t.falsy(response.body.cookies.test)
// })
// test('/basic-auth/:user/passwd')
// test('/hidden-basic-auth/:user/passwd')
// test('/digest-auth/:qop/:user/:passwd')
// test('/stream/:n')
// test('/delay/:n')
// test('/drip?numbytes=n&duration=s&delay=s&code=code')
// test('/range/1024?duration=s&chunk_size=code')
// test('/html')
// test('/robots.txt')
// test('/deny')
// test('/cache')
// test('/cache/:n')
// test('/bytes/:n')
// test('/stream-bytes/:n')
// test('/links/:n')
// test('/image')
// test('/image/png')
// test('/image/jpeg')
// test('/image/webp')
// test('/image/svg')
// test('/forms/post')
// test('/xml')

