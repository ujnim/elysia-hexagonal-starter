import { Elysia } from "elysia";
import { httpAdapter } from "./infrastructure/http-adapter";
import { websocketAdapter } from "./infrastructure/websocket-adapter";
import { graphqlAdapter } from "./infrastructure/graphql-adapter";


const app = new Elysia()
  .use(httpAdapter)
  .use(websocketAdapter)
  .use(graphqlAdapter)
  .listen(3001);

console.log("Server is running on http://localhost:3001");