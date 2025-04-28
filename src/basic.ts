import { type RootResolver, graphqlServer } from "@hono/graphql-server";
import { buildSchema } from "graphql";
import { Hono } from "hono";
import { authors, books } from "./graphql/data.js";

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

const app = new Hono();

app.get("/", (c) => c.redirect("/graphql"));

app.use(
	"/graphql",
	graphqlServer({
		schema: typeDefs,
		rootResolver,
		graphiql: true,
	}),
);

export default app;
