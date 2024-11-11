import path from 'node:path';

export function storage(pathname: string): string {
  return path.resolve(process.env.ROOT_DIR, './storage/', pathname);
}
