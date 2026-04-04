import { normalizeCrawlUrl, shouldCrawlUrl } from '../utils';

export function extractSameOriginLinks(html: string, baseUrl: string): string[] {
  const links = new Set<string>();
  const base = new URL(baseUrl);
  const regex = /<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1[^>]*>/gi;

  for (const match of html.matchAll(regex)) {
    const href = match[2]?.trim();
    if (!href) continue;
    if (href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('#')) continue;

    try {
      const resolved = new URL(href, baseUrl);
      if (resolved.origin !== base.origin) continue;
      const normalized = normalizeCrawlUrl(resolved.toString());
      if (!shouldCrawlUrl(normalized)) continue;
      links.add(normalized);
    } catch {
      // ignore bad hrefs
    }
  }

  return [...links];
}
