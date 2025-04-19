import { type RootResolver, graphqlServer } from "@hono/graphql-server";
import { serve } from "@hono/node-server";
import { buildSchema } from "graphql";
import { Hono } from "hono";
import { authors, books } from "./graphql/data.js";

export const app = new Hono();

const typeDefs = buildSchema(`
type Author {
  id: Int!
  name: String!
  firstName: String!
  lastName: String!
  books(findTitle: String): [Book!]!
}

type Book {
  id: Int!
  title: String!
  author: Author
}

type Query {
  hello(name: String): String!
  book(title: String!): Book
  books: [Book!]!
}
`);

const rootResolver: RootResolver = (c) => {
	return {
		hello: ({ name = "Hono" }: { name: string }) => `Hello, ${name}!`,

		book: ({ title }: { title: string }) => {
			const book = books.find((book) => book.title === title);
			if (!book) return null;
			return {
				...book,
				author: authors.find((author) => author.id === book.authorId) ?? null,
			};
		},

		books: () => {
			return books.map((book) => ({
				...book,
				author: authors.find((author) => author.id === book.authorId) ?? null,
			}));
		},
	};
};

app.use(
	"/graphql",
	graphqlServer({
		schema: typeDefs,
		rootResolver,
		graphiql: true,
	}),
);

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(
			`Basic Example: Running on http://localhost:${info.port}/graphql`,
		);
	},
);
