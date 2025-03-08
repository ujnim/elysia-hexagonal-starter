import { Elysia } from "elysia";
import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaMessageRepository } from "./database/message-repository";
import { MessageService } from "../application/message-service";

const messageRepository = new PrismaMessageRepository();
const messageService = new MessageService(messageRepository);

// ✅ GraphQL Schema (TypeDefs)
const typeDefs = `
  type Message {
    id: Int!
    content: String!
    senderId: Int!
    timestamp: String!
  }

  type Query {
    messages: [Message!]!
  }

  type Mutation {
    sendMessage(content: String!, senderId: Int!): Message!
  }
`;

// ✅ GraphQL Resolvers
const resolvers = {
  Query: {
    messages: async () => {
      console.log("📌 Query: Fetching messages...");
      return await messageService.getAllMessages();
    },
  },
  Mutation: {
    sendMessage: async (_: unknown, { content, senderId }: { content: string; senderId: number }) => {
      console.log("📌 Mutation: Sending message...");
      return await messageService.sendMessage(content, senderId);
    },
  },
};

// ✅ สร้าง GraphQL Schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// ✅ สร้าง GraphQL Yoga Server
const yoga = createYoga({ schema });

// ✅ ใช้ `yoga.fetch` แทน `handleRequest()`
export const graphqlAdapter = new Elysia().all("/graphql", ({ request }) => yoga.fetch(request));
