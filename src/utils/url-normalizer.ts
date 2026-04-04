export function normalizeCrawlUrl(url: string): string {
  const parsed = new URL(url);
  parsed.hash = '';

  const shouldKeepParams = new Set(['id', 'page', 'boardNo', 'articleNo', 'attachNo', 'menu']);
  const nextParams = new URLSearchParams();

  for (const [key, value] of parsed.searchParams.entries()) {
    if (shouldKeepParams.has(key)) {
      nextParams.set(key, value);
    }
  }

  parsed.search = nextParams.toString();
  return parsed.toString();
}

export function shouldCrawlUrl(url: string): boolean {
  const lower = url.toLowerCase();

  const blockedExtensions = [
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.css', '.woff', '.woff2', '.ttf', '.eot', '.pdf', '.zip', '.exe', '.dmg', '.apk'
  ];

  if (blockedExtensions.some((extension) => lower.endsWith(extension))) {
    return false;
  }

  return true;
}
