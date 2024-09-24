import cors from "@fastify/cors";
import { HttpException, HttpStatus } from "@nestjs/common";
import { fastify } from "fastify";

async function bootstrap() {
  const app = fastify({logger: true});
  const whitelist = [/.*localhost:3000/g, /.*127.0.0.1:3000/g, /.*0.0.0.0:3000/g, /.*localhost:3335/g];

  app.register(cors, {
    hook: 'preHandler',
    delegator: (request, callback) => {
      let corsOptions = {
        origin: true,
      };
      const originHost = request.headers.host;

      // do not include CORS headers for requests from variable whiteList
      if(!whitelist.find((regex) => regex.test(originHost))) {
        corsOptions.origin = false;
        return callback(new HttpException('Forbidden', HttpStatus.FORBIDDEN), corsOptions);
        
      }
  
      // callback expects two parameters: error and options
      callback(null, corsOptions);
    },
  });

  app.get('/', (req, reply) => {
    reply.send({ hello: 'world' })
  });


  await app.listen({port: 3335}).then(() => {console.log(`Listening on port 3335`)});
}
bootstrap();
