import { extractSitemapUrls } from '../extractors';
import type { ScanResult } from '../models';
import { fetchWithMetadata } from '../utils';

function collectIndicatorUrls(pageResult: ScanResult): string[] {
  const base = new URL(pageResult.metadata.normalizedUrl);
  const urls = new Set<string>();

  for (const indicator of pageResult.indicators) {
    if (indicator.kind !== 'api-endpoint') {
      continue;
    }

    try {
      const resolved = new URL(indicator.value.replace(/&amp;/g, '&'));
      if (resolved.origin !== base.origin) {
        continue;
      }
      resolved.hash = '';
      urls.add(resolved.toString());
    } catch {
      // ignore invalid URLs
    }
  }

  return [...urls];
}

export async function collectAdditionalCrawlSeeds(
  pageResult: ScanResult,
): Promise<string[]> {
  const urls = new Set<string>();

  for (const url of collectIndicatorUrls(pageResult)) {
    urls.add(url);
  }

  try {
    const sitemapUrl = new URL('/sitemap.xml', pageResult.metadata.normalizedUrl).toString();
    const sitemapResponse = await fetchWithMetadata(sitemapUrl);
    for (const url of extractSitemapUrls(sitemapResponse.body, pageResult.metadata.normalizedUrl)) {
      urls.add(url);
    }
  } catch {
    // optional sitemap seed
  }

  return [...urls];
}
