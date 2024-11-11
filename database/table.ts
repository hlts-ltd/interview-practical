import fs from 'node:fs';
import { EventEmitter } from 'node:events';
import { storage } from '@/lib/utils';

class TableEventEmitter extends EventEmitter { };

interface Config {
  name: string,
}

export class Table<T> extends Set<T> {
  public events = new TableEventEmitter();

  public constructor(values: readonly T[] | null, private config: Config) {
    const filename = `${config.name}.json`;
    const pathname = storage(`database/${filename}`);

    if (!fs.existsSync(pathname)) {
      fs.mkdirSync(pathname.replace(new RegExp(`/${filename}$`), ''), { recursive: true });

      const file = fs.openSync(pathname, 'w');

      fs.writeFileSync(file, JSON.stringify(values ?? []), { encoding: 'utf-8' });

      fs.closeSync(file);
    }

    super(JSON.parse(fs.readFileSync(pathname, { encoding: 'utf-8' })));

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

  public add(...args: Parameters<Set<T>['add']>) {
    super.add(...args);

    this.events?.emit('change', ...args);

    return this;
  }

  public delete(...args: Parameters<Set<T>['delete']>) {
    const deleted = super.delete(...args);

    this.events?.emit('change', ...args);

    return deleted;
  }

  public clear() {
    super.clear();

    this.events?.emit('cleared');
  }
}
