
import type { IncomingMessage, ServerResponse } from 'http';

import polka, { ListenCallback } from 'polka'
import type { NextHandler, Request } from "polka"
import sirv from 'sirv'

import compression from 'compression'
import * as sapper from '@sapper/server'

function dummyMiddleWare(req: IncomingMessage, res: ServerResponse, next: NextHandler) {
	(req as Request).foo = 'world';
	next();
}


const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const callBack: ListenCallback = () => { }

const app = polka();

app.use(dummyMiddleWare)
app.use(
	//@ts-ignore
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
)

app.listen(PORT, callBack)
