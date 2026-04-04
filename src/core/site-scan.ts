import { extractSameOriginLinks } from '../extractors';
import type { ScanInput, SiteScanResult } from '../models';
import { runSinglePageScan } from './single-page-scan';

interface CrawlQueueItem {
  url: string;
  depth: number;
}

export async function runSiteScan(input: ScanInput): Promise<SiteScanResult> {
  const maxDepth = input.crawlDepth ?? 0;
  const maxPages = input.maxPages ?? 1;

  const queue: CrawlQueueItem[] = [{ url: input.targetUrl, depth: 0 }];
  const visited = new Set<string>();
  const scannedPages = [];

  while (queue.length && scannedPages.length < maxPages) {
    const current = queue.shift();
    if (!current) break;
    if (visited.has(current.url)) continue;

    visited.add(current.url);
    const pageResult = await runSinglePageScan({ ...input, targetUrl: current.url });
    scannedPages.push(pageResult);

    if (current.depth >= maxDepth) {
      continue;
    }

    const html = pageResult.response?.html;
    if (!html) continue;

    const discoveredLinks = extractSameOriginLinks(html, current.url);
    for (const link of discoveredLinks) {
      if (!visited.has(link)) {
        queue.push({ url: link, depth: current.depth + 1 });
      }
    }
  }

  return {
    entryUrl: input.targetUrl,
    scannedPages,
    totalPages: scannedPages.length,
  };
}
