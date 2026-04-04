import { normalizeCrawlUrl, shouldCrawlUrl } from '../utils';

export function extractEnterpriseRoutes(content: string, baseUrl: string): string[] {
  const urls = new Set<string>();
  const base = new URL(baseUrl);

  const patterns = [
    /["'`](\/[^"'`\s]+?\.(?:jsp|do|xml|wq|json))(?:\?[^"'`\s]*)?["'`]/gi,
    /["'`](https?:\/\/[^"'`\s]+?\/(?:[^"'`\s]+\.)?(?:jsp|do|xml|wq|json)(?:\?[^"'`\s]*)?)["'`]/gi,
    /["'`](\/websquare\/[^"'`\s]+)["'`]/gi,
  ];

  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      const raw = match[1]?.trim();
      if (!raw) continue;

      try {
        const resolved = new URL(raw, baseUrl);
        if (resolved.origin !== base.origin) continue;
        const normalized = normalizeCrawlUrl(resolved.toString());
        if (!shouldCrawlUrl(normalized)) continue;
        urls.add(normalized);
      } catch {
        // ignore malformed enterprise route strings
      }
    }
  }

  return [...urls];
}
