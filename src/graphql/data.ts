import type { Author, Book } from './types.js';

export const authors: Author[] = [
  { id: 0, lastName: '夏目', firstName: '漱石' },
  { id: 1, lastName: '芥川', firstName: '龍之介' },
  { id: 2, lastName: '太宰', firstName: '治' },
  { id: 3, lastName: '川端', firstName: '康成' },
  { id: 4, lastName: '宮沢', firstName: '賢治' },
  { id: 5, lastName: '森', firstName: '鷗外' },
];

export const books: Book[] = [
  { id: 0, title: '吾輩は猫である', authorId: 0 },
  { id: 1, title: 'こころ', authorId: 0 },
  { id: 2, title: '羅生門', authorId: 1 },
  { id: 3, title: '人間失格', authorId: 2 },
  { id: 4, title: '斜陽', authorId: 2 },
  { id: 5, title: '走れメロス', authorId: 2 },
  { id: 6, title: '雪国', authorId: 3 },
  { id: 7, title: '銀河鉄道の夜', authorId: 4 },
  { id: 8, title: '舞姫', authorId: 5 },
  { id: 9, title: '伊勢物語', authorId: null },
];
