import type { RedirectEntry } from '../models';

export interface RedirectCollectorInput {
  originalUrl: string;
  finalUrl: string;
  redirectChain?: Array<{
    fromUrl: string;
    toUrl: string;
    statusCode: number;
    locationHeader?: string;
  }>;
}

export function collectRedirects(input: RedirectCollectorInput): RedirectEntry[] {
  if (!input.redirectChain?.length) {
    return [];
  }

  return input.redirectChain.map((entry) => ({
    fromUrl: entry.fromUrl,
    toUrl: entry.toUrl,
    statusCode: entry.statusCode,
    locationHeader: entry.locationHeader,
  }));
}
