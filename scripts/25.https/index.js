/*
{
  Agent: [Function: Agent],
  globalAgent: Agent {
    _events: [Object: null prototype] {
      free: [Function (anonymous)],
      newListener: [Function: maybeEnableKeylog]
    },
    _eventsCount: 2,
    _maxListeners: undefined,
    defaultPort: 443,
    protocol: 'https:',
    options: [Object: null prototype] { noDelay: true, path: null },
    requests: [Object: null prototype] {},
    sockets: [Object: null prototype] {},
    freeSockets: [Object: null prototype] {},
    keepAliveMsecs: 1000,
    keepAlive: false,
    maxSockets: Infinity,
    maxFreeSockets: 256,
    scheduling: 'lifo',
    maxTotalSockets: Infinity,
    totalSocketCount: 0,
    maxCachedSessions: 100,
    _sessionCache: { map: {}, list: [] },
    [Symbol(kCapture)]: false
  },
  Server: [Function: Server],
  createServer: [Function: createServer],
  get: [Function: get],
  request: [Function: request]
}
*/
const https = require('node:https')

console.log(https)
