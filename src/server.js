import http from 'node:http';
import { jsonHandler } from './middlewares/jsonHandler.js';
import { routeHandler } from './middlewares/routeHandler.js';


async function Listner(req, res){
    await jsonHandler(req, res)
    routeHandler(req, res)
}

http.createServer(Listner).listen(3333)