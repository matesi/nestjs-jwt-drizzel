import cors from "@fastify/cors";
import { HttpException, HttpStatus } from "@nestjs/common";
import { fastify } from "fastify";

async function bootstrap() {
  const app = fastify({logger: true});
  const whitelist = /.*(localhost|127.0.0.1|0.0.0.0):(3000|3335)/g;

  app.register(cors, {
    hook: 'preHandler',
    delegator: (request, callback) => {
      let corsOptions = {
        origin: true,
      };
      const originHost = request.headers.host;

      // do not include CORS headers for requests from variable whiteList
      if(!whitelist.test(originHost)) {
        corsOptions.origin = false;

        // callback expects two parameters: error and cors options
        return callback(new HttpException('Forbidden', HttpStatus.FORBIDDEN), corsOptions);
        
      }
  
      callback(null, corsOptions);
    },
  });

  app.get('/', (req, reply) => {
    reply.send({ hello: 'world' })
  });


  await app.listen({port: 3335}).then(() => {console.log(`Listening on port 3335`)});
}
bootstrap();
