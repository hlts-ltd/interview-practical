import { EventEmitter } from "node:events";
import { storage } from "@/lib/utils";

let fs: typeof import("node:fs") | undefined;
if (typeof window === "undefined") {
  fs = require("node:fs");
}

export interface TableBase {
  id?: string;
}

class TableEventEmitter extends EventEmitter {}

interface Config {
  name: string;
}

export class Table<T> extends Set<T> {
  public events = new TableEventEmitter();

  private pathname: string;

  public constructor(values: readonly T[] | null, private config: Config) {
    const filename = `${config.name}.json`;

    // Ensure storage returns a valid pathname
    const pathname = storage(`database/${filename}`);
    if (!pathname) {
      throw new Error(
        `Failed to resolve pathname for database file: ${filename}`
      );
    }

    // Ensure fs operations only happen if fs is available
    if (fs && !fs.existsSync(pathname)) {
      fs.mkdirSync(pathname.replace(new RegExp(`/${filename}$`), ""), {
        recursive: true,
      });

      const file = fs.openSync(pathname, "w");

      fs.writeFileSync(file, JSON.stringify(values ?? []), {
        encoding: "utf-8",
      });

      fs.closeSync(file);
    }

    super(
      fs ? JSON.parse(fs.readFileSync(pathname, { encoding: "utf-8" })) : []
    );

    this.pathname = pathname;

    // Event listeners for changes in the data
    if (fs) {
      this.events.addListener("change", () => {
        const file = fs.openSync(pathname, "w");

        fs.writeFileSync(file, JSON.stringify([...this.values()]), {
          encoding: "utf-8",
        });

        fs.closeSync(file);
      });

      this.events.addListener("cleared", () => {
        const file = fs.openSync(pathname, "w");

        fs.writeFileSync(file, JSON.stringify([]), { encoding: "utf-8" });

        fs.closeSync(file);
      });
    }
  }

  public add(...args: Parameters<Set<T>["add"]>) {
    super.add(...args);

    this.events?.emit("change", ...args);

    return this;
  }

  public update(
    predicate: (row: T) => boolean,
    updater: (row: T) => T
  ): boolean {
    let updated = false;

    // Create a new set of updated values
    const updatedValues = this.toArray().map((row) => {
      if (predicate(row)) {
        updated = true;
        return updater(row); // Apply the updater function to the matched rows
      }
      return row; // Keep the row unchanged if it doesn't match the predicate
    });

    if (updated) {
      // Clear current entries and add updated entries
      super.clear();
      updatedValues.forEach((row) => super.add(row));

      // Trigger the 'change' event
      this.events?.emit("change");
    }

    return updated; // Return whether any entries were updated
  }

  public clear() {
    super.clear();

    this.events?.emit("cleared");
  }

  public delete(...args: Parameters<Set<T>["delete"]>) {
    const deleted = super.delete(...args);

    this.events?.emit("change", ...args);

    return deleted;
  }

  public drop() {
    if (fs) {
      fs.rmSync(this.pathname);
    }
  }

  public find(predicate: (row: T) => unknown): T | undefined {
    return this.toArray().find(predicate);
  }

  public findMany(predicate: (row: T) => unknown): T[] {
    return this.toArray().filter(predicate);
  }

  public toArray(): T[] {
    return [...this.values()];
  }
}
