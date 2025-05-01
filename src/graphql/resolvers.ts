import { authors, books } from './data.js';
import type { Author, Book } from './types.js';

const RootResolvers = {
  hello(_parent: unknown, { name = 'Hono' }: { name: string }): string {
    return `Hello, ${name}!`;
  },

  book(_parent: unknown, { title }: { title: string }): Book | null {
    return books.find((book) => book.title === title) ?? null;
  },

  books(): readonly Book[] {
    return books;
  },
};
export { RootResolvers as Query };

const BookResolvers = {
  author(book: Book): Author | null {
    if (book.authorId == null) return null;
    return authors.find((author) => author.id === book.authorId) ?? null;
  },
};
export { BookResolvers as Book };

const AuthorResolvers = {
  name(author: Author): string {
    return `${author.lastName}${author.firstName}`;
  },

  books(author: Author, { findTitle }: { findTitle?: string }): Book[] {
    const filtered = books.filter((book) => book.authorId === author.id);
    return findTitle ? filtered.filter((post) => post.title.includes(findTitle)) : filtered;
  },
};
export { AuthorResolvers as Author };
