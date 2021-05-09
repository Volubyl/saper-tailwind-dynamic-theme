import type { IncomingMessage, ServerResponse } from 'http'

import polka from 'polka'
import type { NextHandler, Request } from 'polka'
import sirv from 'sirv'

import compression from 'compression'
import * as sapper from '@sapper/server'

function dummyMiddleWare(req: IncomingMessage, res: ServerResponse, next: NextHandler) {
  (req as Request).foo = 'world'
  void next()
}

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const app = polka()

app.use(dummyMiddleWare)
app.use(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  compression({ threshold: 0 }),
  sirv('static', { dev }),
  sapper.middleware()
)

app.listen(PORT)
