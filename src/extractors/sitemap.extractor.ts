export function extractSitemapUrls(xml: string, baseUrl: string): string[] {
  const urls = new Set<string>();
  const base = new URL(baseUrl);
  const regex = /<loc>(.*?)<\/loc>/gi;

  for (const match of xml.matchAll(regex)) {
    const raw = match[1]?.trim();
    if (!raw) continue;

    try {
      const resolved = new URL(raw, baseUrl);
      resolved.hash = '';
      if (resolved.origin !== base.origin) continue;
      urls.add(resolved.toString());
    } catch {
      // ignore malformed loc entries
    }
  }

  return [...urls];
}
