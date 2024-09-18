import cors from "@fastify/cors";
import { fastify } from "fastify";
import { STATUS_CODES } from "http";
import * as request from 'supertest';

async function bootstrap() {
  const app = fastify({logger: true});
  const whitelist = [/\.localhost\.3000$/, /\.127.0.0.1\.3000$/];
  app.register(cors, (instance) => {
      return (req, callback) => {
        const corsOptions = {
          // This is NOT recommended for production as it enables reflection exploits
          origin: true
        };
        // console.log( '=====> req: ',req.raw.rawHeaders[1]);
        // do not include CORS headers for requests from localhost
        if (whitelist.find((regex) => regex.test(req.raw.rawHeaders[1]))) {
          corsOptions.origin = false
        }
    
        // callback expects two parameters: error and options
        callback(null, corsOptions)
      }
  });

  app.get('/', (req, reply) => {
    reply.send({ hello: 'world' })
  });


  await app.listen({port: 3335}).then(() => {console.log(`Listening on port 3335`)});
}
bootstrap();
