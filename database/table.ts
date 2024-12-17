import fs from 'node:fs';
import { EventEmitter } from 'node:events';
import { storage } from '@/lib/utils';

export interface Row {
  id: string,
}

class TableEventEmitter extends EventEmitter { };

interface Config {
  name: string,
}

export class Table<R extends Row> extends Set<R> {
  public events = new TableEventEmitter();

  private pathname: string;

  public constructor(values: readonly R[] | null, private config: Config) {
    const filename = `${config.name}.json`;
    const pathname = storage(`database/${filename}`);

    if (!fs.existsSync(pathname)) {
      fs.mkdirSync(pathname.replace(new RegExp(`/${filename}$`), ''), { recursive: true });
      const file = fs.openSync(pathname, 'w');
      fs.writeFileSync(file, JSON.stringify(values ?? []), { encoding: 'utf-8' });
      fs.closeSync(file);
    }

    super(JSON.parse(fs.readFileSync(pathname, { encoding: 'utf-8' })));

    this.pathname = pathname;

    this.events.addListener('change', () => {
      const file = fs.openSync(pathname, 'w');
      fs.writeFileSync(file, JSON.stringify([...this.values()]), { encoding: 'utf-8' });
      fs.closeSync(file);
    });

    this.events.addListener('cleared', () => {
      const file = fs.openSync(pathname, 'w');
      fs.writeFileSync(file, JSON.stringify([]), { encoding: 'utf-8' });
      fs.closeSync(file);
    });
  }

  public add(...args: Parameters<Set<R>['add']>) {
    super.add(...args);
    this.events?.emit('change', ...args);

    return this;
  }

  public clear() {
    super.clear();
    this.events?.emit('cleared');
  }

  public delete(...args: Parameters<Set<R>['delete']>) {
    const deleted = super.delete(...args);
    this.events?.emit('change', ...args);

    return deleted;
  }

  public drop() {
    fs.rmSync(this.pathname);
  }

  public find(predicate: (row: R) => unknown): R | undefined {
    return this.toArray().find(predicate);
  }

  public findMany(predicate?: (row: R) => unknown): R[] {
    return predicate ? this.toArray().filter(predicate) : this.toArray();
  }

  public update(values: Partial<R>, predicate: (row: R) => unknown): R[] {
    const rows: R[] = [];

    /** Update rows by object reference. */
    this.forEach(row => predicate(row) && rows.push(Object.assign(row, values)));
    this.events?.emit('change');

    return rows;
  }

  public toArray(): R[] {
    return [...this.values()];
  }
}
