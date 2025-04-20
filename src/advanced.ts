import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphqlServer } from "@hono/graphql-server";
import { buildSchema } from "graphql";
import { Hono } from "hono";
import schemaSDL from "../schema.graphql";
import * as resolvers from "./graphql/resolvers.js";

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
