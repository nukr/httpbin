import Koa from 'koa'
import Router from 'koa-router'
import logger from 'koa-logger'
import compress from 'koa-compress'
import { compile } from 'handlebars'
import fs from 'mz/fs'

const app = new Koa()
const router = new Router()

router.get('/', async (context) => {
  const source = await fs.readFile('src/index.html', 'utf8')
  const template = compile(source)
  const html = template()
  context.body = html
  context.status = 200
})

router.get('/ip', (context) => {
  let re = /^http:\/\//
  context.body = {
    origin: context.origin.replace(re, '')
  }
})

router.get('/user-agent', (context) => {
  context.body = {
    "user-agent": context.get('User-Agent')
  }
})

router.get('/headers', (context) => {
  context.body = {
    headers: context.headers
  }
})

router.all(/get|post|patch|put|delete/, (context) => {
  let re = /^http:\/\//
  context.body = {
    args: context.query,
    headers: context.headers,
    origin: context.origin.replace(re, ''),
    url: context.origin
  }
})

router.all('/gzip', compress({
  filter: () => true,
  threshold: 1,
  flush: require('zlib').Z_SYNC_FLUSH
}), async (context) => {
  let re = /^http:\/\//
  context.body = {
    gzipped: true,
    headers: context.headers,
    method: context.method,
    origin: context.origin.replace(re, '')
  }
})

router.all('/deflate', compress({
  filter: () => true,
  threshold: 1,
  flush: require('zlib').Z_SYNC_FLUSH
}), async (context) => {
  let re = /^http:\/\//
  context.body = {
    gzipped: true,
    headers: context.headers,
    method: context.method,
    origin: context.origin.replace(re, '')
  }
})

router.all('/response-headers', (context) => {
  Object.keys(context.query).forEach((key) => {
    context.set(key, context.query[key])
  })
  context.body = { ...context.query }
})

router.all('/status/:code', (context) => {
  context.status = parseInt(context.params.code, 10)
})

router.all('/relative-redirect/:n', async (context) => {
  if(parseInt(context.params.n, 10) === 1) return context.redirect('/get')

  await sleep(300)
  context.redirect(`/relative-redirect/${parseInt(context.params.n, 10) - 1}`)
})

router.all('/redirect/:n', (context) => {
  context.redirect(`/relative-redirect/${parseInt(context.params.n, 10) - 1}`)
})

router.all('/redirect-to', (context) => {
  context.redirect(context.query.url)
})

router.all('/cookies', (context) => {
  let cookies = context.headers.cookie.split('; ')
    .reduce((acc, cookie) => {
      cookie = cookie.split('=')
      acc[cookie[0]] = cookie[1]
      return acc
    }, {})

  context.body = {
    cookies
  }
})

router.all('/cookies/set', (context) => {
  Object.keys(context.query).forEach((key) => {
    context.cookies.set(key, context.query[key])
  })
  context.body = {
    cookies: context.query
  }
})

router.get('/favicon.ico', (context) => {
  context.status = 200
})

// app.use(logger())
app.use(router.routes())

module.exports = app

function sleep (t) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t)
  })
}
