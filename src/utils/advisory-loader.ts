import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

import type { LibraryAdvisory } from '../models';

export function loadLocalAdvisories(libraryName: string): LibraryAdvisory[] {
  const advisoryPath = join(process.cwd(), 'data', 'advisories', `${libraryName}.json`);

  if (!existsSync(advisoryPath)) {
    return [];
  }

  try {
    const parsed = JSON.parse(readFileSync(advisoryPath, 'utf8')) as LibraryAdvisory[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
