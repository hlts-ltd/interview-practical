import path from "node:path";

export function storage(pathname: string): string {
  const rootDir = process.env.ROOT_DIR || ".";
  return path.resolve(rootDir, "./storage/", pathname);
}
