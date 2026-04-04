import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { assembleStaticScanResult, buildTargetMetadata } from '../core';
import { renderJsonReport, renderMarkdownReport } from '../report';
import type { ScanInput } from '../models';

function buildDefaultScanInput(targetUrl: string): ScanInput {
  return {
    targetUrl,
    scanMode: 'static',
    followRedirects: true,
    enableBrowserCollection: false,
    outputFormats: ['json', 'markdown'],
    timeoutMs: 10000,
  };
}

function main(): void {
  const targetUrl = process.argv[2];

  if (!targetUrl) {
    console.error('Usage: frontscope <url>');
    process.exit(1);
  }

  const input = buildDefaultScanInput(targetUrl);
  const metadata = buildTargetMetadata(input);
  const result = assembleStaticScanResult({
    input,
    metadata,
    redirects: [],
    assets: [],
    errors: ['Static fetch integration is not implemented yet.'],
  });

  const outputDir = join(process.cwd(), 'reports');
  mkdirSync(outputDir, { recursive: true });

  writeFileSync(join(outputDir, 'report.json'), renderJsonReport(result), 'utf8');
  writeFileSync(join(outputDir, 'report.md'), renderMarkdownReport(result), 'utf8');

  console.log(`FrontScope report generated in ${outputDir}`);
}

main();
