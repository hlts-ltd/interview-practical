/**
 * @jest-environment node
 */
import fs from 'node:fs';
import crypto from 'node:crypto';
import { faker } from '@faker-js/faker';
import { storage } from '@/lib/utils';
import { Table, Row } from './table';

interface Book extends Row {
  author: string,
  genre: string,
  title: string,
}

function makeBook(attributes: Partial<Book> = {}): Book {
  return {
    id: crypto.randomUUID(),
    author: faker.book.author(),
    genre: faker.book.genre(),
    title: faker.book.title(),
    ...attributes,
  };
}

describe('Table', () => {
  let books: Table<Book>;

  beforeEach(() => {
    books = new Table([], { name: 'books' });
  });

  afterEach(() => {
    books.drop();
  });

  describe('drop', () => {
    test('deletes the table file', () => {
      const pathname = storage('database/foo.json');
      expect(fs.existsSync(pathname)).toBe(false);

      const foo = new Table([], { name: 'foo' });

      expect(fs.existsSync(pathname)).toBe(true);

      foo.drop();

      expect(fs.existsSync(pathname)).toBe(false);
    });
  });

  describe('add', () => {
    test('adds a new row to the table', () => {
      expect(books.size).toBe(0);

      const book = makeBook();

      books.add(book);

      const [actual] = books.toArray();

      expect(books.size).toBe(1);
      expect(actual).toBe(book);
    });
  });

  describe('clear', () => {
    test('flushes the table', () => {
      books.add(makeBook());
      books.add(makeBook());
      books.add(makeBook());

      expect(books.size).toBe(3);

      books.clear();

      expect(books.size).toBe(0);
    });
  });

  describe('delete', () => {
    test('removes the given row', () => {
      books.add(makeBook());
      books.add(makeBook({ id: 'foo' }));
      books.add(makeBook());

      expect(books.size).toBe(3);

      books.delete(books.find(({ id }) => id === 'foo') as Book);

      expect(books.size).toBe(2);
    });
  });

  describe('toArray', () => {
    test('returns all rows as an array', () => {
      books.add(makeBook());
      books.add(makeBook());
      books.add(makeBook());

      const actual = books.toArray();

      expect(actual).toBeInstanceOf(Array);
      expect(actual.length).toBe(3);
    });
  });

  describe('find', () => {
    test('returns the first row matching the callback', () => {
      books.add(makeBook());
      books.add(makeBook({ author: 'Foo Author', title: 'Book 2' }));
      books.add(makeBook({ author: 'Foo Author', title: 'Book 1' }));

      const actual = books.find(({ author }) => author === 'Foo Author');

      expect(actual).toEqual(
        expect.objectContaining({
          title: 'Book 2',
        })
      );
    });
  });

  describe('findMany', () => {
    test('returns all rows matching the callback', () => {
      books.add(makeBook());
      books.add(makeBook({ author: 'Foo Author', title: 'Book 2' }));
      books.add(makeBook({ author: 'Foo Author', title: 'Book 1' }));

      const actual = books.findMany(({ author }) => author === 'Foo Author');

      expect(actual.length).toBe(2);
    });
  });

  describe('update', () => {
    test('updates rows that match the callback', () => {
      books.add(makeBook());
      books.add(makeBook({ id: 'foo', title: 'Foo book' }));

      const updated = books.update({ title: 'Foo book updated' }, ({ id }) => id === 'foo');
      const actual = books.find(({ id }) => id === 'foo');

      expect(updated.length).toBe(1);
      expect(actual?.title).toBe('Foo book updated');
    });
  });
});
