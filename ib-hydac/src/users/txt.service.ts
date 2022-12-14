import { readFileSync, writeFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';

/**
 * flags:
 *  - w = Open file for reading and writing. File is created if not exists
 *  - a+ = Open file for reading and appending. The file is created if not exists
 */

export function syncWriteFile(filename: string, data: any) {
  writeFileSync(join(__dirname, filename), data, {
    flag: 'w',
  });

  const contents = readFileSync(join(__dirname, filename), 'utf-8');

  return contents;
}

export function syncReadFile(filename: string): string {
  const contents = readFileSync(join(__dirname, filename), 'utf-8');

  return contents;
}

export function appendFile(filename: string, data: any): string {
  // Reads the txt file into a string, and appends the new data to the end
  // Not the optimal way to do it, but will be fixed at a later date
  const contents = readFileSync(join(__dirname, filename), 'utf-8');
  const newContent: string = contents.concat(data);
  syncWriteFile(filename, newContent);

  return data;
}
