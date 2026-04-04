import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { runSiteScan } from '../core';
import { renderHtmlReport, renderJsonReport, renderMarkdownReport, renderSiteJsonReport } from '../report';
import type { ScanInput } from '../models';

function buildDefaultScanInput(
  targetUrl: string,
  enableActiveLowRisk: boolean,
  crawlDepth: number,
  maxPages: number,
): ScanInput {
  return {
    targetUrl,
    scanMode: 'static',
    followRedirects: true,
    enableBrowserCollection: false,
    enableActiveLowRisk,
    crawlDepth,
    maxPages,
    outputFormats: ['json', 'markdown'],
    timeoutMs: 10000,
  };
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const enableActiveLowRisk = args.includes('--active-low-risk');
  const crawlDepth = Number(
    args.find((arg) => arg.startsWith('--crawl-depth='))?.split('=')[1] ?? '0',
  );
  const maxPages = Number(
    args.find((arg) => arg.startsWith('--max-pages='))?.split('=')[1] ?? '1',
  );
  const targetUrl = args.find((arg) => !arg.startsWith('--'));

  if (!targetUrl) {
    console.error('Usage: frontscope <url> [--active-low-risk] [--crawl-depth=N] [--max-pages=N]');
    process.exit(1);
  }

  const input = buildDefaultScanInput(
    targetUrl,
    enableActiveLowRisk,
    Number.isFinite(crawlDepth) ? crawlDepth : 0,
    Number.isFinite(maxPages) ? maxPages : 1,
  );
  const siteResult = await runSiteScan(input);
  const primaryResult = siteResult.scannedPages[0];

  if (!primaryResult) {
    console.error('FrontScope scan failed: no pages were scanned.');
    process.exit(1);
  }

  const outputDir = join(process.cwd(), 'reports');
  mkdirSync(outputDir, { recursive: true });

  writeFileSync(join(outputDir, 'report.json'), renderJsonReport(primaryResult), 'utf8');
  writeFileSync(join(outputDir, 'report.md'), renderMarkdownReport(primaryResult), 'utf8');
  writeFileSync(join(outputDir, 'report.html'), renderHtmlReport(primaryResult), 'utf8');
  writeFileSync(join(outputDir, 'site-report.json'), JSON.stringify(siteResult, null, 2), 'utf8');
  writeFileSync(join(outputDir, 'site-summary.json'), renderSiteJsonReport(siteResult), 'utf8');

  console.log(`FrontScope report generated in ${outputDir} (pages scanned: ${siteResult.totalPages})`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`FrontScope scan failed: ${message}`);
  process.exit(1);
});
