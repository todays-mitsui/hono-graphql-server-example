import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphqlServer } from "@hono/graphql-server";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import * as resolvers from "./graphql/resolvers.js";

export const app = new Hono();

const typeDefs = loadSchemaSync("./schema.graphql", {
	loaders: [new GraphQLFileLoader()],
});

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

app.use(
	"/graphql",
	graphqlServer({
		schema,
		graphiql: true,
	}),
);

serve(
	{
		fetch: app.fetch,
		port: 3300,
	},
	(info) => {
		console.log(
			`Advanced Example: Running on http://localhost:${info.port}/graphql`,
		);
	},
);
