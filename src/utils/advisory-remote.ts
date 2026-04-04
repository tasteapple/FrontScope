import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import type { LibraryAdvisory } from '../models';

interface OsvPackageResponse {
  vulns?: Array<{
    id?: string;
    summary?: string;
    aliases?: string[];
    affected?: Array<{
      ranges?: Array<{
        type?: string;
        events?: Array<Record<string, string>>;
      }>;
      package?: {
        name?: string;
      };
    }>;
    references?: Array<{
      url?: string;
    }>;
    database_specific?: {
      severity?: string;
    };
    severity?: Array<{
      type?: string;
      score?: string;
    }>;
  }>;
}

function normalizeSeverity(input?: string): 'low' | 'medium' | 'high' {
  const value = (input ?? '').toLowerCase();
  if (value.includes('critical') || value.includes('high')) return 'high';
  if (value.includes('moderate') || value.includes('medium')) return 'medium';
  return 'low';
}

function convertOsvToAdvisories(
  libraryName: string,
  payload: OsvPackageResponse,
): LibraryAdvisory[] {
  const advisories: LibraryAdvisory[] = [];

  for (const vuln of payload.vulns ?? []) {
    const ranges = (vuln.affected ?? [])
      .flatMap((affected) => affected.ranges ?? [])
      .filter((range) => range.type === 'ECOSYSTEM')
      .map((range) => {
        const parts: string[] = [];
        for (const event of range.events ?? []) {
          if (event.introduced && event.introduced !== '0') {
            parts.push(`>=${event.introduced}`);
          }
          if (event.fixed) {
            parts.push(`<${event.fixed}`);
          }
          if (event.last_affected) {
            parts.push(`<=${event.last_affected}`);
          }
        }
        return parts.join(' ');
      })
      .filter(Boolean);

    advisories.push({
      library: libraryName,
      advisoryId: vuln.id ?? `OSV-${libraryName}-unknown`,
      title: vuln.summary ?? `Remote advisory detected for ${libraryName}`,
      severity: normalizeSeverity(
        vuln.database_specific?.severity ?? vuln.severity?.[0]?.score,
      ),
      affectedVersions: [],
      affectedRanges: ranges,
      summary: vuln.summary ?? `Remote advisory data was fetched for ${libraryName}.`,
      references: (vuln.references ?? []).map((ref) => ref.url ?? '').filter(Boolean),
    });
  }

  return advisories;
}

function getCachePath(libraryName: string): string {
  return join(process.cwd(), 'data', 'advisories-cache', `${libraryName}.json`);
}

export function loadCachedRemoteAdvisories(libraryName: string): LibraryAdvisory[] {
  const cachePath = getCachePath(libraryName);
  if (!existsSync(cachePath)) {
    return [];
  }

  try {
    const parsed = JSON.parse(readFileSync(cachePath, 'utf8')) as LibraryAdvisory[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function cacheRemoteAdvisories(
  libraryName: string,
  advisories: LibraryAdvisory[],
): void {
  const cacheDir = join(process.cwd(), 'data', 'advisories-cache');
  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(getCachePath(libraryName), JSON.stringify(advisories, null, 2), 'utf8');
}

export async function fetchRemoteAdvisories(
  libraryName: string,
): Promise<LibraryAdvisory[]> {
  const ecosystem = 'npm';
  const response = await fetch('https://api.osv.dev/v1/query', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      package: {
        ecosystem,
        name: libraryName,
      },
    }),
  });

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as OsvPackageResponse;
  const advisories = convertOsvToAdvisories(libraryName, payload);

  if (advisories.length) {
    cacheRemoteAdvisories(libraryName, advisories);
  }

  return advisories;
}
