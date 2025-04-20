import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphqlServer } from "@hono/graphql-server";
import { Hono } from "hono";
import * as resolvers from "./graphql/resolvers.js";
import { buildSchema } from 'graphql';
import schemaSDL from '../schema.graphql';

const schema = makeExecutableSchema({
	typeDefs: buildSchema(schemaSDL),
	resolvers,
});

const app = new Hono();

app.use(
	"/graphql",
	graphqlServer({
		schema,
		graphiql: true,
	}),
);

export default app;
