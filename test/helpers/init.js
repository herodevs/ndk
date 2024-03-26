const path = require('path')

if (global._tsnodeCache) {
  Object.keys(require.cache)
    .filter(k => !global._tsnodeCache.includes(k))
    .forEach(k => delete require.cache[k])
} else {
  global._tsnodeCache = Object.keys(require.cache)
}




process.env.TS_NODE_PROJECT = path.resolve('test/tsconfig.json')
process.env.NODE_ENV = 'development'

global.oclif = global.oclif || {}
global.oclif.columns = 80
